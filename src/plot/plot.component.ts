import './pk-range.component';
import './pk-latex.component';
import './toggle.component';
import {
  Chart,
  ScatterDataPoint,
  registerables,
} from 'chart.js/dist/chart.esm';
import { html, LitElement } from 'lit';

import { plotOptions } from './plot-options.config';
import { VariableSet } from './VariableSet.type';
import { PlotParameters } from './PlotPage';
import { Variable } from './Variable';
import { customElement, property, query, state } from 'lit/decorators.js';
import { style } from './plot.css';

/**
 * Component that renders a plot to the DOM given a list of parameters (see PlotParameters interface)
 * @param {PlotParameters} params - this function generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */

const plots = {
  multipledose: {
    id: 'pk_mdmp_q2_mdplot',
    index: 2,
    title: 'Multiple Dosing Regimen Plot',
    header:
      'Drug X is an antibiotic with a therapeutic range between 20 and 40 mg/L. It is administered as an IV bolus. The population average for clearance and volume are 6 L/h and 85 L, respectively. Using the slider bars, explore how changes in dose and dosing interval impact achieving concentrations within the therapeutic window while maintaining an average steady-state concentration of 30 mg/L.',
    variables: [
      {
        name: 'Dose',
        units: 'mg',
        symbol: 'X_0',
        min: 500,
        max: 4500,
        value: 1000,
        step: 50,
      },
      {
        name: 'Number of Doses',
        units: '#',
        symbol: 'n',
        min: 4,
        max: 24,
        value: 4,
        step: 2,
      },
      {
        name: 'Volume of Distribution',
        units: 'L',
        symbol: 'V_D',
        min: 50,
        max: 500,
        value: 250,
        step: 5,
      },
      {
        name: 'Clearance',
        units: 'mL/min',
        symbol: 'Cl',
        min: 5,
        max: 50,
        value: 100,
        step: 5,
      },
      {
        name: 'Dosing Interval',
        units: 'hr',
        symbol: 'tau',
        min: 1,
        max: 7,
        value: 4,
        step: 1,
        range: [null, 4, 8, 12, 18, 24, 36, 48],
      },
    ],
    equation:
      '`(v["X_0"]/v["V_D"])*(1-2.71^(-n*0.06*(v["Cl"]/v["V_D"])*v["tau"]))/(1-2.71^(-0.06*(v["Cl"]/v["V_D"])*v["tau"]))*(2.71^(-0.06*(v["Cl"]/v["V_D"])*x))`',
    equationTemplate: '',
    multipleDose: true,
    bottomBound: 20,
    topBound: 40,
    axis: ['time (hr)', 'concentration (ug/L)'],
  },
  extravasation: {
    id: 'pk_akct_q1_scplot',
    title: 'Extravascular Administration',
    index: 1,
    header:
      'Move the slider bar to see the effects of clearance on the concentration-time profile. Concentration is related to time using the equation.',
    variables: [
      {
        name: 'Dose',
        units: 'mg',
        symbol: 'X_0',
        min: 250,
        max: 1000,
        value: 500,
        step: 50,
      },
      {
        name: 'Clearance',
        units: 'mL/min',
        symbol: 'Cl',
        min: 5,
        max: 50,
        value: 25,
        step: 5,
      },
      {
        name: 'Volume of Distribution',
        units: 'L',
        symbol: 'V_D',
        min: 50,
        max: 500,
        value: 250,
        step: 10,
      },
      {
        name: 'k<sub>a</sub>',
        units: '1/h',
        symbol: 'k_a',
        min: 0.1,
        max: 1,
        value: 0.5,
        step: 0.05,
      },
    ],
    equation:
      '`(v["k_a"]*v["X_0"])/(v["V_D"]*v["k_a"]-(0.06*v["Cl"]/v["V_D"]))*(2.71^(-(0.06*v["Cl"]/v["V_D"])*x)-2.71^(-v["k_a"]*x))`',
    equationTemplate: '`C = `',
    axis: ['time (min)', 'drug X(mg/L)'],
    multipleDose: false,
  },
};

@customElement('plot-engine')
export class PlotEngine extends LitElement {
  /**Declarations */
  @state()
  params: Partial<PlotParameters> = plots.multipledose;
  private _plotType = 'multipledose';
  mobile: boolean;

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
  @query('#chart')
  canvas!: HTMLCanvasElement;
  @query('.container', true)
  container: HTMLDivElement;
  /**Sets the highlight color of the plot */
  @property({ type: String })
  mainColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-8');
  @property({ type: String })
  highlightColor: string = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-6');
  @property({ type: String })
  displayedEquation!: string;
  isMultipleDose!: boolean;
  tauValueArray = [null, 4, 8, 12, 18, 24, 36, 48];
  plottedEquation: string = '';
  latexEquation: string = '';
  range: number = 10;
  labels!: string[];
  independentVariable!: string;
  private variableValues: VariableSet = {};

