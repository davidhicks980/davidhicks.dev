import { LitElement, html, TemplateResult, nothing } from 'lit';
import { customElement, query, state, queryAll } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import anime from 'animejs';
import { StateController } from './component-state';
import { style } from './header.css';
import { ColorConverter } from './color-converter';

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
  @query('.icon')
  icon: HTMLElement | SVGElement;
  @query('.polymorph')
  polymorph: SVGPathElement;
  @queryAll('.toolbar-item')
  stateObserver: StateController;

  @state()
  collapsed = false;
  nav = () => html` <nav class="header__navigation fadeIn">
    ${['about', 'portfolio', 'resume', 'interests'].map(
      (link) =>
        html`<a class="header__navigation__link" href="#${link}">${link}</a>`
    )}
  </nav>`;
  lastIntersection: number;

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.stateObserver = new StateController(this);
  }
  updateState(toolbarHeight: number) {
    if (this.stateObserver)
      this.stateObserver.updateState({
        toolbarHeight: `${toolbarHeight}vh`,
      });
  }

  firstUpdated(_changedProperties): void {
    this.collapsed = false;

    const bg = getComputedStyle(this).getPropertyValue('--background-color');
    let converter = new ColorConverter();

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
        let collapsed = this.collapsed;
        if (tar.id === 'animeHeaderUpper') {
          animation.seek(duration - ratio * duration);

          if (ratio > 0.2) {
            this.collapsed = false;
          }
        } else if (tar.id === 'animeHeaderToolbar') {
          if (ratio < 1) {
            this.collapsed = true;
          } else {
            this.collapsed = false;
          }
        }
        if (collapsed != this.collapsed) this.triggerToolbar(collapsed);
      });
    };

    let getArrayOfLen = (n: number) => [...Array(n)].map((_, i) => i / n);

    const intersection = new IntersectionObserver(translateTitle, {
      root: document,
      rootMargin: '-20px 0px 0px 0px',
      threshold: getArrayOfLen(50),
    });
    intersection.observe(this.upper);
    intersection.observe(this.toolbar);
  }

  triggerToolbar(collapsed: boolean) {
    if (collapsed) {
      this.polymorph.classList.add('is-stuck');
      this.icon.classList.add('is-collapsed');
      console.log(this.icon);
    } else {
      this.polymorph.classList.remove('is-stuck');
      this.icon.classList.remove('is-collapsed');
    }
  }
  swapClasses = (
    el: HTMLElement | SVGElement,
    newClass: string,
    oldClass: string
  ) => {
    el.classList.add(newClass);
    el.classList.remove(oldClass);
  };

  logo = (classInfo: ClassInfo) => html` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 53.6535 43.2863"
    class="icon toolbar-item ${classMap(classInfo)}"
  >
    <defs>
      <style>
        .standard {
          fill: #a7aef0;
        }
      </style>
    </defs>
    <g>
      <g
        style="transform-origin: center"
        class="icon__path-groups"
        id="Layer_2-2"
        data-name="Layer 2"
      >
        <path
          class="standard"
          d="M20,21A21.7881,21.7881,0,0,1,0,43V37A15.8721,15.8721,0,0,0,13.2932,21,15.8551,15.8551,0,0,0,0,6V0A21.7733,21.7733,0,0,1,20,21Z"
        />
        <path class="standard" d="M22,0V6h7V37H22v6l14.3391.1755V.0718Z" />
        <path
          class="standard"
          d="M39.3145.1108v6h7v31h-7v6l14.339.1755V.1826Z"
        />
      </g>
    </g>
  </svg>`;
  toolbarContent = (logo: TemplateResult, nav: TemplateResult) =>
    html`<div class="header__toolbar__content fadeIn">${logo} ${nav}</div>`;

  render() {
    const logoClasses = { 'is-collapsed': this.collapsed };
    return html`
      <!--Top blue portion-->
      <header class="header__grid">
        <div id="animeHeaderUpper" class="header__upper">
          <div class="header__upper__trees"></div>

          <div class="header__upper__title">
            <slot name="header-logo"></slot>
          </div>
          <div class="header__upper__nav">
            ${this.collapsed ? '' : this.nav()}
          </div>
        </div>
        <div id="animeHeaderToolbar" class="header__toolbar">
          ${this.collapsed
            ? this.toolbarContent(this.logo(logoClasses), this.nav())
            : ''}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 330"
            preserveAspectRatio="none"
            class="header__toolbar__svg"
          >
            <defs>
              <style>
                .polymorph {
                  fill: var(--background-color);
                }
                .polymorph.is-stuck {
                  filter: drop-shadow(0px 5px 3px var(--gray-5));
                }
              </style>

              <linearGradient
                id="linear-gradient"
                x1="720"
                y1="576"
                gradientUnits="userSpaceOnUse"
              >
                <stop class="gradient__stop-1" offset="0.3" />
                <stop class="gradient__stop-2" offset="0.4" />
                <stop class="gradient__stop-3" offset="0.5" />
                <stop class="gradient__stop-4" offset="0.6" />
                <stop class="gradient__stop-5" offset="0.7" />
              </linearGradient>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <!--If you are reading this: this was a pain to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting is as follows: x1 y1, x2 y2, x y. The c stands for 'curve'... I think. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
                <path
                  class="polymorph"
                  d="M720, 0 H0 V 300 c 144, 0, 216 -72, 360 -72 s 216, 72, 360, 72, 216 -72, 360 -72, 216, 72, 360, 72V0Z"
                />
              </g>
            </g>
          </svg>
        </div>
      </header>
    `;
  }

  static get styles() {
    return [style];
  }
}
