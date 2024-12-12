import { Chart, registerables, ScatterDataPoint } from 'chart.js';
import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { debounce } from '../../util/functions/debounce';
import { getParamNames } from '../../util/functions/get-param-names';
import { createDebouncer } from './createDebouncer';
import './pk-latex.component';
import './pk-range.component';
import { plotOptions } from './plot-options.config';
import { plots } from './plot-samples';
import { style } from './plot.css';
import './toggle.component';
import { PlotParameters } from './types/PlotPage';
import { Variable } from './types/Variable';
import { VariableSet } from './types/VariableSet';
/**
 * Component that renders a plot to the DOM given a list of parameters (see PlotParameters interface)
 * @param {PlotParameters} params - this function generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */
@customElement('plot-engine')
export class PlotEngine extends LitElement {
  /**Declarations */
  @state()
  private plotParameters: Partial<PlotParameters> = plots.multipledose;

  @property({ type: String, reflect: true })
  get plotType() {
    return this.#plotType;
  }
  #plotType = 'multipledose';
  set plotType(value: string) {
    this.#plotType = value;
    this.plotParameters = plots[value];
    this.resetWorker();
  }

  @property({ type: Boolean })
  mobile = false;

  @query('#chart')
  private canvas!: HTMLCanvasElement;

  @query('.container', true)
  private container!: HTMLDivElement;

  @query('.container__chart', true)
  private chartContainer!: HTMLDivElement;

  @property({ type: String })
  displayedEquation!: string;

  /**Sets the highlight color of the plot */
  @property({ type: String })
  mainColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-7');
  @property({ type: String })
  highlightColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-6');
  private plottedEquation = '';
  private range = 10;
  private eventDebouncer: (params: {}) => any;
  private variableValues: VariableSet = {};
  private chart!: Chart;
  private worker!: Worker;
  private generateCoordinates!: (
    values: {},
    equation: string,
    scale?: number
  ) => void;
  createWorker(methodBody: string) {
    const blob = new Blob(['self.onmessage = ', methodBody], {
      type: 'text/javascript',
    });
    const url = URL.createObjectURL(blob);
    return new Worker(url);
  }

  private handleLogToggle(e: CustomEvent<{ toggled: boolean }>): void {
    if (this.chart?.options?.scales?.y) {
      this.chart.options.scales.y.type =
        e.detail.toggled ?? false ? 'logarithmic' : 'linear';
    }
    this.chart.update();
  }

  private handleFixToggle(e: CustomEvent<{ toggled: boolean }>): void {
    if (this.chart?.options?.scales?.y) {
      this.chart.options.scales.y.max =
        e.detail.toggled ?? false ? this.getMax() : undefined;
    }
    this.chart.update();
  }
  private getMax(): number {
    const data = this.chart.data.datasets[0].data as ScatterDataPoint[];
    return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
  }

  beginPlotting(chart: Chart) {
    this.initVariables();
    this.initiateUpdates(chart);
  }

