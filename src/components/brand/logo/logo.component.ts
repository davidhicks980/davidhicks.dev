import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('logo-component')
export class LogoComponent extends LitElement {
  @property()
  color: string = 'black';

  render(): TemplateResult {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 209.68 135.72"
      class="logo__svg"
    >
      <path
        d="M0,0V135.72H209.68V0ZM90.15,78.64,20.59,117.56V93.67L66.78,68.45,20.59,43.06V19.34l69.56,39.1Zm8,42.24Q115.09,69.6,132,18.3l18.84-.38-31.56,102.4Zm64.36.24-21.16.56q16.93-51.3,33.88-102.58l18.84-.38Z"
      />
    </svg>`;
  }
  static get styles() {
    return css`
      :host {
        --logo-fill: black;
      }
      .logo__svg {
        border-radius: 0.3em 0 0.3em 0;
        box-shadow: 2px 2px 3px -1px rgb(0 0 0 / 20%);
        fill: var(--logo--fill);
      }
    `;
  }
}
