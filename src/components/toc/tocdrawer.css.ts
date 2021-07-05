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
  --list--item-count: 0;
  --list--header-font: bold 1.5rem var(--body-font), sans-serif;
  --item--font-size: 1rem;
  --item--font-color: white;
  --item--hover--font-color: white;
  --item--margin: 1em;
  --item--height: calc(var(--item--font-size) + var(--item--margin));
  --item--transition--timing: 1s;
  --host--height: 100vh;
  --host--width: 80vw;
  --host--top: 90px;
  --item--displacement: 1rem;
  --host--display: grid;
  --item--z-index: 1000;
  --sublist--item--padding-left: 0.75rem;
}

:host(.toc) {
  position: fixed;
  top: var(--host--top);
  display: var(--host--display);
  grid-template-columns: var(--item--displacement) 1fr;
  grid-template-rows: var(--item--displacement) var(--host--height);
  width: var(--host--width);
  overflow: hidden;
  grid-column-gap: var(--list--column-gap);
  -webkit-column-gap: var(--list--column-gap);
     -moz-column-gap: var(--list--column-gap);
          column-gap: var(--list--column-gap);
}
:host(.toc[mobile]) {
  --host--flex-direction: column;
  --host--display: flex;
  --host--width: 80vw;
  --host--top: 90px;
  --item--font-size: 1.5rem;
}

.toc__content {
  grid-row: 2/3;
  grid-column: 2/3;
  height: calc(var(--host--height) - 1rem);
  display: block;
}
.toc__content__link-icon {
  vertical-align: middle;
}
:host([mobile]) .toc__content {
  grid-row: none;
  grid-column: none;
  width: inherit;
}
.toc__track .toc-track {
  grid-column: 1/2;
  grid-row: 2/2;
  height: calc( var(--item--height) + var(--item--height) / var(--list--item-count));
  -webkit-transform: scaleY(var(--list--item-count));
          transform: scaleY(var(--list--item-count));
  position: absolute;
  border: 2px solid hsl(211, 56.4%, 69.98%);
  border: 2px solid var(--primary-7);
  border-width: 0 0 0 2px;
  -webkit-transform-origin: top left;
          transform-origin: top left;
  will-change: transform;
  -webkit-transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
}
:host([mobile]) .toc__track .toc-track {
  display: none;
}
.toc__head {
  grid-row: 1/2;
  grid-column: 2/3;
  border-bottom: 1px solid hsl(212, 13.2%, 68.88%);
  border-bottom: 1px solid var(--gray-7);
  font: var(--list--header-font);
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  width: 66%;
}

.list {
  margin: 0;
  padding-left: 0rem;
  overflow: visible;
  height: calc(var(--list--item-count) * var(--item--height));
}
.list__sublist {
  padding-left: var(--sublist--item--padding-left);
  list-style-type: none;
  display: block;
  overflow: visible;
  position: absolute;
  opacity: 0;
  margin: 0px;
  padding-left: 0rem;
  overflow: visible;
  height: calc(var(--list--item-count) * var(--item--height));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: end;
      -ms-flex-align: end;
          align-items: flex-end;
  width: calc(var(--host--width) - var(--sublist--item--padding-left));
}
.list__sublist.is-expanded {
  opacity: 1;
}

.list-item {
  --item--marker: "";
  display: list-item;
  height: var(--item--height);
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  will-change: transform;
  -webkit-transition: -webkit-transform opacity var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform opacity var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform opacity var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform opacity var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform opacity var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  list-style-type: var(--item--marker);
  position: absolute;
  padding-left: 0px;
  font-size: var(--item--font-size);
  opacity: 0;
  color: white;
  width: calc( var(--host--width) - var(--sublist--depth) * var(--sublist--item--padding-left));
}
.is-expanded > .list-item {
  opacity: 1;
  -webkit-transform: translateY(calc( (var(--item--index) + var(--item--neighbor-index)) * var(--item--height)));
          transform: translateY(calc( (var(--item--index) + var(--item--neighbor-index)) * var(--item--height)));
  -webkit-transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform var(--item--transition--timing) cubic-bezier(0.075, 0.82, 0.165, 1);
}
:host([mobile]) .list-item {
  list-style-type: none;
}
.list-item__content {
  height: 100%;
  position: absolute;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.list-item__content__link {
  color: var(--item--font-color);
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 1;
  left: 0px;
  position: relative;
}
.list-item__content__link:hover, .list-item__content__link.is-active {
  color: hsl(211, 56.4%, 60.36%);
  color: var(--primary-8);
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow var(--item--transition--timing);
  transition: text-shadow var(--item--transition--timing);
}
.list-item__content__link:hover {
  text-decoration: underline;
  -webkit-text-decoration-color: hsl(12, 66.4%, 51.39%);
          text-decoration-color: hsl(12, 66.4%, 51.39%);
  -webkit-text-decoration-color: var(--secondary-9);
          text-decoration-color: var(--secondary-9);
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
}
.list-item__content__expand-btn {
  width: var(--item--height)1em;
  right: 0px;
  position: relative;
  font-family: monospace;
  font-size: 1.5rem;
  margin: 0px;
  padding: 0px;
  background: none;
  border: none;
}`;
