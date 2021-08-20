import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './status.css';
import { svg } from 'lit';

export enum Status {
  NOT_SUBMITTED,
  UNSUCCESSFUL,
  SUBMITTED,
  SUCCESSFUL,
}
@customElement('hicks-status')
export class StatusComponent extends LitElement {
  @property({ type: Number, reflect: true }) status: Status;
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
        return '';
    }
  }
  render(): TemplateResult | '' {
    return html`<div class="status-container">
      <slot></slot>${this.iconTemplate(this.status)}
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
