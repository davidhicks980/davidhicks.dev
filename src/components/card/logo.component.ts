import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
@customElement('logo-component')
export class LogoComponent extends LitElement {
  //@property({ type: Array }) propArray: any[];
  //@property({ type: String }) propString: string;
  //@property({ type: Boolean }) propBoolean: boolean;
  //@property({ type: Object }) propObject: object;
  //@property({ type: Number }) propNumber: number;*/
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
        fill: var(--logo--fill);
      }
    `;
  }
}
