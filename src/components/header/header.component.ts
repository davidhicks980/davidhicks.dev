import { LitElement, html, TemplateResult, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import anime from 'animejs';
import { style } from './header.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('foliage-header')
export class FoliageHeader extends LitElement {
  @query('.header__grid')
  container: HTMLElement;
  @query('.header__upper')
  upper: HTMLElement;
  @query('.header__upper__nav')
  upperNav: HTMLElement;
  @query('.header__title-wrapper')
  titleWrapper: HTMLDivElement;
  @query('.header__toolbar__content')
  lowerNav: HTMLDivElement;
  @query('.header__toolbar__content__nav')
  navEl: HTMLSlotElement;
  @query('.header__toolbar')
  toolbar: HTMLDivElement;
  @query('.header__toolbar__svg__path')
  curvedToolbar: SVGPathElement;

  breakpointControl: BreakpointController;
  @state()
  isCurved = true;
  @state()
  mobile: boolean;
  @state()
  tablet: boolean;
  lowerNavNode: Node;

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.breakpointControl = new BreakpointController(this);
    this.breakpointControl
      .observeBreakpoint(
        'screen and (max-width: 599.99px)',
        (ev) => (this.mobile = ev.matches)
      )
      .observeBreakpoint(
        'screen and (min-width: 600px) and (max-width: 899.99px)',
        (ev) => (this.tablet = ev.matches)
      );
  }

  firstUpdated(_changedProperties): void {
    //slotted nav is duplicated because appending nav during scroll leads to scroll catching;
    this.duplicateNav();
    let animation = anime
      .timeline({
        targets: this.curvedToolbar,
        keyframes: [
          {
            d: 'M1200, 0 H0 V 300 c 144, 0, 216 -120, 360 -120 s 216, 120, 360, 120, 216 -120, 360 -120, 216, 120, 360, 120V0Z',
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

    const seekSVGAnimation = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        let { intersectionRatio: ratio, target } = entry;
        const tar = target as HTMLElement;
        let duration = animation.duration;
        if (tar.id === 'animeHeaderUpper') {
          window.requestAnimationFrame(() =>
            animation.seek(duration - Math.abs(ratio) * duration)
          );
        }
        let isCurved = this.checkIfCurved();

        if (isCurved != this.isCurved) {
          this.isCurved = isCurved;
        }
      });
    };

    let getArrayOfLen = (n: number) => [...Array(n)].map((_, i) => i / n);

    const intersection = new IntersectionObserver(seekSVGAnimation, {
      root: document.getElementById('layoutViewport'),
      rootMargin: '-20px 0px 0px 0px',
      threshold: getArrayOfLen(25),
    });
    intersection.observe(this.upper);
    intersection.observe(this.toolbar);
  }

  private duplicateNav() {
    //  (this.navEl as HTMLElement).setAttribute('direction', 'column');
  }

  checkIfCurved() {
    let { bottom, height } = this.upper.getBoundingClientRect();
    return bottom / height > 0.2;
  }

  swapClasses = (
    el: HTMLElement | SVGElement,
    newClass: string,
    oldClass: string
  ) => {
    el.classList.add(newClass);
    el.classList.remove(oldClass);
  };

  logo = html`<slot name="header-logo"></slot>`;
  nav = html`<slot name="header-navigation"></slot>`;
  social = html`<slot
    class="header__toolbar__social"
    name="header-social"
  ></slot>`;
  navToggle = html`<slot
    name="header-toolbar-toggle"
    class="header__toolbar__toggle"
  ></slot>`;
  toolbarPath = html`<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="none"
    class="header__toolbar__svg"
    viewBox="0 0 1440 330"
  >
    <!--This was difficult for me to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting of each point is as follows: x1 y1, x2 y2, x y. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
    <path
      class="header__toolbar__svg__path"
      d="M1200, 0 H0 V 300 c 144, 0, 216 -120, 360 -120 s 216, 120, 360, 120, 216 -120, 360 -120, 216, 120, 360, 120V0Z"
    />
  </svg>`;
  render() {
    const upperVisibility = classMap({
      'is-hidden': !this.isCurved,
      'is-shown': this.isCurved,
    });
    const toolbarVisibility = classMap({
      'is-hidden': this.isCurved,
      'is-shown': !this.isCurved,
    });

    return html`
      <!--Top blue portion-->
      <header class="header__grid">
        <div id="animeHeaderUpper" class="header__upper">
          <div class="header__upper__title">
            <slot name="header-brand"></slot>
          </div>
          <div class="header__upper__nav ${upperVisibility}">${this.nav}</div>
        </div>
        <div id="animeHeaderToolbar" class="header__toolbar">
          <div class="header__toolbar__content ${toolbarVisibility}">
            ${this.logo}
            <div class="header__toolbar__content__links">
              ${this.social} <span class="divider"></span>${this.navToggle}
            </div>
          </div>
          ${this.toolbarPath}
        </div>
      </header>
    `;
  }

  static get styles() {
    return [style];
  }
}
