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
  font: 500 20pt;
  font: var(--header--font-weight, 500) var(--header--font-size, 20pt) ;
}

::slotted([slot=built-with]) {
  max-height: 50px;
}

:host {
  opacity: 1;
  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;
  display: block;
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
:host:not([collapsed]) .expansion {
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
:host:not([collapsed]) .expansion__img {
  border-radius: 7px 0px 0px 0px;
}
.expansion__summary {
  grid-area: summary;
  background: white;
  color: var(--gray-8);
}
.expansion__summary__title {
  line-height: 0px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.expansion__summary__ruler {
  border: solid var(--primary-8);
  width: 3em;
  margin: 0px;
  border-width: 2px 0 0 0;
}
.expansion__panel {
  height: auto;
}
.expansion__content {
  border-radius: 8px;
  border-radius: 0px 0px 8px 8px;
  visibility: visible;
  padding: 10px;
  background-color: var(--primary-8);
  -webkit-transform: scale(1) translateY(0px);
          transform: scale(1) translateY(0px);
  -webkit-transition-property: -webkit-transform opacity;
  transition-property: -webkit-transform opacity;
  transition-property: transform opacity;
  transition-property: transform opacity, -webkit-transform opacity;
  -webkit-transition: 250ms ease-out;
  transition: 250ms ease-out;
  opacity: 1;
}
.expansion__content__padding {
  border-radius: 7px;
  background: #f2f2f2;
  padding: 10px;
}
:host([collapsed]:not(.is-expanding)) .expansion__content, :host(.is-collapsing) .expansion__content {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: scale(0.5) translateY(-150px);
          transform: scale(0.5) translateY(-150px);
}`;
