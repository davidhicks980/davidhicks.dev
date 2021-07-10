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

:root {
  --gray-0: hsl(212, 13.2%, 99.23%);
  --gray-1: hsl(212, 13.2%, 97.65%);
  --gray-2: hsl(212, 13.2%, 96.12%);
  --gray-3: hsl(212, 13.2%, 93.39%);
  --gray-4: hsl(212, 13.2%, 89.92%);
  --gray-5: hsl(212, 13.2%, 85.19%);
  --gray-6: hsl(212, 13.2%, 78.22%);
  --gray-7: hsl(212, 13.2%, 68.88%);
  --gray-8: hsl(212, 13.2%, 59.18%);
  --gray-9: hsl(212, 13.2%, 49.83%);
  --gray-10: hsl(212, 13.2%, 40.75%);
  --gray-11: hsl(212, 13.2%, 31.63%);
  --gray-12: hsl(212, 13.2%, 21.75%);
  --gray-13: hsl(212, 13.2%, 7.96%);
  --primary-0: hsl(211, 56.4%, 99.23%);
  --primary-1: hsl(211, 56.4%, 98.05%);
  --primary-2: hsl(211, 56.4%, 96.18%);
  --primary-3: hsl(211, 56.4%, 93.88%);
  --primary-4: hsl(211, 56.4%, 90.76%);
  --primary-5: hsl(211, 56.4%, 86.17%);
  --primary-6: hsl(211, 56.4%, 79.21%);
  --primary-7: hsl(211, 56.4%, 69.98%);
  --primary-8: hsl(211, 56.4%, 60.36%);
  --primary-9: hsl(211, 56.4%, 50.74%);
  --primary-10: hsl(211, 56.4%, 41.57%);
  --primary-11: hsl(211, 56.4%, 32.37%);
  --primary-12: hsl(211, 56.4%, 21.98%);
  --primary-13: hsl(211, 56.4%, 8.35%);
  --secondary-0: hsl(12, 66.4%, 99.13%);
  --secondary-1: hsl(12, 66.4%, 98.02%);
  --secondary-2: hsl(12, 66.4%, 96.63%);
  --secondary-3: hsl(12, 66.4%, 94.37%);
  --secondary-4: hsl(12, 66.4%, 91.34%);
  --secondary-5: hsl(12, 66.4%, 87.1%);
  --secondary-6: hsl(12, 66.4%, 80.96%);
  --secondary-7: hsl(12, 66.4%, 71.96%);
  --secondary-8: hsl(12, 66.4%, 62.22%);
  --secondary-9: hsl(12, 66.4%, 51.39%);
  --secondary-10: hsl(12, 66.4%, 41.72%);
  --secondary-11: hsl(12, 66.4%, 32.54%);
  --secondary-12: hsl(12, 66.4%, 22.67%);
  --secondary-13: hsl(12, 66.4%, 8.63%);
}

/** Block Element
* @access public
* @param {String} $element - Element's name
*/
:host {
  --font-size: 1rem;
  --item--font-weight: 400;
  --item--font: var(--item--font-weight) var(--font-size) var(--body-font),
    sans-serif;
  --item--margin: calc(var(--font-size) * 0.825);
  --item--height: calc(var(--font-size) + var(--item--margin));
  --item--transition--timing: 1s;
  --item--font-color: var(--gray-9);
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
  height: calc(var(--host--height) - var(--head--margin));
  display: block;
}
.toc__list__link-icon {
  vertical-align: middle;
}
:host([mobile]) .toc__list {
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
  border-bottom: 1px solid hsl(212, 13.2%, 68.88%);
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
ul {
  margin: 0px;
  padding: 0px;
}

.list {
  padding-left: 0.5rem;
  margin: 0;
  position: absolute;
  list-style-type: none;
  -webkit-transform: translateY(calc(-1 * var(--item--height) / 1.5));
          transform: translateY(calc(-1 * var(--item--height) / 1.5));
  width: var(--list--width);
  height: var(--list--height);
  padding-left: calc(var(--font-size) * 2);
}
.list__sublist {
  padding-left: calc(0.75 * var(--font-size));
  opacity: 0;
  padding-bottom: 2rem;
  position: absolute;
  width: inherit;
  height: inherit;
}
.list__sublist[data-expanded] {
  opacity: 1;
}
:host([mobile]) .list {
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  --list--width: 75vw;
  --list--height: 100%;
  border-bottom: 1px dotted gray;
}

hicks-list-item {
  height: var(--item--height);
  display: list-item;
  position: absolute;
  padding-left: 0.5em;
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  will-change: transform;
  -webkit-transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  font: var(--item--font);
  min-width: 15ch;
  /*
  &__content {
    width: calc(var(--host--width) - var(--font-size) * 2);
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @include host(mobile) {
      width: inherit;
      height: 100%;
    }
    &__link {
      color: var(--item--font-color);
      text-decoration: none;
      z-index: 1;
      position: relative;
      @include mix-text-ellipsis;
      @include host(mobile) {
        width: inherit;
      }
      &:hover,
      &.is-active {
        color: var(--primary-8);
        text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px,
          currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
        transition: text-shadow var(--item--transition--timing);
      }
      &:hover {
        text-decoration: underline var(--secondary-9) 2px;
        text-underline-offset: 1px;
      }
    }
    &__expand-btn {
      @include button-reset;
      width: calc(var(--item--height) + 1em);
      height: var(--font-size);
      padding: 0px var(--font-size);
      position: relative;
      padding: 0.4rem;
    }
  }*/
}
:host([mobile]) hicks-list-item {
  --item--font-weight: 300;
}
ul[data-expanded] > hicks-list-item {
  -webkit-transform: translateY(calc( (0 + 0) * 1rem));
          transform: translateY(calc( (0 + 0) * 1rem));
  -webkit-transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
          transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
}

.expand-icon {
  fill: black;
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
  -webkit-transition: -webkit-transform 500ms cubic-bezier(0.25, 1, 0.3, 1);
  transition: -webkit-transform 500ms cubic-bezier(0.25, 1, 0.3, 1);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.3, 1);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.3, 1), -webkit-transform 500ms cubic-bezier(0.25, 1, 0.3, 1);
}
.expand-icon.toggled {
  fill: blue;
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}`;
