import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import anime from 'animejs';
import { StateController } from './component-state';
import { style } from './header.css';

@customElement('background-animation')
export class BackgroundAnimation extends LitElement {
  @query('.header__grid')
  container: HTMLElement;
  @query('.header__upper')
  upper: HTMLElement;
  @query('.header__title-wrapper')
  titleWrapper: HTMLDivElement;
  @query('.canvas-background')
  background: HTMLCanvasElement;
  @query('.header__toolbar', true)
  toolbar: HTMLDivElement;

  @query('.polymorph')
  polymorph: SVGPathElement;
  stateObserver: StateController;

  @state()
  isCurved = false;

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.stateObserver = new StateController(this);
  }

  firstUpdated(_changedProperties): void {
    let animation = anime
      .timeline({
        targets: this.polymorph,
        keyframes: [
          {
            d: 'M720, 0 H0 V 300 c 144, 0, 216 -72, 360 -72 s 216, 72, 360, 72, 216 -72, 360 -72, 216, 72, 360, 72V0Z',
          },
          {
            d: 'M720, 0 H0 V 300 c 144 0, 216 0, 360 0 s 216 0, 360 0, 216 0, 360 0, 216 0, 360 0 V0Z',
          },
        ],

        easing: 'linear',
        loop: false,
        autoplay: false,
        duration: 1000,
      })
      .add({ targets: this.titleWrapper });
    const translateTitle = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        let { intersectionRatio: ratio, target } = entry;
        const tar = target as HTMLElement;
        let duration = animation.duration;
        if (tar.id === 'animeHeaderUpper') {
          animation.seek(duration - (ratio - 0.1) * duration);
        }
        let isCurved = this.checkIfCurved();

        if (isCurved != this.isCurved) {
          this.updateState(isCurved);
          this.isCurved = isCurved;
        }
      });
    };

    let getArrayOfLen = (n: number) => [...Array(n)].map((_, i) => i / n);

    const intersection = new IntersectionObserver(translateTitle, {
      root: document,
      rootMargin: '-20px 0px 0px 0px',
      threshold: getArrayOfLen(40),
    });
    intersection.observe(this.upper);
    intersection.observe(this.toolbar);
  }

  checkIfCurved() {
    let { bottom, height } = this.upper.getBoundingClientRect();
    return bottom / height > 0.2;
  }

  updateState(curved: boolean) {
    this.stateObserver.updateState({ toolbarCurved: curved });
  }
  swapClasses = (
    el: HTMLElement | SVGElement,
    newClass: string,
    oldClass: string
  ) => {
    el.classList.add(newClass);
    el.classList.remove(oldClass);
  };

  logo = () => html`<slot name="header-logo"></slot>`;
  nav = () => html`<slot name="header-navigation"></slot>`;

  toolbarContent = (logo: TemplateResult, nav: TemplateResult) =>
    html`<div class="header__toolbar__content fadeIn">${logo} ${nav}</div>`;

  render() {
    return html`
      <!--Top blue portion-->
      <header class="header__grid">
        <div id="animeHeaderUpper" class="header__upper">
          <div class="header__upper__title">
            <slot name="header-brand"></slot>
          </div>
          <div class="header__upper__nav">
            ${this.isCurved ? this.nav() : ''}
          </div>
        </div>
        <div id="animeHeaderToolbar" class="header__toolbar">
          ${this.isCurved ? '' : this.toolbarContent(this.logo(), this.nav())}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            class="header__toolbar__svg"
            viewBox="0 0 1440 330"
          >
            <defs>
              <style>
                .polymorph {
                  fill: var(--primary-9);
                }
                .polymorph.is-stuck {
                  filter: drop-shadow(0px 5px 3px var(--gray-5));
                }
              </style>
            </defs>
            <!--This was a pain to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting is as follows: x1 y1, x2 y2, x y. The c stands for 'curve'... I think. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
            <path
              class="polymorph"
              d="M720, 0 H0 V 300 c 144, 0, 216 -72, 360 -72 s 216, 72, 360, 72, 216 -72, 360 -72, 216, 72, 360, 72V0Z"
            />
          </svg>
        </div>
      </header>
    `;
  }

  static get styles() {
    return [style];
  }
}
