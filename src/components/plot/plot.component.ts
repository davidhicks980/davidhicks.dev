import './pk-range.component';
import './pk-latex.component';
import './toggle.component';
import { Chart, ScatterDataPoint, registerables } from 'chart.js';
import { plotOptions } from './plot-options.config';
import { VariableSet } from './types/VariableSet';
import { PlotParameters } from './types/PlotPage';
import { Variable } from './types/Variable';
import { customElement, property, query, state } from 'lit/decorators.js';
import { style } from './plot.css';
import { html, LitElement } from 'lit';
import { getParamNames } from '../../util/functions/get-param-names';
import { plots } from './plot-samples';
import { createDebouncer } from './createDebouncer';
import { ifDefined } from 'lit/directives/if-defined.js';
import { debounce } from '../../util/functions/debounce';
/**
 * Component that renders a plot to the DOM given a list of parameters (see PlotParameters interface)
 * @param {PlotParameters} params - this function generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */
@customElement('plot-engine')
export class PlotEngine extends LitElement {
  /**Declarations */
  @state()
  params: Partial<PlotParameters> = plots.multipledose;
  private _plotType = 'multipledose';

  @property({ type: String, reflect: true })
  public get plotType() {
    return this._plotType;
  }
  public set plotType(value: string) {
    this._plotType = value;
    this.params = plots[value];
    this._resetWorker();
  }
  @property({ type: Object, reflect: false })
  loaded = {};
  @property({ type: Boolean, reflect: false })
  mobile = false;
  @query('#chart')
  canvas!: HTMLCanvasElement;
  @query('.container', true)
  container!: HTMLDivElement;
  @query('.container__chart', true)
  chartContainer!: HTMLDivElement;
  /**Sets the highlight color of the plot */
  @property({ type: String })
  mainColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-7');
  @property({ type: String })
  highlightColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-6');
  @property({ type: String })
  displayedEquation!: string;
  isMultipleDose!: boolean;
  tauValueArray = [null, 4, 8, 12, 18, 24, 36, 48];
  plottedEquation = '';
  latexEquation = '';
  range = 10;
  labels!: string[];
  independentVariable!: string;
  eventDebouncer: (params: {}) => any;
  private variableValues: VariableSet = {};
  chart!: Chart;
  scale = 40;
  worker!: Worker;
  lockSVG: any;
  generateCoordinates!: (values: {}, equation: string, scale?: number) => void;

  createWorker(methodBody: string) {
    const blob = new Blob(['self.onmessage = ', methodBody], {
      type: 'text/javascript',
    });
    const url = URL.createObjectURL(blob);

    return new Worker(url);
  }

  private logToggle(e: CustomEvent<{ toggled: boolean }>): void {
    if (this.chart?.options?.scales?.y) {
      this.chart.options.scales.y.type =
        e.detail.toggled ?? false ? 'logarithmic' : 'linear';
    }
    this.chart.update();
  }
  private fixToggle(e: CustomEvent<{ toggled: boolean }>): void {
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
  _initPlotting(chart: Chart) {
    this._initVariables();
    this._initiateUpdates(chart);
  }
  firstUpdated() {
    this.chart = this._createChart(
      this.canvas,
      this.mainColor,
      this.highlightColor
    );
    this._initPlotting(this.chart);
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
  private _initVariables() {
    const { equation, range, axis, independentVariable, variables } =
      this.params;
    if (equation && Array.isArray(variables)) {
      //Replaces user-interpolated variables and ASCII syntax with property accessor that utilize dot notations. Honestly, probably didn't need to replace anything here, but it works fine and may have a small performance benefit.
      this.plottedEquation = equation
        .replace(/v\[\"/g, 'variables.')
        .replace(/\"]/g, '')
        .replace(/\^/g, '**')
        .replace(/\`/g, '');
      //The side of the X axis. Defaults to 100
      this.range = range || 100;
      //Axis labels. Should be provided as ['x', 'y']
      this.labels = axis || ['x', 'y'];
      //The independent variable. Defaults to x. This is only used in the interpolated equation, so it does not affect the graph itself
      this.independentVariable = independentVariable || 'x';
      //Initiate the variable values
      for (const v of variables) {
        this.variableValues[v.symbol] = v.value;
      }
      //Can now initiate graphing
      this.loaded = true;
    }
  }
  private _createChart(
    canvasElement: HTMLCanvasElement,
    color: string,
    highlight: string
  ) {
    return new Chart(
      canvasElement,
      plotOptions([{ x: 0, y: 0 }], canvasElement, color, highlight)
    );
  }
  private _initiateUpdates(chart: Chart) {
    this._setPlotFunction(this.plotPoints.bind(this), chart);
    this.updateLatexEquation();
    this.generateCoordinates(
      this.variableValues,
      this.plottedEquation,
      this.range
    );
  }
  private _resetWorker() {
    this.worker.terminate();
    this._initPlotting(this.chart);
  }
  private _setPlotFunction(
    updateChart: (points: ScatterDataPoint[], chart: Chart) => void,
    chart: Chart
  ) {
    const { multipleDose } = this.params;
    if (window.Worker) {
      this.worker = multipleDose
        ? this.createWorker(this.stringifyWorkerMethod(this.multipleDoseMethod))
        : this.createWorker(this.stringifyWorkerMethod(this.bolusMethod));
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

    if (this.params.equation) {
      this.displayedEquation = interpolateLatex(
        this.params?.equation
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

  stringifyWorkerMethod(
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
            ${this.params?.variables?.map((v: Variable) => {
              return html`<plot-range
                value=${v.value}
                min=${v.min}
                max=${v.max}
                name=${ifDefined(v.name)}
                units=${v.units}
                step=${ifDefined(v.step)}
                .range=${v.range || []}
                symbol=${v.symbol}
                @input="${this.eventDebouncer(v.symbol)}"
              ></plot-range>`;
            })}
          </div>

          <div class="inputs__toggle">
            <plot-switch @toggle="${this.logToggle}"> Trigger Log </plot-switch>
            <plot-switch @toggle="${this.fixToggle}">
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
