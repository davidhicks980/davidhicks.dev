import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { style } from './expansionpanel.css';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { fromEvent, interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@customElement('hicks-expansion')
export class HicksExpansionPanel extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;
  @property({ type: Number, reflect: true })
  expansionHeight = 0;
  @state()
  backgroundStyle: { backgroundImage: string };
  @property({ type: String, attribute: true })
  imageURI: string = 'none';

  constructor() {
    super();
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
  }

  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('open')) {
      if (this.open) {
        this.classList.add('is-expanding');
      } else {
        this.classList.add('is-closing');
      }

      fromEvent(this, 'transitionend')
        .pipe(take(1))
        .subscribe((e) => {
          console.log('ran');
          this.classList.remove('is-closing', 'is-expanding');
          this.classList.toggle('is-expanded');
        });
    }

    if (_changedProperties.has('imageURI')) {
      this.backgroundStyle = {
        backgroundImage: 'url("' + this.imageURI + '")',
      };
    }
  }
  render() {
    const expandClass = { 'is-expanded': this.open };
    return html`
      <button class="expansion">
        <span class="expansion__img"></span>
        <span class="expansion__summary">
          <h1><slot name="header"></slot></h1>
          <hr class="expansion__summary__ruler" />
          <p><slot name="description"></slot></p>
        </span>
      </button>
      <div class="expansion__content">
        <div
          class="expansion__content__transform-wrapper ${classMap(expandClass)}"
        >
          <div class="expansion__content__anime ${classMap(expandClass)}">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }
  static get styles() {
    return [style];
  }
}
