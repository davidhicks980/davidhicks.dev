import { css } from 'lit';

 export const style = css`:root {
  --header-font: "PT Sans", sans-serif;
  --body-font: "Arimo", sans-serif;
}

h1 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 99;
}

h2 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 62;
}

h3 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 49;
}

h4 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 35;
}

h5 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 25;
}

h6 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 21;
}

/** Block Element
* @access public
* @param {String} $element - Element's name
*/
:host {
  --font-size: 10pt;
  --item--font-weight: 400;
  --item--font: var(--item--font-weight) var(--font-size);
  --item--height: calc(var(--font-size) * 2);
  --item--transition--timing: 0.5s;
  --item--font-color: var(--gray-11);
  --item--line-color: var(--gray-4);
  --head--margin: calc(var(--font-size) * 1.75);
  --list--item-count: 0;
  --list--header-font: bold calc(var(--font-size) * 1.25) var(--body-font),
    sans-serif;
  --list--top: 90px;
  --track--height: calc(
    var(--item--height) + var(--head--margin) / var(--list--item-count)
  );
  --track--scale: scaleY(var(--list--item-count));
  --track--width: 2rem;
  --host--height: calc(
    (var(--item--height) * var(--list--item-count)) + var(--head--margin) + 3rem
  );
  --host--width: calc(var(--font-size) * 12);
  --host--position: sticky;
  --host--top: calc(var(--toolbar-height, 20vh) + 5vh);
  --host--padding-top: 0px;
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
  background: var(--host--background);
  padding-top: var(--host--padding-top);
}
:host([mobile]) {
  --host--width: 100vw;
  --host--top: calc(var(--toolbar-height) - 1rem);
  --host--height: 100vh;
  --host--position: fixed;
  --host--background: var(--primary-12);
  --font-size: 1.25rem;
  --item--font-color: white;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-clip-path: circle(0% at 90% -10%);
          clip-path: circle(0% at 90% -10%);
  -webkit-transition-property: background-color clip-path;
  transition-property: background-color clip-path;
  -webkit-transition: background-color 2s cubic-bezier(0.25, 1, 0.3, 1), -webkit-clip-path 1s cubic-bezier(0.25, 1, 0.3, 1);
  transition: background-color 2s cubic-bezier(0.25, 1, 0.3, 1), -webkit-clip-path 1s cubic-bezier(0.25, 1, 0.3, 1);
  transition: clip-path 1s cubic-bezier(0.25, 1, 0.3, 1), background-color 2s cubic-bezier(0.25, 1, 0.3, 1);
  transition: clip-path 1s cubic-bezier(0.25, 1, 0.3, 1), background-color 2s cubic-bezier(0.25, 1, 0.3, 1), -webkit-clip-path 1s cubic-bezier(0.25, 1, 0.3, 1);
  --host--padding-top: 3rem;
}
:host([mobile][open]) {
  -webkit-clip-path: circle(125%);
          clip-path: circle(125%);
  --host--background: var(--gray-12);
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
    transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: top left;
    //Misc
    border: solid var(--primary-7);
    border-width: 0 0 0 2px;
}
*/
.list {
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}
.list :host([mobile]) {
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  --list--width: 75vw;
}

.link-text {
  color: var(--item--font-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link-text :hover {
  color: var(--primary-8);
}

.expand-button.button {
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
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
  background: var(--button--primary-background);
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
  --button--shadow--secondary: box-shadow: inset 0px 0px 0px 1px var(--gray-6);
  --button--shadow--secondary--active: inset 0px 0px 0px 1px blue;
  background-color: var(--button--background--secondary);
  color: var(--button--color--secondary);
  -webkit-box-shadow: var(--button--shadow--secondary);
          box-shadow: var(--button--shadow--secondary);
  border: 1px solid lightgray;
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
  border: 1px solid blue;
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
}`;
