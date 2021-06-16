import { css } from 'lit';

 export const style = css`/**Took breakpoints from web.dev site for convenience...nothing super radical tho*/
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
  color: var(--gray-7);
  font-family: sans-serif;
  font-size: 1rem;
  text-align: left;
  border-radius: 7px;
  grid-gap: 1em;
  gap: 1em;
  position: relative;
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
  padding: 10px;
  border-radius: 7px;
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
