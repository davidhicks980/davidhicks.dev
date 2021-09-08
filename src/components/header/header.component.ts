import { LitElement, html } from 'lit';
import { query, state, property, queryAssignedNodes } from 'lit/decorators.js';
import anime from 'animejs';
import { style } from './header.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { classMap } from 'lit/directives/class-map.js';
import {
  IntersectionController,
  IntersectionObserverFilter,
} from '../../util/controllers/intersection.controller';

const TOOLBAR_CURVE =
  'M1200, 0 H0 V 300 c 144, 0, 216 -120, 360 -120 s 216, 120, 360, 120, 216 -120, 360 -120, 216, 120, 360, 120V0Z';
const TOOLBAR_FLAT =
  'M720, 0 H0 V 300 c 144 0, 216 0, 360 0 s 216 0, 360 0, 216 0, 360 0, 216 0, 360 0 V0Z';
export class HicksHeader extends LitElement {
  @query('.upper', true)
  upper!: HTMLElement;
  @query('.header__title-wrapper', true)
  titleWrapper!: HTMLDivElement;
  @query('.toolbar__content__nav')
  navEl!: HTMLSlotElement;
  @query('.toolbar', true)
  toolbar!: HTMLDivElement;
  @query('.toolbar__svg__path', true)
  curvedToolbar!: SVGPathElement;
  @queryAssignedNodes('navigation-toggle', true)
  slottedToggle!: HTMLElement;
  @state()
  isCurved = true;
  @property({ type: Boolean, reflect: true })
  mobile = false;
  @property({ type: Boolean, reflect: true })
  tablet: boolean = false;
  @property({ type: Object })
  slotNames = {
    toggle: 'navigation-toggle',
  };
  controllers: {
    breakpoint: BreakpointController;
    intersection: IntersectionController;
  };

  constructor() {
    super();

    this.controllers = {
      breakpoint: new BreakpointController(this),
      intersection: new IntersectionController(this),
    };
  }

  firstUpdated(_changedProperties): void {
    this.classList.remove('hide-until-loaded');

    if (window.IntersectionObserver) {
      const animation = anime
        .timeline({
          targets: this.curvedToolbar,
          keyframes: [
            {
              d: TOOLBAR_CURVE,
            },
            {
              d: TOOLBAR_FLAT,
            },
          ],

          easing: 'linear',
          loop: false,
          autoplay: false,
          duration: 1000,
        })
        .add({ targets: null });

      const seekSVGAnimation = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { intersectionRatio: ratio, target } = entry;
          const tar = target as HTMLElement;
          const duration = animation.duration;
          if (tar.id === 'animeHeaderUpper') {
            window.requestAnimationFrame(() =>
              animation.seek(duration - Math.abs(ratio) * duration)
            );
          }
          const isCurved = this.checkIfCurved();

          if (isCurved != this.isCurved) {
            this.isCurved = isCurved;
          }
        });
      };

      const getArrayOfLen = (n: number) => [...Array(n)].map((_, i) => i / n);

      this.controllers.intersection
        .initiate(
          'header',
          document.getElementById('layoutViewport'),
          getArrayOfLen(25),
          { top: '-20px', right: '0px', left: '0px', bottom: '0px' }
        )
        .observe([this.upper, this.toolbar])
        .on(IntersectionObserverFilter.ENTRY)
        .subscribe(seekSVGAnimation);
    } else {
      this.isCurved = true;
      this.curvedToolbar.setAttribute('d', TOOLBAR_FLAT);
    }
  }

  checkIfCurved() {
    const { bottom, height } = this.upper.getBoundingClientRect();
    return bottom / height > 0.1;
  }

  swapClasses = (
    el: HTMLElement | SVGElement,
    newClass: string,
    oldClass: string
  ) => {
    el.classList.add(newClass);
    el.classList.remove(oldClass);
  };

  logo = html`<slot name="logo"></slot>`;
  nav = html`<slot name="navigation"></slot>`;
  social = html` <slot class="toolbar__social" name="social"></slot> `;
  divider = html`<div class="toolbar__divider"></div>`;
  toggle = html`
    ${this.divider}
    <div class="toolbar__toggle">
      <slot name="${this.slotNames.toggle}"> </slot>
    </div>
  `;
  toolbarPath = html`<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="none"
    class="toolbar__svg"
    viewBox="0 0 1440 330"
  >
    <!--This was difficult for me to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting of each point is as follows: x1 y1, x2 y2, x y. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
    <path class="toolbar__svg__path" d="${TOOLBAR_CURVE}" />
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
      <header class="container">
        <div id="animeHeaderUpper" class="upper">
          <div class="upper__title">
            <slot name="brand"></slot>
          </div>
          <div class="upper__nav ${upperVisibility}">${this.nav}</div>
        </div>
        <div id="animeHeaderToolbar" class="toolbar">
          <div class="toolbar__content ${toolbarVisibility}">
            ${this.logo}
            <div class="toolbar__right">${this.social} ${this.toggle}</div>
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
