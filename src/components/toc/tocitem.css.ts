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
@-webkit-keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.transition--fade-in {
  -webkit-animation-name: fade-in;
          animation-name: fade-in;
  -webkit-animation-timing-function: cubic-bezier(0.43, 0.04, 1, -0.1);
          animation-timing-function: cubic-bezier(0.43, 0.04, 1, -0.1);
  -webkit-animation-duration: calc(var(--item--index) * 75ms);
          animation-duration: calc(var(--item--index) * 75ms);
  -webkit-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

:host {
  width: inherit;
  display: list-item;
  padding-left: 0.5em;
  will-change: transform;
  -webkit-transition: 0.3s ease-in-out 0s;
  transition: 0.3s ease-in-out 0s;
  -webkit-transform: translateY(calc(-1 * (0 * 0)));
          transform: translateY(calc(-1 * (0 * 0)));
  -webkit-transform: translateY(calc(-1 * (var(--item--offset, 0) * var(--item--height, 0))));
          transform: translateY(calc(-1 * (var(--item--offset, 0) * var(--item--height, 0))));
  -webkit-transition-property: -webkit-transform opacity;
  transition-property: -webkit-transform opacity;
  transition-property: transform opacity;
  transition-property: transform opacity, -webkit-transform opacity;
  font: var(--item--font);
  min-width: 15ch;
  outline: none;
}
@media (prefers-reduced-motion) {
  :host {
    -webkit-transition: none;
    transition: none;
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  :host {
    width: inherit;
  }
}
:host([hidden]) {
  will-change: transform;
  -webkit-transform: translateY(calc(-1 * (0)));
          transform: translateY(calc(-1 * (0)));
  -webkit-transform: translateY(calc(-1 * (var(--item--offset, 0))));
          transform: translateY(calc(-1 * (var(--item--offset, 0))));
}

:host .sublist {
  visibility: hidden;
  opacity: 0;
  margin: 0px;
  padding: 0px 0px 0px 1rem;
  list-style-type: none;
}
@media (prefers-reduced-motion) {
  :host .sublist {
    visibility: visible;
  }
}
:host([expanded]) .sublist {
  visibility: visible;
  opacity: 1;
}

.item__content {
  display: grid;
  grid-template-areas: "icon link button";
  grid-template-columns: 2fr 8fr 2fr;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: var(--item--height);
}
.item__content__prefix {
  grid-area: icon;
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  .item__content {
    width: inherit;
  }
}
.item__content__a {
  text-decoration: none;
  grid-area: link;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:host([active]) .item__content__a ::slotted(*) {
  color: var(--primary-8);
}
.item__content__link {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.item__content__suffix {
  width: var(--item--height);
  grid-area: button;
}
:host([top-level]) .item__content__link {
  font-weight: 500;
}`;
