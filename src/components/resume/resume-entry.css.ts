import { css } from 'lit';

 export const style = css`h2,
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
  padding: 10px;
}

.entry {
  display: grid;
  grid-template-columns: 200px 1fr;
  position: relative;
  border-radius: 5px;
  border: 1px solid lightgray;
}
.entry:hover::after {
  opacity: 0.8;
}
.entry::after {
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
.entry__left {
  grid-column: 1/2;
  display: block;
}
.entry__left::after {
  position: absolute;
  content: "";
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 2px solid blue;
}
.entry__right {
  grid-column: 2/3;
}
.entry__date {
  display: block;
}
.entry__date::slotted(*) {
  font-size: 11pt;
  color: var(--gray-13);
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
}`;
