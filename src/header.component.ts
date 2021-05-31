import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import anime from 'animejs';
import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { StateController } from './component-state';

@customElement('background-animation')
export class BackgroundAnimation extends LitElement {
  @query('.header__grid')
  container: HTMLElement;

  @query('.header__title__icon')
  titleEl: HTMLHeadingElement;

  @query('.polymorph')
  polymorph: SVGPathElement;
  stateObserver: StateController;

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
  firstUpdated(_changedProperties) {
    let pos = 0;
    let ticking = false;

    let heightTranslate = parseInt(
      getComputedStyle(this)
        .getPropertyValue('--upper-height')
        .replace('vh', '')
    );
    let toolbarTranslate = parseInt(
      getComputedStyle(this)
        .getPropertyValue('--toolbar-height')
        .replace('vh', '')
    );
    this.updateState(toolbarTranslate);
    let scale = 0.5;
    let translateY = (toolbarTranslate + heightTranslate) / 2 / scale + 'vh';
    let translateX =
      '-' + (this.titleEl.getBoundingClientRect().left * 2.5) / scale;

    let animation = anime
      .timeline({
        targets: this.polymorph,
        d: [
          {
            value:
              'M720, 0 H0 V 300 c 144, 0, 216 -72, 360 -72 s 216, 72, 360, 72, 216 -72, 360 -72, 216, 72, 360, 72V0Z',
          },
          {
            value:
              'M720, 0 H0 V 300 c 144 0, 216 0, 360 0 s 216 0, 360 0, 216 0, 360 0, 216 0, 360 0 V0Z',
          },
        ],
        easing: 'linear',
        loop: false,
        autoplay: false,
        duration: 500,
      })
      .add({
        targets: this.titleEl,
        scale,

        translateY,
        easing: 'spring(1, 80, 10, 0)',
        loop: false,
        autoplay: false,
        delay: 250,
      });

    const translateTitle = () => {
      animation.seek((window.scrollY / window.innerHeight) * 1000);
    };

    fromEvent(document, 'scroll')
      .pipe(
        throttleTime(16),
        map((e) => {
          window.requestAnimationFrame(function () {
            translateTitle();
          });
        })
      )
      .subscribe();
  }

  render() {
    return html`
      <!--Top blue portion-->
      <header class="header__grid">
         <div class="header__upper">
             <div class="header__title-wrapper"> 
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 53.6535 43.2863"
              preserveAspectRatio="midXMidY meet"
              class="header__title__icon"
            >
              <defs>
                <style>
                  .standard {
                    fill: #a7aef0;
                  }
                </style>
              </defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_2-2" data-name="Layer 2">
                  <path
                    class="standard"
                    d="M20,21A21.7881,21.7881,0,0,1,0,43V37A15.8721,15.8721,0,0,0,13.2932,21,15.8551,15.8551,0,0,0,0,6V0A21.7733,21.7733,0,0,1,20,21Z"
                  />
                  <path
                    class="standard"
                    d="M22,0V6h7V37H22v6l14.3391.1755V.0718Z"
                  />
                  <path
                    class="standard"
                    d="M39.3145.1108v6h7v31h-7v6l14.339.1755V.1826Z"
                  />
                </g>
              </g>
            </svg>
            <div class="header__title__text"> <slot name="header-title"></slot>
              <slot name="header-subtitle"></slot></div>
             
            </div> <nav class="header__navigation">
            <a href="#about">about</a>
            <a href="#portfolio">portfolio</a>
            <a href="#resume">resume</a>
            <a href="#interests">interests</a>
          </nav>
          </div>

         </div>
           
          
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 330"
          class="header__toolbar"
          preserveAspectRatio="none"
        >
          <defs>
            <style>
              .cls-1 {
                fill: url(#linear-gradient);
                filter: url(#shadow);
              }
            </style>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
              <feDropShadow
                dx="5"
                dy="5"
                stdDeviation="5"
                flood-color="#8b8b8b"
                flood-opacity="1"
              />
            </filter>
            <linearGradient
              id="linear-gradient"
              x1="720"
              y1="576"
              x2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop class="gradient__stop-1" offset="0.08" />
              <stop class="gradient__stop-2" offset="0.39" />
              <stop class="gradient__stop-3" offset="0.6" />
              <stop class="gradient__stop-4" offset="0.78" />
              <stop class="gradient__stop-5" offset="0.93" />
            </linearGradient>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <!--If you are reading this: this was a pain to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting is as follows: x1 y1, x2 y2, x y. The c stands for 'curve'... I think. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
              <path
                class="cls-1 polymorph"
                d="M720,0H0V300c144,0,216-72,360-72s216,72,360,72,216-72,360-72,216,72,360,72V0Z"
              />
            </g>
          </g>
        </svg>
      </header>
    `;
  }

  static get styles() {
    return css`
      :host {
        --upper-height: 60vh;
        --toolbar-height: 15vh;
        --title-font--size: 46pt;
        --subtitle-font--size: 24pt;
      }

      .header__navigation {
        border-radius: 5px;

        color: white;
        pointer-events: all;
        touch-action: all;
      }
      .header__navigation * {
        margin: 5px;
        color: white;
      }
      .header__navigation *:hover {
        background-color: lightcoral;
        padding: 5px;
        pointer-events: all;
        touch-action: all;
      }
      .header__toolbar {
        position: sticky;
        top: 0px;
        width: 100%;
        height: 15vh;
      }
      .gradient__stop-1 {
        stop-color: var(--background-color);
      }
      .gradient__stop-2 {
        stop-color: var(--background-color);
      }
      .gradient__stop-3 {
        stop-color: var(--background-color);
      }
      .gradient__stop-4 {
        stop-color: var(--background-color);
      }
      .gradient__stop-5 {
        stop-color: var(--background-color);
      }
      .header__grid {
        position: sticky;
        top: calc(var(--upper-height) * -1);
        width: 100%;
        max-width: 1920px;
      }
      .header__upper {
        height: var(--upper-height);
        background-color: var(--background-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        grid-gap: 6rem;
        padding: 1rem;
        box-sizing: border-box;
      }
      .header__title-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        max-height: 10vh;
        align-items: center;
        gap: 1rem;
        flex: 0 1 50%;
        z-index: 1;
      }

      .header__title__icon {
        min-width: 1rem;
        max-width: 5.5rem;
        width: 10vw;
        fill: #a7aef0;
        width: clamp(1rem, 10vw, 5.5rem);
      }
      .header__title__text {
      }
    `;
  }
}
