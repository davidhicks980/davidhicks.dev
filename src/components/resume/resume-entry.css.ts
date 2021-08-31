import { css } from 'lit';

 export const style = css`:host {
  --timeline--marker-size: 0.6rem;
  font-family: var(--body-font);
}

h2,
h3,
h4,
h5 {
  margin-bottom: 0.25em;
  margin-top: 0;
}

:host {
  background: white;
  display: block;
}

.entry__description, .entry__detail, .entry__supervisor {
  font-size: 10pt;
  font-weight: 400;
}

.entry {
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-gap: 1rem;
  gap: 1rem;
  grid-template-areas: "date timeline content expand";
  grid-template-columns: 80px 1px 1fr 30px;
  position: relative;
}
@media ( min-width: 0) and ( max-width: 599.99px) {
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
  grid-area: date;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
}
@media ( min-width: 0) and ( max-width: 599.99px) {
  .entry__left {
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }
}
.entry__timeline {
  background-color: lightgray;
  grid-area: timeline;
  -webkit-transition: -webkit-transform 0.3s ease-in;
  transition: -webkit-transform 0.3s ease-in;
  -o-transition: transform 0.3s ease-in;
  transition: transform 0.3s ease-in;
  transition: transform 0.3s ease-in, -webkit-transform 0.3s ease-in;
}
.entry__timeline::before {
  content: "";
  height: 100%;
  width: 1px;
  position: absolute;
  -webkit-transform-origin: top center;
      -ms-transform-origin: top center;
          transform-origin: top center;
  background-color: var(--gray-3);
  -webkit-transform: scaleY(1);
      -ms-transform: scaleY(1);
          transform: scaleY(1);
  -webkit-transition: -webkit-transform 350ms ease-out;
  transition: -webkit-transform 350ms ease-out;
  -o-transition: transform 350ms ease-out;
  transition: transform 350ms ease-out;
  transition: transform 350ms ease-out, -webkit-transform 350ms ease-out;
  opacity: 0;
}
:host(.is-expanding) .entry__timeline::before {
  -webkit-transform: scaleY(calc(2 / 0.8));
      -ms-transform: scaleY(calc(2 / 0.8));
          transform: scaleY(calc(2 / 0.8));
  -webkit-transform: scaleY(calc(var(--offset-ratio, 2) / 0.8));
      -ms-transform: scaleY(calc(var(--offset-ratio, 2) / 0.8));
          transform: scaleY(calc(var(--offset-ratio, 2) / 0.8));
  opacity: 1;
}
.entry__timeline::after {
  --timeline--marker-size: 0.6rem;
  background-color: currentColor;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 5px 3px white;
          box-shadow: 0 0 5px 3px white;
  color: var(--gray-6);
  content: "";
  height: var(--timeline--marker-size);
  position: absolute;
  -webkit-transform: translate(calc(var(--timeline--marker-size) * -0.43), 0.3rem);
      -ms-transform: translate(calc(var(--timeline--marker-size) * -0.43), 0.3rem);
          transform: translate(calc(var(--timeline--marker-size) * -0.43), 0.3rem);
  -webkit-transition: color 0.3s ease-in;
  -o-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
  width: var(--timeline--marker-size);
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
  color: var(--gray-9);
  color: var(--gray-9);
  display: block;
  font-size: 9pt;
  font-weight: 500;
  padding-top: 0.15rem;
  text-align: right;
  text-transform: uppercase;
  -webkit-transition: color 0.3s ease-in;
  -o-transition: color 0.3s ease-in;
  transition: color 0.3s ease-in;
}
:host([active]) .entry__date {
  color: var(--primary-9);
}
.entry__name {
  color: var(--gray-13);
  cursor: pointer;
  font-size: 12pt;
}
.entry__name :hover {
  text-decoration: underline;
}
.entry__logistics {
  color: var(--gray-12);
  font-size: 11pt;
  font-weight: 400;
}
.entry__supervisor {
  color: var(--gray-11);
}
.entry__description, .entry__detail {
  margin: 0;
}
.entry__expansion {
  margin: 0;
  opacity: 1;
  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);
  -webkit-transition: opacity 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  -o-transition: opacity 0.35s ease-in-out, transform 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out, transform 0.35s ease-in-out;
  transition: opacity 0.35s ease-in-out, transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  visibility: visible;
  height: auto;
}
:host([collapsed]) .entry__expansion, :host(.is-collapsing) .entry__expansion {
  opacity: 0;
  -webkit-transform: scale(0.8);
      -ms-transform: scale(0.8);
          transform: scale(0.8);
  visibility: hidden;
  height: 0px;
}
:host([collapsed].is-expanding) .entry__expansion {
  opacity: 1;
  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);
  visibility: visible;
}

.expand__v {
  -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
          transform: rotate(-90deg);
  -webkit-transform-origin: center center;
      -ms-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: -webkit-transform 0.35s ease-in-out;
  transition: -webkit-transform 0.35s ease-in-out;
  -o-transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
}
:host([collapsed]) .expand__v, :host(.is-collapsing) .expand__v {
  -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
          transform: rotate(0deg);
}
:host(.is-expanding) .expand__v {
  -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
          transform: rotate(-90deg);
}

.expand {
  cursor: pointer;
  outline: none;
  -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
          transform: rotate(0deg);
  -webkit-transform-origin: center center;
      -ms-transform-origin: center center;
          transform-origin: center center;
  -webkit-transition: -webkit-transform 0.35s ease-in-out;
  transition: -webkit-transform 0.35s ease-in-out;
  -o-transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out;
  transition: transform 0.35s ease-in-out, -webkit-transform 0.35s ease-in-out;
  color: var(--gray-8);
}
:focus .expand {
  color: var(--primary-10);
}
.expand:hover {
  color: var(--primary-11);
}
:host([collapsed]) .expand, :host(.is-collapsing) .expand {
  -webkit-transform: rotate(-180deg);
      -ms-transform: rotate(-180deg);
          transform: rotate(-180deg);
}
:host(.is-expanding) .expand {
  -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
          transform: rotate(0deg);
}

.mobile {
  display: none;
}
@media ( min-width: 0) and ( max-width: 599.99px) {
  .mobile {
    display: inline;
  }
}

.icon-button {
  outline: none;
}

hicks-expansion-toggle {
  --icon-button--outline: var(--primary-8);
  --icon-button--active-outline: var(--primary-10);
  --icon-button--background: var(--primary-3);
}`;
