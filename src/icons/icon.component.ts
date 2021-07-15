import { LitElement, html, css, CSSResultGroup } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedNodes,
} from 'lit/decorators.js';
//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
@customElement('icon-component')
export class IconComponent extends LitElement {
  @query('div')
  anchor: HTMLAnchorElement;
  @queryAssignedNodes('', true)
  slotButton;
  @property({ type: Boolean, reflect: true })
  selected = false;
  @property({ type: String, reflect: true })
  icon = '';

  render() {
    return html` <svg class="" xmlns="http://www.w3.org/2000/svg">
      <filter
        id="color-filter"
        color-interpolation-filters="sRGB"
        x="0"
        y="0"
        height="100%"
        width="100%"
      >
        <feFlood result="COLOR" />
        <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
      </filter>
      <image
        href="${this.icon}"
        filter="url(#color-filter)"
        width="100%"
        height="100%"
      ></image>
    </svg>`;
  }

  static get styles(): CSSResultGroup[] {
    return [
      css`
        :host {
          --icon--fill: black;
        }
        div svg {
          height: 2rem;
          fill: var(--icon--fill);
        }
        div slot {
          visibility: hidden;
        }
      `,
    ];
  }
}
