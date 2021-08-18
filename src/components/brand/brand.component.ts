import { LitElement, html, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './subtitle/subtitle.component';
import './title/title.component';
import './logo/logo.component';
import { style } from './brand.css';
@customElement('brand-component')
export class BrandComponent extends LitElement {
  @property({ type: Boolean, reflect: true })
  mobile = false;
  @property({ type: Boolean, reflect: true })
  tablet = false;

  constructor() {
    super();
  }

  titleTemplate = html`<div class="brand-grid__title">
    <title-component></title-component>
  </div> `;

  render(): TemplateResult {
    return html`<div class="brand-grid">${this.titleTemplate}</div> `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