  firstUpdated() {
    this.chart = this.createChart(
      this.canvas,
      this.mainColor,
      this.highlightColor
    );
    this.beginPlotting(this.chart);
    let debouncedFn = debounce(
      100,
      function (this: PlotEngine, entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
          if (entry.target.classList.contains('container')) {
            this.container.classList.toggle(
              'is-small',
              entry.contentRect.width < 500
            );
          }
        }
      }.bind(this)
    );
    const resizeObserver = new ResizeObserver(debouncedFn);
    resizeObserver.observe(this.container);
    resizeObserver.observe(this.chartContainer);
  }

  constructor() {
    super();
    Chart.register(...registerables);
    this.eventDebouncer = createDebouncer(this.updatePlot.bind(this), 16);
  }

  /**
   * @description Sets variables using user-supplied or default values. This must be called prior to plotting any equations
   * @private
   * @memberof PlotEngine
   */
  private initVariables() {
    const { equation, range, variables } = this.plotParameters;
    if (equation && Array.isArray(variables)) {
      // Replaces user-interpolated variables and ASCII syntax with property accessor that utilize dot notations. Honestly, probably didn't need to replace anything here, but it works fine and may have a small performance benefit.
      this.plottedEquation = equation
        .replace(/v\[\"/g, 'variables.')
        .replace(/\"]/g, '')
        .replace(/\^/g, '**')
        .replace(/\`/g, '');
      // The size of the X axis. Defaults to 100.
      this.range = range || 100;
      // Initiate the variable values
      for (const v of variables) {
        this.variableValues[v.glyph] = v.value;
      }
    }
  }

  private createChart(
    canvasElement: HTMLCanvasElement,
    color: string,
    highlight: string
  ) {
    return new Chart(
      canvasElement,
      plotOptions([{ x: 0, y: 0 }], canvasElement, color, highlight)
    );
  }

  private initiateUpdates(chart: Chart) {
    this.setPlotFunction(this.plotPoints.bind(this), chart);
    this.updateLatexEquation();
    this.generateCoordinates(
      this.variableValues,
      this.plottedEquation,
      this.range
    );
  }

  private resetWorker() {
    this.worker.terminate();
    this.beginPlotting(this.chart);
  }

  private setPlotFunction(
    updateChart: (points: ScatterDataPoint[], chart: Chart) => void,
    chart: Chart
  ) {
    const { multipleDose } = this.plotParameters;
    if (window.Worker) {
      this.worker = multipleDose
        ? this.createWorker(this.serializeWorkerMethod(this.multipleDoseMethod))
        : this.createWorker(this.serializeWorkerMethod(this.bolusMethod));
      this.worker.onmessage = function (ev) {
        updateChart(ev.data, chart);
      };
      this.generateCoordinates = (values: VariableSet, equation: string) => {
        this.worker.postMessage([values, equation]);
      };
    } else {
      this.generateCoordinates = multipleDose
        ? this.multipleDoseMethod
        : this.bolusMethod;
    }
  }

  plotPoints(points: ScatterDataPoint[], chart: Chart) {
    chart.data.datasets[0].data = points;
    chart.update();
  }

  /**
   * Multiple dose coordinate calculation
   * @param {VariableSet} values - key value pairs representing variable values
   * @param {string} equation - a string representing an equation with interpolated variables
   * @returns {ScatterDataPoint[]} an array of coordinates
   */
  multipleDoseMethod(
    values: VariableSet,
    equation: string
  ): ScatterDataPoint[] {
    const tau = values['tau'],
      doses = values['n'],
      calculate = new Function(
        'variables',
        'x',
        'n',
        ';return (' + equation + ')'
      ),
      data = [];
    let i,
      stepCount,
      hour = 0;
    for (i = 0; i < doses; i++) {
      for (stepCount = 0; stepCount < tau; stepCount++) {
        data.push({
          x: hour++,
          y: calculate(values, stepCount, i + 1),
        });
        if (hour === doses * tau) {
          stepCount++;
          for (stepCount; stepCount < doses * tau * 0.5; stepCount++) {
            data.push({
              x: hour++,
              y: calculate(values, stepCount, i + 1),
            });
          }
        }
      }
    }
    return data;
  }
  /**
   * Bolus dose coordinate calculation
   * @param {VariableSet} values - key value pairs representing variable values
   * @param {string} equation - a string representing an equation with interpolated variables
   * @param {number} scale - A number representing the size of the x-axis. Defaults to 40.
   * @returns {ScatterDataPoint[]} an array of coordinates
   */
  bolusMethod(values: VariableSet, equation: string): ScatterDataPoint[] {
    let i = 0;
    const data = [],
      calculate = new Function('variables', 'x', '; return (' + equation + ')');
    for (i; i < 40; i += 0.5) {
      data.push({
        x: i++,
        y: calculate(values, i),
      });
    }
    return data;
  }

  updateLatexEquation() {
    const interpolateLatex = (equation: string) =>
      new Function('variables', '"use strict";return (' + equation + ')');

    if (this.plotParameters.equation) {
      this.displayedEquation = interpolateLatex(
        this.plotParameters?.equation
          .replace(/v\["/g, '${variables.')
          .replace(/"\]/g, '.toFixed(1)}')
      )(this.variableValues)
        .replace(/x/g, 'time')
        .replace(/2.71/g, 'e')
        .replace(/\*?-?\*?0.06\*?/g, '');
    }
  }

  disconnectedCallback() {
    this.worker.terminate();
  }

  serializeWorkerMethod(
    method: (values: VariableSet, equation: string) => void
  ): string {
    let stringified = method.toString(),
      end = stringified.lastIndexOf('return'),
      start = stringified.search('{'),
      body = stringified.substring(start + 1, end),
      [values, equation] = getParamNames(method);
    return `(ev) => 
    { const ${values} = ev.data[0], 
      ${equation} = ev.data[1];
      ${body}
      postMessage(data, undefined)}
    `;
  }

  updatePlot(symbol: string, event: InputEvent): void {
    this.variableValues[symbol] = parseFloat(event.data || '');
    this.updateLatexEquation();
    this.generateCoordinates(
      this.variableValues,
      this.plottedEquation,
      this.range
    );
  }
  render() {
    return html`
      <div class="container">
        <div class="container__latex">
          <div style="overflow: auto">
            <pk-latex
              class="scale-equation"
              .equation="${this.displayedEquation}"
            ></pk-latex>
          </div>
        </div>
        <div class="container__chart">
          <canvas id="chart"></canvas>
        </div>
        <div class="container__inputs">
          <div class="inputs__range">
            ${this.plotParameters?.variables?.map((v: Variable) => {
              return html`<plot-range
                value=${v.value}
                min=${v.min}
                max=${v.max}
                name=${ifDefined(v.name)}
                units=${v.units}
                step=${ifDefined(v.step)}
                .range=${v.range || []}
                symbol=${v.glyph}
                @input="${this.eventDebouncer(v.glyph)}"
              ></plot-range>`;
            })}
          </div>

          <div class="inputs__toggle">
            <plot-switch @toggle="${this.handleLogToggle}">
              Trigger Log
            </plot-switch>
            <plot-switch @toggle="${this.handleFixToggle}">
              Trigger Fixed
            </plot-switch>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [style];
  }
}
