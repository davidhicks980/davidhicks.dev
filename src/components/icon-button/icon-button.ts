import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { style } from './iconbutton.css';
export class HicksIconButton extends LitElement {
  @property({ type: String }) src: string = '';
  @property({ type: Boolean, reflect: true }) toggled: boolean = false;

  @property() color: string = 'black';

  handleClick = (event: MouseEvent) => {
    this.toggled = !this.toggled;
  };
  render(): TemplateResult {
    this.style.setProperty('--icon--color', this.color);
    return html`
      <button @click="${this.handleClick}" class="icon__button">
        <img src="${this.src}" />
      </button>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [
      style,
      css`
        :host {
          --icon--color: black;
          fill: var(--icon--color);
        }
      `,
    ];
  }
}
