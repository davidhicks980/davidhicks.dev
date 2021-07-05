import {
  LitElement,
  html,
  css,
  CSSResultGroup,
  TemplateResult,
  nothing,
} from 'lit';
import { property, state } from 'lit/decorators.js';
export class DrawerComponent extends LitElement {
  @property({ type: Boolean, reflect: true })
  opened: boolean = true;
  @property({ type: Boolean, reflect: true })
  mobile: boolean = false;

  @state()
  attachTemplate: boolean = true;
  opening: boolean;

  firstUpdated(_changedProperties) {
    this.addEventListener('transitionend', (ev) => {
      if (this.opened === false) {
        this.attachTemplate = false;
        this.opening = false;
      }
    });
  }
  willUpdate(_changedProperties) {
    if (_changedProperties.has('opened')) {
      if (this.opened === true) {
        this.opening = true;
        this.attachTemplate = true;
      }
    }
  }

  render(): TemplateResult | Symbol {
    return this.attachTemplate
      ? html`
          <div class="drawer">
            <p>${this.opened}</p>
            <slot name="title"></slot>
            <!-- Default slot-->
            <slot></slot>
          </div>
        `
      : nothing;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        :host {
          --drawer--height: 100%;
          --drawer--width: 100%;
          --drawer--background: var(--gray-11);
          width: var(--drawer-width);
          height: var(--drawer-height);
          overflow: hidden;
          flex-direction: column;
          align-items: center;
          display: flex;
          position: sticky;
          background: var(--drawer-background);
        }
        :host([mobile]) {
          --drawer--width: 100vw;
          --drawer--height: 100vh;

          top: 0px;
          left: 0px;
          transform-origin: top center;
          transition-property: opacity transform;
          transition: 650ms cubic-bezier(0.57, 0.04, 0.16, 0.95);
          transform: translateY(-100%);
          /*Layout*/
        }
        :host([mobile][opened]) {
          transform: translateY(0%);
        }

        :host([mobile][opened]) .drawer {
          transform: translateY(0%);
          opacity: 1;
          transition: 650ms cubic-bezier(0.57, 0.04, 0.16, 0.95);
        }
        :host([mobile]) .drawer {
          display: flex;
          flex-direction: column;
          position: absolute;
          align-items: center;
          height: 100%;
          width: 100%;
          transform: translateY(100%);
          transition-property: opacity transform;
          transition-delay: 0ms;

          transition: 650ms cubic-bezier(0.57, 0.04, 0.16, 0.95);
          opacity: 0;
        }
      `,
    ];
  }
}
