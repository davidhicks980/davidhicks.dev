import { render } from 'katex';
import AsciiMathParser from 'asciimath2tex';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './latex.css';
@customElement('pk-latex')
export class PkLatex extends LitElement {
  getTex: AsciiMathParser;
  katex: any;
  @query('#equation')
  equationDiv?: HTMLDivElement;
  private _equation: any;
  @property({
    type: String,
  })
  get equation() {
    return this._equation;
  }
  set equation(input) {
    if (input && this.equationDiv)
      render(this.getTex.parse(input), this.equationDiv, {
        displayMode: true,
      });
    this._equation = input;
  }

  constructor() {
    super();
    this.getTex = new AsciiMathParser();
  }

  render() {
    return html` <div id="equation"></div> `;
  }
  static get styles() {
    return [style];
  }
}
