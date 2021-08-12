import { css } from 'lit';

 export const style = css`p ::slotted([slot=description]) {
  font: 11pt;
  color: var(--gray-10);
}

h1 ::slotted([slot=header]) {
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: content;
  font-size: 20pt;
  color: var(--gray-12);
}

:host {
  opacity: 1;
  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;
  display: block;
}

.expansion {
  --panel--border: 1px solid var(--gray-5);
  --panel--max-height: 350px;
  all: unset;
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-areas: "image summary";
  background-color: white;
  text-align: left;
  grid-gap: 1em;
  gap: 1em;
  border: var(--panel--border);
  cursor: pointer;
  border-radius: 7px;
  -webkit-filter: brightness(1);
          filter: brightness(1);
  width: 100%;
  max-height: var(--panel--max-height);
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
.expansion__img {
  grid-area: image;
  height: inherit;
  width: 100%;
  background-color: var(--primary-10);
  background-image: var(--panel--image);
  -webkit-transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, -webkit-filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out;
  transition: background-size 500ms ease, filter 500ms ease-in-out, -webkit-filter 500ms ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
  background-size: var(--panel--image--size);
  border-radius: 7px 0px 0px 7px;
}
:host:not([collapsed]) .expansion__img {
  border-radius: 7px 0px 0px 0px;
}
.expansion__summary {
  grid-area: summary;
  background: white;
  color: var(--gray-8);
  overflow: auto;
  max-height: inherit;
}
.expansion__summary__title {
  line-height: 0px;
  font-family: Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.expansion__summary__ruler {
  border: solid var(--primary-8);
  width: 3em;
  margin: 0px;
  border-width: 2px 0 0 0;
}
.expansion__summary__button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  padding: 1rem;
}
.expansion__panel {
  height: auto;
}
.expansion__icons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.expansion__icons ::slotted([slot=icon]) {
  -webkit-filter: grayscale(1);
          filter: grayscale(1);
  padding: 0.5rem;
  border: 1px solid var(--primary-5);
  max-height: 2rem;
}
.expansion__icons ::slotted([slot=icon]):hover {
  -webkit-filter: grayscale(0);
          filter: grayscale(0);
}
.expansion__icons ::slotted([slot=icon]:hover) {
  -webkit-filter: grayscale(0);
          filter: grayscale(0);
}
.expansion__content {
  border-radius: 8px;
  border-radius: 0px 0px 8px 8px;
  display: block;
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
  height: auto;
}
.expansion__content__padding {
  border-radius: 7px;
  background: #f2f2f2;
  padding: 10px;
}
:host([collapsed]:not(.is-expanding)) .expansion__content, :host(.is-collapsing) .expansion__content {
  height: 0px;
  display: none;
  opacity: 0;
  -webkit-transform: scale(0.5) translateY(-50px);
          transform: scale(0.5) translateY(-50px);
}

.button--text {
  all: unset;
  padding: 0.75em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: var(--primary-10);
  font-weight: 500;
}
.button--text:hover {
  background-color: var(--primary-4);
}`;
