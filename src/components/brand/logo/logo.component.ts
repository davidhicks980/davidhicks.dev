import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { svg } from 'lit';
@customElement('logo-component')
export class LogoComponent extends LitElement {
  @property()
  color: string = 'black';

  render(): TemplateResult {
    return svg`<svg class="logo-pill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.51 173.51">
  <defs>
    <style>
      .outline {
        stroke: #a6ce8c;
        stroke-miterlimit: 10;
        stroke-width: 9px;
        fill:none;
      }

      .pill {
        fill: #a6ce8c;
      }
    </style>
  </defs>

      <circle class="outline" cx="86.76" cy="86.76" r="82.26"/>
      <g id="pill">
          <path class="pill" d="M135.3,34.81h0a29.16,29.16,0,0,0-41.19,1.63l-57,61a29.16,29.16,0,0,0,1.15,41.22h0a28.73,28.73,0,0,0,20.84,7.71,30.13,30.13,0,0,0,20.36-9.35l28.33-30.32L136.45,76A29.14,29.14,0,0,0,135.3,34.81ZM76,130.06a24,24,0,0,1-12,7.37c-9.19,2.44-17.19-1.88-20.53-4-8.83-8.35-8.71-22.84.28-32.35l25.44-27.5a80.83,80.83,0,0,0,31.11,30.51Zm31.69-89.24a29.2,29.2,0,0,0-3.78,3.25C96.35,51.7,85.69,63,83,65.91a9.1,9.1,0,0,1-2.51-3.67l19.71-21.65a29.48,29.48,0,0,1,11.23-6.46A29,29,0,0,1,116.88,33l2.76-.06,1.76,2.56a30.2,30.2,0,0,0-13.69,5.28Z"/>
        
      </g>
    
</svg>
`;
  }
  static get styles() {
    return css`
      .logo-pill {
        height: 3rem;
        width: 3rem;
      }
    `;
  }
}
