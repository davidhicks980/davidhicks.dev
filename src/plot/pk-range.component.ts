import { LitElement, css, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { style } from './range.css';
import { Variable } from './Variable';

/**
 * @component  PlotSlider produces a range input that emits a
 * @fires PlotSlider#shift

 * @param {PlotParameters} params - this parametes generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */
@customElement('pk-range')
export class PkRange extends LitElement {
  /**Declarations */

  @property({ type: Object })
  variable: Variable = {
    units: 'na',
    symbol: 'na',
    min: 1,
    max: 5,
    value: 1,
    range: [1, 5],
    name: '',
  };

  @query('#valueLabel')
  valueLabel!: HTMLDivElement;
  private min: number = 1;
  private max: number = 5;
  @state()
  private stepArray: number[] = [1];
  private symbol: string = 'symbol';
  @state()
  private value: number = 0;
  private name: string = 'slider';
  @state()
  private hasRange: boolean = false;
  @state()
  private step: number = 0;
  constructor() {
    super();
  }

  static get styles() {
    return [style];
  }
  connectedCallback() {
    super.connectedCallback();
    this.value = this.variable.value || 0;
    this.min = this.variable.min || 0;
    this.max = this.variable.max || 0;
    this.symbol = this.variable.symbol || 'na';
    this.name = this.variable.name || 'na';
    this.step = typeof this.variable.step === 'number' ? this.variable.step : 0;
    if (this.variable.range) {
      this.hasRange = true;
      this.stepArray = this.variable.range;
    }

    this.requestUpdate();
  }

  private sliderStep(step: number, max: number): number {
    if (step > 0) {
      return step;
    } else {
      if (max > 10) {
        step = 1;
        return 1;
      } else {
        step = max / 20;
        return step;
      }
    }
  }
  handleEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    const output = this.hasRange
      ? this.stepArray[parseFloat(target.value) - 1]
      : target.value;
    target.style.backgroundSize = `${
      ((parseFloat(target.value) - this.min) / (this.max - this.min)) * 100
    }%, 10%`;
    this.valueLabel.innerText = output.toString();
    this.dispatchEvent(
      new CustomEvent('shift', {
        detail: {
          symbol: this.symbol,
          value: output,
        },
      })
    );
  }

  render() {
    return html`
      <div class="range-container">
        <div class="name-label" id="nameLabel">
          ${this.name} <span>(${this.symbol.replace('_', '')})</span>
        </div>
        <label for="${this.name}RangeInput" class="value-label" id="valueLabel">
          ${this.hasRange ? this.stepArray[this.value - 1] : this.value}
        </label>
        <div class="slider-container">
          <input
            @input="${this.handleEvent}"
            type="range"
            min="${this.min}"
            max="${this.max}"
            step="${this.sliderStep(this.step, this.max)}"
            value="${this.value}"
            class="range"
            style="background-size:${`${
              ((this.value - this.min) / (this.max - this.min)) * 100
            }%, 10%`}"
            id="${this.name}RangeInput"
          />
        </div>
      </div>
    `;
  }
}
