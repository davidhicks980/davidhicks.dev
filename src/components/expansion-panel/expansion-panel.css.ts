import { css } from 'lit';

 export const style = css`:host {
  --expand-card--content-font: sans-serif;
  --expand-card--header-font: sans-serif;
  --expand-card--padding: 1rem;
  opacity: 1;
  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;
  display: block;
}

p ::slotted([slot=description]) {
  font: 11pt;
  color: var(--gray-10);
  font-family: var(--expand-card--content-font);
}

.header {
  padding: 0px var(--expand-card--padding);
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
        align-items: center;
    grid-gap: 1em;
    gap: 1em;
    background: var(--primary-11);
    margin: 0px;
    border-radius: 7px 7px 0px 0px;
  }
  .header__title {
    font-size: 18pt;
  }
  .header::before {
    background-image: var(--panel--image);
    height: 2.5em;
    width: 2.5em;
    content: " ";
    display: inline-block;
    background-repeat: no-repeat;
    position: relative;
    background-origin: 50% 50%;
    background-position: center;
    background-size: var(--panel--icon--size);
  }
}
.header ::slotted([slot=header]) {
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: content;
  font-size: 22pt;
  color: var(--gray-12);
  font-family: var(--expand-card--header-font);
  font-weight: 400;
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .header ::slotted([slot=header]) {
    color: var(--primary-3);
    text-shadow: #183758 0px 1px 0px;
    font-weight: 600;
    letter-spacing: 1px;
  }
}

.expansion {
  all: unset;
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-areas: "image content";
  background-color: white;
  text-align: left;
  grid-gap: 1em;
  gap: 1em;
  -webkit-box-shadow: 0 0 0 1px var(--gray-2);
          box-shadow: 0 0 0 1px var(--gray-2);
  border-radius: 7px;
  -webkit-filter: brightness(1);
          filter: brightness(1);
  width: 100%;
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .expansion {
    grid-template-areas: "content";
    grid-template-columns: 100%;
  }
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
  -webkit-box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07);
}
:host(:hover) .expansion {
  -webkit-box-shadow: 0 0 0 1px var(--gray-1);
          box-shadow: 0 0 0 1px var(--gray-1);
}
:host:not([collapsed]) .expansion {
  border-bottom-right-radius: 0px;
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
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .expansion__img {
    display: none;
    border-radius: 7px;
  }
}
:host(:not([collapsed])) .expansion__img {
  border-bottom-left-radius: 0px;
}
.expansion__content {
  grid-area: content;
  background: white;
  color: var(--gray-8);
  overflow: auto;
  max-height: inherit;
  border-radius: 0px 7px 7px 0px;
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .expansion__content {
    border-radius: 7px;
  }
}
:host(:not([collapsed])) .expansion__content {
  border-bottom-right-radius: 0px;
}
.expansion__content__padding {
  padding: 0.5rem;
}

.ruler {
  border: 2px solid var(--primary-8);
  width: 3em;
  margin-left: var(--expand-card--padding);
  border-width: 2px 0px 0px 0px;
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .ruler {
    width: 100%;
    margin: 0px;
  }
}

.panel {
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
  font-family: var(--body-font);
}
.panel__padding {
  border-radius: 7px;
  background: #f2f2f2;
  padding: 10px;
}
:host([collapsed]:not(.is-expanding)) .panel, :host(.is-collapsing) .panel {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: scale(0.5) translateY(-150px);
          transform: scale(0.5) translateY(-150px);
}

.footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  padding: 0px var(--expand-card--padding);
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .footer {
    border-radius: 7px;
    padding: 1rem;
  }
}
.footer__icons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  grid-gap: 0.5rem;
  gap: 0.5rem;
  width: 100%;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}
.footer__icons ::slotted([slot=icon]) {
  -webkit-filter: grayscale(1);
          filter: grayscale(1);
  padding: 0.5rem;
  border: 1px solid var(--primary-5);
  max-height: 2rem;
}
.footer__icons ::slotted([slot=icon]):hover {
  -webkit-filter: grayscale(0);
          filter: grayscale(0);
}
.footer__icons ::slotted([slot=icon]:hover) {
  -webkit-filter: grayscale(0);
          filter: grayscale(0);
}
.footer__button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  padding: 1rem;
}

p {
  margin-right: 1em;
}

.body {
  --panel--max-height: 200px;
  padding: 0px var(--expand-card--padding);
  max-height: var(--panel--max-height);
  overflow: auto;
  min-height: 100px;
}

.button--text {
  all: unset;
  padding: 0.5em 0.75em;
  margin: 1em;
  font-family: var(--expand-card--content-font);
  color: var(--primary-10);
  font-weight: 500;
  border-radius: 5px;
  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content;
}
.button--text:hover {
  background-color: var(--primary-4);
}
.button--text:active {
  background-color: var(--primary-6);
  -webkit-box-shadow: inset 0 0 0 1px var(--primary-10);
          box-shadow: inset 0 0 0 1px var(--primary-10);
}
.button--text:focus {
  -webkit-box-shadow: inset 0 0 0 1px var(--primary-8);
          box-shadow: inset 0 0 0 1px var(--primary-8);
}`;
