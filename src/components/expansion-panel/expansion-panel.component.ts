import { LitElement, html } from 'lit';
import {
  customElement,
  property,
  query,
  state,
  queryAsync,
} from 'lit/decorators.js';
import { style } from './expansion-panel.css';
import { CollapseController } from '../../util/controllers/expansion.controller';
import { timer } from 'rxjs';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends LitElement {
  @state()
  backgroundStyle: { backgroundImage: string };
  @queryAsync('.expansion__content')
  onPanelLoad: Promise<HTMLElement>;
  @query('.expansion__content', true)
  collapsingPanel;
  @property({ attribute: 'data-uri', type: String })
  dataURI: string = 'none';
  @property({ type: Boolean, reflect: true })
  collapsed: boolean;
  controllers: { expansion: CollapseController };

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.collapsed = true;
    this.controllers = {
      expansion: new CollapseController(
        this,
        'portfolio',
        document.querySelector('content-tree'),
        this.collapsingPanel
      ),
    };
    this.onPanelLoad.then(() => {
      timer(10).subscribe(() => {
        this.controllers.expansion.collapse();
      });
    });
  }

  private updateOffset(): void {
    this.controllers.expansion.updateOffset();
  }

  private toggle(): void {
    this.controllers.expansion.toggle();
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
              ${this.collapsed
                ? html`<slot name="button-label"></slot>`
                : 'COLLAPSE'}
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

  static get styles() {
    return [style];
  }
}
