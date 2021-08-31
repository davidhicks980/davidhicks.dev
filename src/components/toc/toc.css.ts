import { css } from 'lit';

 export const style = css`.expand-button .button--primary, .expand-button .button--secondary {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  font-family: var(--body-font);
  font-weight: 500;
  height: 2em;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  position: relative;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
}

:host {
  --font-size: 10pt;
  --list-item--font-weight: 400;
  --list-item--font: var(--list-item--font-weight) var(--font-size);
  --list-item--height: calc(var(--font-size) * 2);
  --list-item--font-color: var(--gray-9);
  --list-item--font-family: var(--body-font);
  --head--margin: calc(var(--font-size) * 1.75);
  --list--item-count: 0;
  --list--header-font: bold calc(var(--font-size) * 1.25) var(--body-font)
    sans-serif;
  --list--top: 90px;
  --track--height: calc(
    var(--list-item--height) + var(--head--margin) / var(--list--item-count)
  );
  --track--scale: scaleY(var(--list--item-count));
  --track--width: 2rem;
  --host--height: calc(
    (var(--list-item--height) * var(--list--item-count)) + var(--head--margin) +
      3rem
  );
  --host--width: 95%;
  --host--position: sticky;
  --list--width: inherit;
}

@-webkit-keyframes circle {
  from {
    -webkit-clip-path: circle(0% at top right);
            clip-path: circle(0% at top right);
  }
  to {
    -webkit-clip-path: circle(125%);
            clip-path: circle(125%);
  }
}

@keyframes circle {
  from {
    -webkit-clip-path: circle(0% at top right);
            clip-path: circle(0% at top right);
  }
  to {
    -webkit-clip-path: circle(125%);
            clip-path: circle(125%);
  }
}
:host {
  --host--position: sticky;
  --host--background: transparent;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  height: var(--host--height);
  overflow: visible;
  pointer-events: none;
  position: var(--host--position);
  top: var(--host--top);
  top: var(--toolbar-height);
  width: var(--host--width);
}
:host([mobile]) {
  --host--width: 100vw;
  --host--height: 100vh;
  --host--position: fixed;
  --font-size: 1.25rem;
  --list-item--font-color: white;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 1rem;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  top: -30px;
}
:host([mobile][open]) hicks-list-item {
  opacity: 1;
  -webkit-transform: scale(1) translateX(0);
      -ms-transform: scale(1) translateX(0);
          transform: scale(1) translateX(0);
  -webkit-transition-delay: 300ms;
       -o-transition-delay: 300ms;
          transition-delay: 300ms;
}

:host([mobile]) hicks-list-item {
  opacity: 0;
  -webkit-transform: scale(0.5) translateX(10rem);
      -ms-transform: scale(0.5) translateX(10rem);
          transform: scale(0.5) translateX(10rem);
  -webkit-transform-origin: center center;
      -ms-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  -o-transition: 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  transition: 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  -webkit-transition-delay: 0s;
       -o-transition-delay: 0s;
          transition-delay: 0s;
  z-index: 2;
}

.toc {
  /* &__track {
        grid-area: track;
        width: var(--track--width);
         :host([mobile]) & {
            grid-area: none;
        }
    }*/
}
.toc__list {
  display: block;
  grid-area: content;
  width: var(--list--width);
}
.toc__list * {
  padding-left: 0;
  pointer-events: none;
}
.toc__list__link-icon {
  vertical-align: middle;
}
.toc__list:host([mobile]) {
  --list--width: 75vw;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  overflow: hidden;
}

.toc__head {
  border-bottom: 1px solid var(--gray-7);
  font: var(--list--header-font);
  grid-area: header;
  height: var(--head--margin);
}

/*
.track {
    //Dimensions
    height: var(--track--height); //Layout
    position: absolute;
    //Transforms
    transform: scaleY(var(--list--item-count));
    will-change: transform;
    transition: transform var(--list-item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: top left;
    //Misc
    border: solid var(--primary-7);
    border-width: 0 0 0 2px;
}
*/
.expand-button .button--secondary, .expand-button .button--primary {
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  font-family: var(--body-font);
  font-size: calc(1.5rem * 0.5);
  font-weight: 500;
  height: 1.5rem;
  position: relative;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  -webkit-transition: all 250ms;
  -o-transition: all 250ms;
  transition: all 250ms;
  width: 15ch;
}
.expand-button .button--primary {
  --button--background--primary: var(--primary-11);
  --button--color--primary: #fff;
  --button--shadow--primary: var(--gray-6);
  --button--shadow--primary--active: var(--gray-6);
  background: var(--button--background--primary);
  color: var(--button--color--primary);
}
.expand-button .button--primary:hover::after {
  opacity: 0.8;
}
.expand-button .button--primary::after {
  -webkit-box-shadow: 0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07);
  border-radius: inherit;
  content: "";
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  z-index: 0;
}
.expand-button .button--primary:hover {
  -webkit-filter: brightness(1.1);
          filter: brightness(1.1);
}
.expand-button .button--primary:active {
  -webkit-box-shadow: inset 0 1px 2px 2px rgba(0, 0, 0, 0.26);
          box-shadow: inset 0 1px 2px 2px rgba(0, 0, 0, 0.26);
}
.expand-button .button--secondary {
  --button--background--secondary: var(--gray-1);
  --button--color--secondary: var(--gray-11);
  --button--shadow--secondary: inset 0 0 0 1px var(--gray-6);
  --button--shadow--secondary--active: inset 0 0 0 1px var(--primary-7);
  background-color: var(--button--background--secondary);
  -webkit-box-shadow: var(--button--shadow--secondary);
          box-shadow: var(--button--shadow--secondary);
  color: var(--button--color--secondary);
}
.expand-button .button--secondary:hover::after {
  opacity: 0.8;
}
.expand-button .button--secondary::after {
  -webkit-box-shadow: 0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07);
  border-radius: inherit;
  content: "";
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  z-index: 0;
}
.expand-button .button--secondary:hover {
  -webkit-filter: brightness(0.975);
          filter: brightness(0.975);
}
.expand-button .button--secondary:active {
  -webkit-box-shadow: var(--button--shadow--secondary--active);
          box-shadow: var(--button--shadow--secondary--active);
  -webkit-filter: brightness(0.95);
          filter: brightness(0.95);
}
.expand-button .button--secondary:active::after {
  opacity: 1;
}

.button__wrapper {
  top: 0.8rem;
  right: 2rem;
  pointer-events: all;
  position: fixed;
  /*radial-gradient(20% 25% at 52% 85%, var(--primary-12) 100%, var(--primary-12) 100%, transparent 100%),radial-gradient(20% 40% at 75% 90%, var(--primary-12) 93%, var(--primary-12) 50%, transparent 50%),radial-gradient(20% 40% at 25% 90%, var(--primary-12) 100%, var(--primary-12) 50%, transparent 50%)*/
}
:host(:not([mobile])) .button__wrapper {
  display: none;
}
.button__wrapper .background {
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  background-color: var(--primary-12);
  -webkit-clip-path: circle(20px at 50% 50%);
          clip-path: circle(20px at 50% 50%);
  height: 50px;
  overflow: visible;
  padding-right: 18px;
  position: fixed;
  right: 1rem;
  top: 6px;
  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);
  -webkit-transform-origin: 70% 30%;
      -ms-transform-origin: 70% 30%;
          transform-origin: 70% 30%;
  -webkit-transition-duration: 500ms;
       -o-transition-duration: 500ms;
          transition-duration: 500ms;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-timing-function: ease-in-out;
       -o-transition-timing-function: ease-in-out;
          transition-timing-function: ease-in-out;
  width: 50px;
  z-index: 2;
}
:host([open]) .button__wrapper .background {
  pointer-events: all;
  -webkit-transform: scale(30);
      -ms-transform: scale(30);
          transform: scale(30);
  z-index: 0;
}`;
