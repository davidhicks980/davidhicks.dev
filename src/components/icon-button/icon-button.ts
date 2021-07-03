import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { style } from './iconbutton.css';
import { literal } from 'lit/static-html.js';
@customElement('hicks-icon-button')
export class HicksIconButton extends LitElement {
  //@property({ type: Array }) propArray: any[]
  @property({ type: String }) src: string = '';
  //@property({ type: Boolean }) propBoolean: boolean
  //@property({ type: Object }) propObject: object
  //@property({ type: Number }) propNumber: number
  @property() color: string = 'black';

  firstUpdated(_changedProperties) {
    this.classList.add('icon-button');
  }
  render(): TemplateResult {
    this.style.setProperty('--icon--color', this.color);
    return html`
      <button class="icon__button">
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
