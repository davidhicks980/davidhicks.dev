import { css } from 'lit';

 export const style = css`:host {
  --timeline--marker-size: 0.6rem;
}

h2,
h3,
h4,
h5 {
  margin-top: 0em;
  margin-bottom: 0.25em;
}

:host {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: block;
}

.entry {
  display: grid;
  grid-template-columns: 80px 1px 400px 50px;
  position: relative;
  grid-gap: 1rem;
  gap: 1rem;
  border-radius: 5px;
}
.entry__left {
  grid-column: 1/2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: right;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
}
.entry__timeline {
  grid-column: 2/3;
  background-color: lightgray;
}
.entry__timeline::after {
  color: var(--gray-6);
  --timeline--marker-size: 0.6rem;
  position: absolute;
  content: "";
  height: var(--timeline--marker-size);
  width: var(--timeline--marker-size);
  border-radius: 50%;
  background-color: currentColor;
  -webkit-transform: translate(calc(var(--timeline--marker-size) * -0.43), 0.3rem);
          transform: translate(calc(var(--timeline--marker-size) * -0.43), 0.3rem);
  -webkit-box-shadow: 0 0 5px 3px white;
          box-shadow: 0 0 5px 3px white;
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
}
:host([active]) .entry__timeline::after {
  color: var(--primary-9);
}
.entry__right {
  grid-column: 3/4;
  padding: 0rem 0rem 1rem 0rem;
}
.entry__expand {
  grid-column: 4/5;
}
.entry__expand__button {
  height: 2rem;
  width: 2rem;
}
.entry__date {
  display: block;
  font-size: 10pt;
  color: var(--gray-13);
  font-weight: 500;
  text-transform: uppercase;
}
.entry__date ::slotted(*) {
  color: var(--gray-11);
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
}
:host([active]) .entry__date ::slotted(*) {
  color: var(--primary-9);
}
.entry__title ::slotted(*) {
  font-size: 12pt;
  color: var(--gray-13);
}
.entry__logistics ::slotted(*) {
  font-size: 11pt;
  color: var(--gray-12);
  font-weight: 400;
}
.entry__supervisor ::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
  color: var(--gray-11);
}
.entry__description ::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
}
.entry__detail ::slotted(*) {
  all: unset;
  font-size: 10pt;
  font-weight: 400;
}

.expand__v {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
  -webkit-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: -webkit-transform 0.35s ease-in-out;
  transition: -webkit-transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
}
:host([expanded]) .expand__v {
  -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
}

.expand {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
  -webkit-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: -webkit-transform 0.35s ease-in-out;
  transition: -webkit-transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  color: var(--primary-9);
}
.expand:hover {
  color: var(--primary-11);
}
:host([expanded]) .expand {
  -webkit-transform: rotate(-180deg);
          transform: rotate(-180deg);
}`;
