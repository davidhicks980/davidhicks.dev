import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hicks-card-container')
export class HicksCardContainer extends LitElement {
  private _gap = '1rem';

  @property({ reflect: true })
  public get gap() {
    return this._gap;
  }
  public set gap(value) {
    const oldVal = this._gap;
    this._gap = value;
    this.style.gridGap = value;
    this.style.gap = value;
    this.requestUpdate('gap', oldVal);
  }

  render() {
    return html`<slot class="grid"></slot>`;
  }
  static get styles() {
    return css`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        grid-gap: 1rem;
        height: 100%;
        width: 100%;
      }
    `;
  }
}
