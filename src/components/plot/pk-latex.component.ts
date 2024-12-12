import AsciiMathParser from 'asciimath2tex';
import { render } from 'katex';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './latex.css';
@customElement('pk-latex')
export class PkLatex extends LitElement {
  @property({ type: String })
  equation = '';

  @query('#equation')
  private equationDiv?: HTMLDivElement;

  private asciiMathParser: AsciiMathParser = new AsciiMathParser();

  willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('equation')) {
      render(this.asciiMathParser.parse(this.equation), this.equationDiv, {
        displayMode: true,
      });
    }
  }

  render() {
    return html` <div id="equation"></div> `;
  }
  static get styles() {
    return [style];
  }
}
