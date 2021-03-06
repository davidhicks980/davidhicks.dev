import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('logo-component')
export class LogoComponent extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  render(): TemplateResult {
    return html`<a tabindex="-1" href="#" title="Home"
      ><svg
        class="fill-green"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 184.87 113.74"
      >
        <g id="pill-logo">
          <path
            id="pill"
            d="M120.76,2.8h0A25,25,0,0,0,87,13.56L53.75,77.12A25,25,0,0,0,64.11,111h0a24.88,24.88,0,0,0,19,1.61,25.78,25.78,0,0,0,14.7-12.37l16.55-31.58,16.72-32A25,25,0,0,0,120.76,2.8ZM93.44,95.2A20,20,0,0,1,85.16,104c-7.07,4.1-14.62,2.41-17.91,1.37-9.16-4.82-12.38-16.88-7.16-26.84C65,69.09,70,59.53,74.88,50.05a71.92,71.92,0,0,0,17,12.37,69.37,69.37,0,0,0,15.67,5.78Zm5.87-81.15a32.86,32.86,0,0,0-2.41,3.53c-4.5,8-10.77,19.85-12.38,22.9A7.79,7.79,0,0,1,81.63,38L93,15.57a25.23,25.23,0,0,1,7.79-7.87A23.44,23.44,0,0,1,105,5.53l2.25-.64,2,1.68a25.28,25.28,0,0,0-10,7.48Z"
          />
          <g id="right">
            <path
              d="M184.85,51.07h0v7.33h0L143.8,80.87a1.6,1.6,0,0,1-.27-.88V74.11a.74.74,0,0,1,.37-.62L177,55.37a.71.71,0,0,0,0-1.24L143.9,36.22a.72.72,0,0,1-.37-.62V29.9a.71.71,0,0,1,1.05-.62Z"
            />
          </g>
          <g id="left">
            <path
              d="M0,51.07H0v7.33H0L41.07,80.87a1.6,1.6,0,0,0,.27-.88V74.11a.72.72,0,0,0-.37-.62L7.87,55.37a.71.71,0,0,1,0-1.24L41,36.22a.7.7,0,0,0,.37-.62V29.9a.7.7,0,0,0-1-.62Z"
            />
          </g>
        </g></svg
    ></a> `;
  }
  static get styles() {
    return css`
      .fill-green {
        fill: var(--secondary-4);
      }
      :host {
        display: block;
      }
    `;
  }
}
