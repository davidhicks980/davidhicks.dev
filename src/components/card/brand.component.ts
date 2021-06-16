import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './subtitle.component';
import './title.component';
import './logo.component';
import { style } from './brand.css';
@customElement('brand-component')
export class BrandComponent extends LitElement {
  //@property({ type: Array }) propArray: any[]
  //@property({ type: String }) propString: string
  //@property({ type: Boolean }) propBoolean: boolean
  //@property({ type: Object }) propObject: object
  //@property({ type: Number }) propNumber: number
  //@property() color: string = 'black'
  render(): TemplateResult {
    //const colorStyle = styleMap({ color: this.color })
    return html`<div class="brand-grid">
      <div class="brand-grid__logo"><logo-component></logo-component></div>
      <div class="brand-grid__title"><title-component></title-component></div>
      <div class="brand-grid__subtitle">
        <subtitle-component></subtitle-component>
      </div>
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
