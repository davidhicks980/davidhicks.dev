import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { style } from './expansionpanel.css';
import { CollapseController } from '../../util/controllers/expansion.controller';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends LitElement {
  @state()
  backgroundStyle: { backgroundImage: string };
  @query('.expansion__content', true)
  collapsingPanel;
  @property({ attribute: 'data-uri', type: String })
  dataURI: string = 'none';
  @property({ type: Boolean, reflect: true })
  collapsed = false;
  controllers: { expansion: CollapseController };

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.controllers = {
      expansion: new CollapseController(
        this,
        'portfolio',
        document.querySelector('content-tree'),
        this.collapsingPanel
      ),
    };
  }

  render() {
    return html`
      <div class="expansion">
        <span class="expansion__img"></span>
        <div class="expansion__summary">
          <h1><slot name="header"></slot></h1>
          <hr class="expansion__summary__ruler" />
          <p><slot name="description"></slot></p>
          <div class="expansion__summary__bottom">
            <div class="expansion__icons">
              <slot name="icon"></slot>
            </div>
            <button @click="${this.toggle}" class="button--text">
              <slot name="button-label"></slot>
            </button>
          </div>
        </div>
      </div>
      <div class="expansion__content">
        <div class="expansion__content__padding">
          <slot @slotchange="${this.updateOffset}" name="content"></slot>
        </div>
      </div>
    `;
  }
  private updateOffset(): void {
    this.controllers.expansion.updateOffset();
  }

  private toggle(): void {
    this.controllers.expansion.toggle();
  }

  static get styles() {
    return [style];
  }
}
