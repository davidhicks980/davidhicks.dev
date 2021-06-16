import katex from '../../node_modules/katex';
import AsciiMathParser from '../../node_modules/asciimath2tex/asciimath2tex';
import { LitElement, html, css } from 'lit';
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
      this.katex.render(this.getTex.parse(input), this.equationDiv, {
        displayMode: true,
      });
    this._equation = input;
  }

  constructor() {
    super();
    this.getTex = new AsciiMathParser();
    this.katex = katex;
  }

  render() {
    return html` <div id="equation"></div> `;
  }
  static get styles() {
    return [style];
  }
}
