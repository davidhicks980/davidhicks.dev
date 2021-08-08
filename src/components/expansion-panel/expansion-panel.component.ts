import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { style } from './expansionpanel.css';
import { ExpandMixin } from '../../util/mixins/expandable.mixin';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends ExpandMixin(LitElement) {
  @property({ type: Boolean, reflect: true })
  open = false;
  @state()
  backgroundStyle: { backgroundImage: string };
  // @property({ type: String, attribute: true })
  // imageURI: string = 'none';

  constructor() {
    super();
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.controllers = {
      expansion: this.makeCollapsible(
        'portfolio',
        document.querySelector('content-tree')
      ),
    };
    this.updatePanel('.expansion__content');
  }

  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);

    /* if (_changedProperties.has('imageURI')) {
      this.backgroundStyle = {
        backgroundImage: 'url("' + this.imageURI + '")',
      };
    }*/
  }

  handleSlotChange() {
    setTimeout(this.updateOffset.bind(this), 100);
  }
  render() {
    return html`
      <button @click="${this.handleToggle}" class="expansion">
        <span class="expansion__img"></span>
        <span class="expansion__summary">
          <h1><slot name="header"></slot></h1>
          <hr class="expansion__summary__ruler" />
          <p><slot name="description"></slot></p>
          <slot name="built-with"></slot>
        </span>
      </button>
      <div class="expansion__content">
        <div class="expansion__content__padding">
          <slot @slotchange="${this.handleSlotChange}" name="content"></slot>
        </div>
      </div>
    `;
  }
  static get styles() {
    return [style];
  }
}
