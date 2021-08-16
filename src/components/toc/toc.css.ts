import { css } from 'lit';

 export const style = css`:host {
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
  width: var(--host--width);
  top: var(--host--top);
  overflow: visible;
  position: var(--host--position);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  height: var(--host--height);
  top: var(--toolbar-height);
}
:host([mobile]) {
  --host--width: 100vw;
  --host--height: 100vh;
  --host--position: fixed;
  --font-size: 1.25rem;
  --list-item--font-color: white;
  top: 0px;
  padding: 1rem 1rem;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
:host([mobile]) hicks-list-item {
  -webkit-transform: scale(0.5) translateX(10rem);
          transform: scale(0.5) translateX(10rem);
  -webkit-transition: 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
  transition: 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
  opacity: 0;
  -webkit-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
  z-index: 2;
}
:host([mobile][open]) hicks-list-item {
  -webkit-transform: scale(1) translateX(0rem);
          transform: scale(1) translateX(0rem);
  opacity: 1;
  -webkit-transition-delay: 500ms;
          transition-delay: 500ms;
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
  width: var(--list--width);
  grid-area: content;
  display: block;
}
.toc__list__link-icon {
  vertical-align: middle;
}
.toc__list:host([mobile]) {
  --list--width: 75vw;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  overflow: hidden;
}

.toc__head {
  grid-area: header;
  border-bottom: 1px solid var(--gray-7);
  font: var(--list--header-font);
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
.expand-button.button, .expand-button.button--secondary, .expand-button.button--primary {
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--body-font);
  font-size: calc(1.5rem * 0.5);
  height: 1.5rem;
  -webkit-transition: all 250ms;
  transition: all 250ms;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  width: 15ch;
  border: none;
  position: relative;
}
.expand-button.button--primary {
  --button--background--primary: var(--primary-11);
  --button--color--primary: white;
  --button--shadow--primary: var(--gray-6);
  --button--shadow--primary--active: var(--gray-6);
  color: var(--button--color--primary);
  background: var(--button--background--primary);
}
.expand-button.button--primary:hover::after {
  opacity: 0.8;
}
.expand-button.button--primary::after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: inherit;
  -webkit-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  margin: 0px;
  -webkit-box-shadow: 0 2px 4px rgb(87 107 138/24%);
          box-shadow: 0 2px 4px rgb(87 107 138/24%);
}
.expand-button.button--primary:hover {
  -webkit-filter: brightness(1.1);
          filter: brightness(1.1);
}
.expand-button.button--primary:active {
  -webkit-box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
          box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
}
.expand-button.button--secondary {
  --button--background--secondary: var(--gray-1);
  --button--color--secondary: var(--gray-11);
  --button--shadow--secondary: inset 0px 0px 0px 1px var(--gray-6);
  --button--shadow--secondary--active: inset 0px 0px 0px 1px blue;
  background-color: var(--button--background--secondary);
  color: var(--button--color--secondary);
  -webkit-box-shadow: var(--button--shadow--secondary);
          box-shadow: var(--button--shadow--secondary);
}
.expand-button.button--secondary:hover::after {
  opacity: 0.8;
}
.expand-button.button--secondary::after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: inherit;
  -webkit-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  margin: 0px;
  -webkit-box-shadow: 0 2px 4px rgb(87 107 138/24%);
          box-shadow: 0 2px 4px rgb(87 107 138/24%);
}
.expand-button.button--secondary:hover {
  -webkit-filter: brightness(0.975);
          filter: brightness(0.975);
}
.expand-button.button--secondary:active {
  -webkit-box-shadow: var(--button--shadow--secondary--active);
          box-shadow: var(--button--shadow--secondary--active);
  -webkit-filter: brightness(0.95);
          filter: brightness(0.95);
}
.expand-button.button--secondary:active::after {
  opacity: 1;
}

.button__wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: end;
      align-self: flex-end;
  padding-right: 18px;
  height: 50px;
}
.button__wrapper .background {
  right: 1rem;
  padding-right: 18px;
  -webkit-clip-path: circle(20px at 50% 50%);
          clip-path: circle(20px at 50% 50%);
  height: 50px;
  width: 50px;
  background-color: #1f1f1f;
  position: fixed;
  top: 6px;
  z-index: 2;
  -webkit-transform: scale(1);
          transform: scale(1);
  -webkit-transform-origin: 70% 30%;
          transform-origin: 70% 30%;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-duration: 500ms;
          transition-duration: 500ms;
  -webkit-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  overflow: visible;
  pointer-events: none;
}
:host([open]) .button__wrapper .background {
  -webkit-transform: scale(30);
          transform: scale(30);
  pointer-events: all;
  z-index: 0;
}`;
