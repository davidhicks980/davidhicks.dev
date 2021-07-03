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
/**
      Layout 
      */
.container {
  display: grid;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  grid-gap: 10px;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "chart chart chart latex latex" "chart chart chart inputs inputs" "chart chart chart inputs inputs";
  position: relative;
  /* width */
  /* Track */
  /* Handle */
}
.container ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.container ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0 1px lightgray;
          box-shadow: inset 0 0 0 1px lightgray;
  border-radius: 10px;
}
.container ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border-radius: 10px;
}
.container.is-small {
  grid-template-areas: "latex" "chart" "chart" "inputs";
  grid-template-rows: auto minmax(5vh, 150px) minmax(5vh, 150px) auto;
  grid-template-columns: 100%;
}
.container > * {
  border-radius: 5px;
  border: 1px solid #bbbbbb;
  background: white;
}
.container > *:hover::after {
  opacity: 0.8;
}
.container > *::after {
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
.container * {
  font-family: "systemui", "IBM Plex Sans", "Roboto", Arial, Helvetica, sans-serif;
}
.container__chart {
  grid-area: chart;
  max-height: 100%;
  padding: 30px 30px 10px 10px;
  max-width: 100%;
  min-width: 200px;
  position: relative;
}
.container__inputs {
  grid-area: inputs;
  padding: 10px;
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
  position: relative;
  grid-gap: 1em;
  gap: 1em;
}
.container__latex {
  grid-area: latex;
  border: 1px solid #bbbbbb;
  position: relative;
}

.inputs__range {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  -ms-flex-line-pack: distribute;
      align-content: space-around;
  -ms-flex-pack: distribute;
      justify-content: space-around;
  place-content: space-around;
  width: 100%;
  grid-row-gap: 1em;
  row-gap: 1em;
  padding: 0.5em;
  grid-column-gap: 0.75em;
  -webkit-column-gap: 0.75em;
     -moz-column-gap: 0.75em;
          column-gap: 0.75em;
}

.inputs__toggle {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border: 1px dotted #bbbbbb;
  border-radius: 5px;
  height: 3.5em;
  -ms-flex-line-pack: space-evenly;
      align-content: space-evenly;
  -webkit-box-pack: space-evenly;
      -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
  place-content: space-evenly;
  -webkit-box-shadow: var(--pk-shadow--step-0);
          box-shadow: var(--pk-shadow--step-0);
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  max-width: 14em;
  width: 11em;
}

pk-latex {
  --input: normal 0.7em var(--body-font), serif;
}`;
