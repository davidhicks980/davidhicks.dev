import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAsync } from 'lit/decorators.js';
import { style } from './expansionpanel.css';
import { classMap } from 'lit/directives/class-map.js';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends LitElement {
  @query('slot[name=content]')
  contentSlot: HTMLSlotElement;
  @query('.expansion__img')
  image: HTMLDivElement;
  private _imageURI = '';

  @property({ type: Boolean, reflect: true })
  open = false;
  @property({ type: Number, reflect: true })
  expansionHeight = 0;
  @property({ type: String, attribute: true })
  public get imageURI() {
    return this._imageURI;
  }
  public set imageURI(image: string) {
    const oldImage = this._imageURI;
    this._imageURI = image;
    if (this.image) {
      this.image.style.backgroundImage = 'url("' + image + '")';
    }
    this.requestUpdate('imageURI', oldImage);
  }

  toggle() {
    this.open = !this.open;
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.image.style.backgroundImage = 'url("' + this.imageURI + '")';
  }
  render() {
    const contentClass = { 'is-shown': this.open };
    return html`
      <button class="expansion" @click="${this.toggle}">
        <div class="expansion__img"></div>
        <div class="expansion__summary">
          <h2><slot class="expansion__title" name="title"></slot></h2>
          <hr class="expansion__summary__ruler" />
          <p><slot class="expansion__description" name="description"></slot></p>
        </div>
      </button>
      <div class="expansion__content ${classMap(contentClass)}">
        <div class="expansion__content__anime">
          <slot class="expansion__content__slot" name="content"></slot>
        </div>
      </div>
    `;
  }
  static get styles() {
    return [style];
  }
}
