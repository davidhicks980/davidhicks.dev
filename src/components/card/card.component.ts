import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';
import { style } from './card.css';

@customElement('hicks-card')
export class HicksCard extends LitElement {
  private _hue: any;
  private _fontColor: any;
  static get styles() {
    return [
      style,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
  private _color: string = 'white';

  @property({ type: String })
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    const oldVal = this._color;
    this._color = value;
    this.style.backgroundColor = value;
    this.requestUpdate('backgroundColor', oldVal);
  }
  @property({ type: String })
  get fontColor(): string {
    return this._fontColor;
  }
  set fontColor(value: string) {
    const oldVal = this._fontColor;
    this._fontColor = value;
    this.style.color = value;
    this.requestUpdate('backgroundColor', oldVal);
  }
  @property({ type: String })
  get hue(): string {
    return this._hue;
  }
  set hue(value: string) {
    const oldVal = this._hue;
    this._hue = value;
    this.style.filter = `hue-rotate(${value}deg)`;
    this.requestUpdate('backgroundColor', oldVal);
  }
  constructor() {
    super();
  }

  render() {
    return html`<h1><slot name="title"></slot></h1>
      <p><slot name="body"></slot></p>
      <footer><slot name="footer"></slot></footer>`;
  }
}
