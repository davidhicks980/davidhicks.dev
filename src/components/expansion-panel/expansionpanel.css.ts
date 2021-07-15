import { css } from 'lit';

 export const style = css`p ::slotted([slot=description]) {
  color: black;
  color: var(--description--font-color, black);
  font: 400 12pt;
  font: var(--description--font-weight, 400) var(--description--font-size, 12pt) ;
}

h1 ::slotted([slot=header]) {
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: content;
  color: black;
  color: var(--header--font-color, black);
  font: 500 20pt monospace;
  font: var(--header--font-weight, 500) var(--header--font-size, 20pt) var(--header--font-family, monospace) ;
}

:host {
  opacity: 1;
  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;
}

:host(.is-expanding) {
  opacity: 0.99;
}

.expansion {
  all: unset;
  display: grid;
  grid-template-columns: 120px calc(70% - 1em);
  grid-template-areas: "image summary";
  background-color: white;
  text-align: left;
  grid-gap: 1em;
  gap: 1em;
  border: var(--panel--border);
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 7px;
  -webkit-filter: brightness(1);
          filter: brightness(1);
  width: min-max(200px, 600px);
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
  border-radius: 7px 7px 0px 0px;
}
.expansion:active {
  -webkit-filter: brightness(0.9);
          filter: brightness(0.9);
}
.expansion__img {
  grid-area: image;
  height: 100%;
  width: 100%;
  background-color: var(--primary-9);
  -webkit-transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out, -webkit-filter 500ms ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  border-radius: 7px 0px 0px 7px;
}
:host(:hover) .expansion__img {
  -webkit-filter: hue-rotate(45deg);
          filter: hue-rotate(45deg);
}
:host([open]) .expansion__img {
  border-radius: 7px 0px 0px 0px;
}
.expansion__summary {
  grid-area: summary;
  background: white;
  color: var(--gray-8);
}
.expansion__summary__title {
  line-height: 0px;
}
.expansion__summary__ruler {
  border: solid var(--primary-8);
  width: 3em;
  margin: 0px;
  border-width: 2px 0 0 0;
}
.expansion__content {
  overflow: hidden;
}
.expansion__content__transform-wrapper {
  border-radius: 8px;
  background-color: var(--primary-8);
  height: 0px;
}
:host([open]) .expansion__content__transform-wrapper {
  border-radius: 0px 0px 8px 8px;
  visibility: visible;
  height: auto;
  padding: 10px;
}
.expansion__content__anime {
  border-radius: 7px;
  background: #f2f2f2;
  padding: 10px;
}`;
