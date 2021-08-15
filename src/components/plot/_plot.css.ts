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
  font-family: "Arimo", sans-serif;
  font-family: var(--body-font);
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
