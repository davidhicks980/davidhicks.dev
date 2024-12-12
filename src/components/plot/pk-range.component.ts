import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { style } from './range.css';

/**
 * @component PlotSlider produces a range input that emits a
 * @fires PlotSlider#shift
 * @param {PlotParameters} params - this parametes generates the plot element including range inputs and toggles.
 * @param {string} element - the element to append the plot to. Will default to
 */
@customElement('plot-range')
export class PlotRange extends LitElement {
  @query('.range')
  rangeInput!: HTMLInputElement;

  @query('#valueLabel')
  valueLabel!: HTMLDivElement;

  @property()
  units: string;

  @property()
  symbol: string;

  @property()
  name: string;

  @property({ type: Number })
  min: number;

  @property({ type: Number })
  max: number;

  @property({ type: Number })
  value: number;

  @property({ type: Number })
  step: number;

  @property({ type: Array })
  range: number[];

  @state()
  private stepArray: number[] = [1];

  @state()
  private hasRange = false;

  static get styles() {
    return [style];
  }

  constructor() {
    super();
    this.value = 0;
    this.min = 0;
    this.max = 0;
    this.symbol = 'Symbol not set';
    this.name = 'Name not set';
    this.step = 0;
    this.range = [];
    this.units = 'N/A';
  }
  firstUpdated() {
    if (this.range && this.range.length === 2) {
      this.hasRange = true;
      this.stepArray = this.range;
    }
    this.step = this.sliderStep(this.step, this.max);
  }

  private sliderStep(step: number, max: number): number {
    if (step > 0) {
      return step;
    } else if (max > 10) {
      return 1;
    } else {
      return max / 20;
    }
  }
  handleInput(e: Event) {
    const value = parseFloat((e.target as HTMLInputElement).value);
    this.value = this.hasRange ? this.stepArray[value - 1] : value;
    target.style.backgroundSize = `${
      ((parseFloat(target.value) - this.min) / (this.max - this.min)) * 100
    }%, 10%`;
    this.valueLabel.innerText = output?.toString() ?? '0';
    this.dispatchEvent(new InputEvent('input', { data: output }));
  }

  private get backgroundSize(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
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
            @input="${this.handleInput}"
            type="range"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            value="${this.value}"
            class="range"
            style="background-size: ${this.backgroundSize}% 10%"
            id="${this.name}RangeInput"
          />
        </div>
      </div>
    `;
  }
}
