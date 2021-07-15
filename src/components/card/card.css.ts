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
  border-radius: 4px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-transition: -webkit-box-shadow 0.5s;
  transition: -webkit-box-shadow 0.5s;
  transition: box-shadow 0.5s;
  transition: box-shadow 0.5s, -webkit-box-shadow 0.5s;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  border: 1px solid var(--card--border, gray);
  height: 150px;
  max-height: 200px;
  min-width: 150px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
}
:host:hover::after {
  opacity: 0.8;
}
:host::after {
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

p ::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
  color: black;
  color: var(--card-text--font-color, black);
}

h1 ::slotted(*) {
  font-size: 24pt;
  font-weight: 400;
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: black;
  color: var(--card-title--font-color, black);
}`;
