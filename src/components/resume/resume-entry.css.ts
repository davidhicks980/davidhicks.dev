import { css } from 'lit';

 export const style = css`:host {
  --timeline--marker-size: 0.6rem;
  font-family: var(--body-font);
}

h2,
h3,
h4,
h5 {
  margin-top: 0em;
  margin-bottom: 0.25em;
}

:host {
  display: block;
  background: white;
}

.entry__detail *::slotted(*), .entry__description *::slotted(*), .entry__supervisor *::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
}

.entry {
  display: grid;
  grid-template-areas: "date timeline content expand";
  grid-template-columns: 80px 1px 1fr 30px;
  position: relative;
  grid-gap: 1rem;
  gap: 1rem;
  border-radius: 5px;
  background-color: white;
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  .entry {
    grid-template-areas: "timeline date date" "timeline content expand";
    grid-template-columns: 1px 1fr 50px;
    grid-template-rows: 20px 1fr;
  }
}
.entry__left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  grid-area: date;
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  .entry__left {
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }
}
.entry__timeline {
  grid-area: timeline;
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
  grid-area: content;
  padding-bottom: 0.5rem;
}
.entry__expand {
  grid-area: expand;
}
.entry__expand__button {
  height: 2rem;
  width: 2rem;
}
.entry__date {
  display: block;
  font-size: 9pt;
  color: var(--gray-13);
  font-weight: 500;
  text-transform: uppercase;
  padding-top: 0.15rem;
}
.entry__date ::slotted(*) {
  color: var(--gray-11);
  -webkit-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
}
:host([active]) .entry__date ::slotted(*) {
  color: var(--primary-9);
}
.entry__title {
  cursor: pointer;
}
.entry__title :hover {
  text-decoration: underline;
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
.entry__supervisor {
  color: var(--gray-11);
}
.entry__description {
  margin: 0px;
}
.entry__detail {
  margin: 0px;
}
.entry__expansion {
  margin: 0px;
  -webkit-transform: scale(1);
          transform: scale(1);
  opacity: 1;
  -webkit-transition-property: opacity transform;
  transition-property: opacity transform;
  -webkit-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  visibility: visible;
}
:host([collapsed]) .entry__expansion, :host(.is-collapsing) .entry__expansion {
  -webkit-transform: scale(0.8);
          transform: scale(0.8);
  opacity: 0;
  visibility: hidden;
}
:host([collapsed].is-expanding) .entry__expansion {
  -webkit-transform: scale(1);
          transform: scale(1);
  opacity: 1;
  visibility: visible;
}

.expand__v {
  -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
  -webkit-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: -webkit-transform 0.35s ease-in-out;
  transition: -webkit-transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
}
:host([collapsed]) .expand__v, :host(.is-collapsing) .expand__v {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
}
:host(.is-expanding) .expand__v {
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
  color: var(--gray-7);
  cursor: pointer;
}
.expand:hover {
  color: var(--primary-11);
}
:host([collapsed]) .expand, :host(.is-collapsing) .expand {
  -webkit-transform: rotate(-180deg);
          transform: rotate(-180deg);
}
:host(.is-expanding) .expand {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
}

.mobile {
  display: none;
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  .mobile {
    display: inline;
  }
}`;
