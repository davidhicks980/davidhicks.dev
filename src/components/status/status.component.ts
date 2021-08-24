import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './status.css';
import { svg } from 'lit';
import { Readable } from 'stream';

export enum Status {
  NOT_SUBMITTED,
  UNSUCCESSFUL,
  SUBMITTED,
  SUCCESSFUL,
}
const warn = (
  primary: string,
  secondary: string
) => svg`<svg class='icon-dimensions' xmlns="http://www.w3.org/2000/svg"  x="0" y="0" version="1.1" viewBox="0 0 24 24" >
  <path fill="${secondary}" stroke="${primary}" stroke-miterlimit="10" d="M11.3 2.4L2.1 18.8c-.3.6.1 1.2.7 1.2h18.4c.6 0 1-.7.7-1.2L12.7 2.4c-.3-.5-1.1-.5-1.4 0z"/>
  <g>
    <circle fill="${primary}" id="dot" cx="12" cy="16.9" r="1" class="st1"/>
    <path fill="${primary}" id="line" d="M12 6.7c.5 0 .9.4.9 1v5.7c0 .5-.4 1-.9 1s-.9-.4-.9-1V7.7c0-.5.4-1 .9-1z" class="st1"/>
  </g>
</svg>
`;
@customElement('hicks-status')
export class StatusComponent extends LitElement {
  @property({ type: Number, reflect: true }) status: Status;
  @property({ type: String, attribute: 'icon-placement' })
  iconPlacement: 'before' | 'after' = 'after';
  constructor() {
    super();
    this.status = Status.NOT_SUBMITTED;
  }
  iconTemplate(status: Status) {
    switch (status) {
      case Status.NOT_SUBMITTED:
        return '';
      case Status.SUBMITTED:
        return svg`<svg
            class="loading-parent icon-dimensions"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle class="loading" cx="60" cy="60" r="10" />
            <circle class="loading-reverse" cx="25" cy="25" r="12.5" />
          </svg>
        `;
      case Status.SUCCESSFUL:
        return svg`<svg
      class="checkmark icon-dimensions"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <path
        class="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>`;
      case Status.UNSUCCESSFUL:
        return warn('var(--complement-9)', 'var(--complement-2)');
      default:
        return '';
    }
  }
  render(): TemplateResult | '' {
    let icon = this.iconTemplate(this.status);
    let placeBefore = this.iconPlacement === 'before';
    return html`<div class="status-container">
      ${placeBefore ? icon : ''}<slot></slot>${placeBefore ? '' : icon}
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
