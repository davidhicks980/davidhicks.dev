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
  --item--index: 0;
  --item--neighbor-index: 0;
  height: var(--item--height);
  display: list-item;
  position: absolute;
  padding-left: calc(0.25 * var(--font-size));
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  will-change: transform;
  -webkit-transition: -webkit-transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
  font: var(--item--font);
  min-width: 15ch;
  list-style-type: none;
}
:host([shown]) {
  -webkit-transform: translateY(calc( (0 + 0) * 1rem));
          transform: translateY(calc( (0 + 0) * 1rem));
  -webkit-transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
          transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
}

:host([locked]) {
  -webkit-transform: translateY(calc( (0 + 0) * 1rem));
          transform: translateY(calc( (0 + 0) * 1rem));
  -webkit-transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
          transform: translateY(calc( (var(--item--index, 0) + var(--item--offset, 0)) * var(--item--height, 1rem) ));
}

.item__content {
  width: calc(var(--host--width) - 10%);
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-areas: "icon link button";
  grid-template-columns: 1fr 9fr 2fr;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.item__content__prefix {
  grid-area: icon;
  padding: 0.5rem;
}
:host([mobile]) .item__content {
  width: inherit;
  height: 100%;
}
.item__content__link {
  color: var(--item--font-color);
  text-decoration: none;
  z-index: 1;
  position: relative;
  grid-area: link;
  padding: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:host([mobile]) .item__content__link {
  width: inherit;
}
.item__content__link:hover, :host([active]) .item__content__link ::slotted(*) {
  color: hsl(211, 56.4%, 60.36%);
  color: var(--primary-8);
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow var(--item--transition--timing);
  transition: text-shadow var(--item--transition--timing);
}
.item__content__link:hover {
  -webkit-text-decoration: underline hsl(12, 66.4%, 51.39%) 2px;
          text-decoration: underline hsl(12, 66.4%, 51.39%) 2px;
  -webkit-text-decoration: underline var(--secondary-9) 2px;
          text-decoration: underline var(--secondary-9) 2px;
  text-underline-offset: 1px;
}
.item__content__suffix {
  border: none;
  background: none;
  margin: 0px;
  padding: 0px;
  width: var(--item--height);
  height: var(--font-size);
  padding: 0px var(--font-size);
  position: relative;
  padding: 0.4rem;
  grid-area: button;
}`;
