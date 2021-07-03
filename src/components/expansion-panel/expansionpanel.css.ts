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
p ::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
}

h1 ::slotted(*) {
  font-size: 24pt;
  font-weight: 400;
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.expansion {
  display: grid;
  grid-template-columns: 120px calc(70% - 1em);
  border: none;
  margin: 0px;
  padding: 0px;
  background-color: white;
  color: hsl(212, 13.2%, 68.88%);
  color: var(--gray-7);
  font-family: sans-serif;
  font-size: 1rem;
  text-align: left;
  border-radius: 7px;
  grid-gap: 1em;
  gap: 1em;
  position: relative;
  border: 1px solid hsl(212, 13.2%, 93.39%);
  border: 1px solid var(--gray-3);
  cursor: pointer;
}
.expansion:hover::after {
  opacity: 0.8;
}
.expansion::after {
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
  -webkit-box-shadow: 0 3px 6px rgb(87 107 138/36%);
          box-shadow: 0 3px 6px rgb(87 107 138/36%);
}
:host([open]) .expansion {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.expansion:active {
  -webkit-filter: brightness(0.9);
          filter: brightness(0.9);
}

.expansion__img {
  grid-column: 1/2;
  height: 100%;
  width: 100%;
  background: hsl(211, 56.4%, 50.74%);
  background: var(--primary-9);
  -webkit-transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out, -webkit-filter 500ms ease-in-out;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  min-height: 200px;
  border-radius: 7px 0px 0px 7px;
}
.expansion__img:hover {
  -webkit-filter: hue-rotate(45deg);
          filter: hue-rotate(45deg);
  background-size: 105%;
}

.expansion__summary {
  grid-column: 2/3;
  background: white;
  color: hsl(212, 13.2%, 59.18%);
  color: var(--gray-8);
}
.expansion__summary__title {
  line-height: 0px;
}
.expansion__summary__ruler {
  border: solid hsl(211, 56.4%, 60.36%);
  border: solid var(--primary-8);
  width: 3em;
  margin: 0px;
  border-width: 2px 0 0 0;
}

.expansion__content {
  padding: 10px;
  border-radius: 7px;
  background-color: hsl(211, 56.4%, 60.36%);
  background-color: var(--primary-8);
  overflow: hidden;
  opacity: 0;
}

:host([open]) .expansion__content {
  padding: 10px;
  overflow: hidden;
  opacity: 1;
  -webkit-transition: opacity 500ms ease;
  transition: opacity 500ms ease;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}

.expansion__content__anime {
  -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
  -webkit-transition: -webkit-transform 250ms ease;
  transition: -webkit-transform 250ms ease;
  transition: transform 250ms ease;
  transition: transform 250ms ease, -webkit-transform 250ms ease;
  height: 0px;
}

.is-shown .expansion__content__anime {
  -webkit-transform: translateY(0%);
          transform: translateY(0%);
  -webkit-transition: -webkit-transform 250ms ease;
  transition: -webkit-transform 250ms ease;
  transition: transform 250ms ease;
  transition: transform 250ms ease, -webkit-transform 250ms ease;
  height: auto;
  background: #f2f2f2;
  padding: 10px;
  border-radius: 7px;
}`;
