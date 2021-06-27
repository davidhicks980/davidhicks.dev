import { LitElement, html, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './subtitle.component';
import './title.component';
import './logo.component';
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
  firstUpdated(_changedProperties) {
    const onResize = (setToProp: string) => {
      return (e: MediaQueryList | MediaQueryListEvent) => {
        this[setToProp] = e.matches;
      };
    };
    const matchMobile = window.matchMedia('screen and (max-width: 599.99px)');
    const matchTablet = window.matchMedia(
      'screen and (min-width: 600px) and (max-width: 899.99px)'
    );
    matchTablet.addEventListener('change', onResize('tablet'));
    matchMobile.addEventListener('change', onResize('mobile'));
    onResize('tablet')(matchTablet);
    onResize('mobile')(matchMobile);
  }
  titles = (shown: boolean) =>
    shown
      ? html`<div class="brand-grid__title">
            <title-component></title-component>
          </div>
          <div class="brand-grid__subtitle">
            <subtitle-component></subtitle-component>
          </div>`
      : nothing;

  render(): TemplateResult {
    return html`<div class="brand-grid">
      <div class="brand-grid__logo">
        <logo-component></logo-component>
      </div>
      ${this.titles(!this.mobile)}
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