  chart: Chart;
  scale: number = 40;
  worker!: Worker;
  lockSVG: any;
  plotFunction!: (values: {}, equation: string, scale?: number) => void;

  createWorker(fn) {
    const blob = new Blob(['self.onmessage = ', fn.toString()], {
      type: 'text/javascript',
    });
    const url = URL.createObjectURL(blob);

    return new Worker(url);
  }

  private logToggle(e: Event): void {
    this.chart.options.scales.y.type = (e.target as HTMLInputElement).checked
      ? 'logarithmic'
      : 'linear';
    this.chart.update();
  }
  private fixToggle(e: Event): void {
    this.chart.options.scales.y.max = (e.target as HTMLInputElement).checked
      ? this.max()
      : null;
    this.chart.update();
  }
  private max(): number {
    const data = this.chart.data.datasets[0].data as ScatterDataPoint[];
    return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
  }
  _initPlotting(chart) {
    this._initVariables();
    this._initPlotUpdate(chart);
  }
  firstUpdated() {
    this.chart = this._initPlotCanvas(
      this.canvas,
      this.mainColor,
      this.highlightColor
    );
    this._initPlotting(this.chart);
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.classList.contains('container')) {
          this.container.classList.remove('is-small');
          const contentWidth = entry?.contentRect?.width;
          if (contentWidth < 500) {
            this.container.classList.add('is-small');
          }
        }
      }
    });
    resizeObserver.observe(this.container);
  }
  constructor() {
    super();
    this.eventDebouncer = this.createDebouncer(this.updatePlot, 30);
    Chart.register(...registerables);
  }
  /**
   * @description Sets variables using user-supplied or default values. This must be called prior to plotting any equations
   * @private
   * @memberof PlotEngine
   */
  private _initVariables() {
    if (this.params?.equation && Array.isArray(this.params?.variables)) {
      //Replaces user-interpolated variables and ASCII syntax with property accessor that utilize dot notations. Honestly, probably didn't need to replace anything here, but it works fine and may have a small performance benefit.
      this.plottedEquation = this.params.equation
        .replace(/v\[\"/g, 'variables.')
        .replace(/\"]/g, '')
        .replace(/\^/g, '**')
        .replace(/\`/g, '');
      //The side of the X axis. Defaults to 100
      this.range = this.params.range ? this.params.range : 100;
      //Axis labels. Should be provided as ['x', 'y']
      this.labels = this.params.axis;
      //The independent variable. Defaults to x. This is only used in the interpolated equation, so it does not affect the graph itself
      this.independentVariable = this.params.independentVariable
        ? this.params.independentVariable
        : 'x';
      //Initiate the variable values
      this.params.variables.forEach((v) => {
        this.variableValues[v.symbol] = v.value;
      });
      //Can now initiate graphing
      this.loaded = true;
    }
  }
  private _initPlotCanvas(
    canvasElement: HTMLCanvasElement,
    color: string,
    highlight: string
  ) {
    return new Chart(
      canvasElement,
      plotOptions([{ x: 0, y: 0 }], canvasElement, color, highlight)
    );
  }
  private _initPlotUpdate(chart: Chart) {
    const updateChart = this.updateChart;
    this._initCoordinateFunction(updateChart, chart);
    this.latex.update();
    this.plotFunction(this.variableValues, this.plottedEquation, this.range);
  }
  private _resetWorker() {
    this.worker.terminate();
    this._initPlotting(this.chart);
  }
  private _initCoordinateFunction(
    updateChart: (points: ScatterDataPoint[], chart: Chart) => void,
    chart: Chart
  ) {
    if (window.Worker) {
      this.worker = this.params.multipleDose
        ? this.createWorker(this.multipleDosingWorker)
        : this.createWorker(this.bolusDosingWorker);
      this.worker.onmessage = function (ev) {
        updateChart(ev.data, chart);
      };
      this.plotFunction = (values: {}, equation: string, range: number) => {
        this.worker.postMessage([values, equation, range]);
      };
    } else {
      this.plotFunction = this.params.multipleDose
        ? this.nativeFunctions.multipleDose
        : this.nativeFunctions.bolus;
    }
  }

  updateChart(points: ScatterDataPoint[], chart: Chart) {
    chart.data.datasets[0].data = points;
    chart.update();
  }
  get nativeFunctions() {
    return {
      /**Updates the bolus coordinates*/
      bolus: (values: VariableSet, equation: string, scale: number) => {
        return this.calculations.bolus(values, equation, scale);
      },
      multipleDose: (values: VariableSet, equation: string) => {
        return this.calculations.multipleDose(values, equation);
      },
    };
  }

  get calculations() {
    return {
      /**
       * Multiple dose coordinate calculation
       * @param {VariableSet} values - key value pairs representing variable values
       * @param {string} equation - a string representing an equation with interpolated variables
       * @returns {ScatterDataPoint[]} an array of coordinates
       */
      multipleDose: (
        values: VariableSet,
        equation: string
      ): ScatterDataPoint[] => {
        const tau = values['tau'],
          doses = values['n'],
          calculate = new Function(
            'variables',
            'x',
            'n',
            '"use strict";return (' + equation + ')'
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
      },
      /**
       * Bolus dose coordinate calculation
       * @param {VariableSet} values - key value pairs representing variable values
       * @param {string} equation - a string representing an equation with interpolated variables
       * @param {number} scale - A number representing the size of the x-axis. Defaults to 40.
       * @returns {ScatterDataPoint[]} an array of coordinates
       */
      bolus: (
        values: VariableSet,
        equation: string,
        scale: number
      ): ScatterDataPoint[] => {
        let i = 0;
        const data = [];
        const calculate = new Function(
          'variables',
          'x',
          '"use strict"; return (' + equation + ')'
        );
        for (i; i < scale; i += 0.5) {
          data.push({
            x: i++,
            y: calculate(values, i),
          });
        }
        return data;
      },
    };
  }

  latex = {
    interpolateVariables: (equation: string, variables: object): string => {
      const calculate = new Function(
        'variables',
        '"use strict";return (' + equation + ')'
      );
      return calculate(variables);
    },
    update: () => {
      this.displayedEquation = this.latex
        .interpolateVariables(
          this.params.equation
            .replace(/v\["/g, '${variables.')
            .replace(/"\]/g, '.toFixed(1)}'),
          this.variableValues
        )
        .replace(/x/g, 'time')
        .replace(/2.71/g, 'e')
        .replace(/\*?-?\*?0.06\*?/g, '');
    },
  };

  minMaxCalc(name: string, value: number, type: string) {
    if (name === 'tau') {
      const comparator = type !== 'none' ? Math[type] : 1;
      comparator !== 1
        ? this.tauValueArray[value]
        : comparator(this.tauValueArray);
    } else {
      return value;
    }
  }
  disconnectedCallback() {
    this.worker.terminate();
  }

  multipleDosingWorker = (ev: MessageEvent<any[]>): void => {
    const values = ev.data[0];
    const equation = ev.data[1];

    const tau = values['tau'],
      doses = values['n'],
      calculate = new Function(
        'variables',
        'x',
        'n',
        '"use strict";return (' + equation + ')'
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
    postMessage(data, null);
  };
  bolusDosingWorker = (ev: MessageEvent<any[]>): void => {
    let i = 0;
    const data = [];
    const calculate = new Function(
      'variables',
      'x',
      '"use strict"; return (' + ev.data[1] + ')'
    );
    for (i; i < 40; i += 0.5) {
      data.push({
        x: i++,
        y: calculate(ev.data[0], i),
      });
    }

    postMessage(data, null);
  };

  get parameters() {
    if (this.params.variables) return this.params.variables;
    else return [];
  }

  createDebouncer = (method: (...args: any) => any, delay: number) => {
    let timeout = false;
    return (params: {}) => (e) => {
      if (!timeout) {
        // Executes the func after delay time.
        timeout = true;
        setTimeout(() => {
          method(params, e);
          timeout = false;
        }, delay);
      }
    };
  };

  eventDebouncer: (params: {}) => any;
  updatePlot = (slider, e) => {
    this.variableValues[slider.symbol] = parseFloat(e.detail.value);
    this.latex.update();

    this.plotFunction(this.variableValues, this.plottedEquation, this.range);
  };
  render() {
    return html`
      <div class="container">
        <div class="container__chart">
          <canvas id="chart"></canvas>
        </div>
        <div class="container__inputs">
          <div class="inputs__range">
            ${this.params.variables.map((v: Variable) => {
              return html`<pk-range
                .variable="${v}"
                @shift="${this.eventDebouncer(v)}"
              ></pk-range>`;
            })}
          </div>

          <div class="inputs__toggle">
            <pk-toggle @toggle="${this.logToggle}"> Trigger Log </pk-toggle>
            <pk-toggle @toggle="${this.fixToggle}"> Trigger Fixed </pk-toggle>
          </div>
        </div>
        <div class="container__latex">
          <div style="overflow: auto">
            <pk-latex
              class="scale-equation"
              .equation="${this.displayedEquation}"
            ></pk-latex>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [style];
  }
}
