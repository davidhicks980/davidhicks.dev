import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAsync } from 'lit/decorators.js';
import { style } from './expansion-panel.css';
import { CollapseController } from '../../util/controllers/expansion.controller';
import { timer } from 'rxjs';
import { isElement } from '../../util/functions/is-html-element';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends LitElement {
  @queryAsync('.panel')
  onPanelLoad!: Promise<HTMLElement>;
  @query('.panel', true)
  collapsingPanel!: HTMLElement;
  @property({ attribute: 'data-uri', type: String })
  dataURI = 'none';
  @property({ type: Boolean, reflect: true })
  collapsed: boolean;

  @property({ type: String, attribute: 'expansion-root' })
  expansionRoot!: string;
  controllers!: { expansion: CollapseController };

  constructor() {
    super();
    this.collapsed = true;
  }
  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    if (typeof this.expansionRoot === 'string') {
      let tree = document.querySelector(this.expansionRoot);
      if (isElement(tree)) {
        this.controllers = {
          expansion: new CollapseController(
            this,
            'portfolio',
            tree as HTMLElement,
            this.collapsingPanel
          ),
        };
      }
      this.onPanelLoad.then(() => {
        timer(10).subscribe(() => {
          this.controllers.expansion.collapse();
        });
      });
    }
  }

  private updateOffset(): void {
    if (this.controllers?.expansion) {
      this.controllers.expansion.updateOffset();
    }
  }

  private toggle(): void {
    this.dispatchEvent(
      new CustomEvent('toggled', {
        detail: !this.collapsed,
        bubbles: true,
        composed: true,
      })
    );
    if (this.controllers?.expansion) {
      this.controllers.expansion.toggle();
    } else {
      this.collapsed = false;
    }
  }
  render() {
    return html`
      <div class="expansion">
        <span class="img"></span>
        <div>
          <div class="header">
            <h1 class="header__title">
              <slot name="header"> </slot>
            </h1>
          </div>
          <hr class="ruler" />
          <p class="body">
            <slot name="description"></slot>
          </p>
          <div class="footer">
            <div class="footer__icons">
              <slot name="icon"></slot>
            </div>
            <button @click="${this.toggle}" class="footer__button button--text">
              ${this.collapsed
                ? html`<slot name="button-label"></slot>`
                : 'COLLAPSE'}
            </button>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__padding">
          <slot @slotchange="${this.updateOffset}" name="content"></slot>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [style];
  }
}
