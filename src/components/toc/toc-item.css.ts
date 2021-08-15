import { css } from 'lit';

 export const style = css`@charset "UTF-8";
:root {
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
/*
.transition--fade-in {
  animation-name: fade-in;
  animation-timing-function: cubic-bezier(0.43, 0.04, 1, -0.1);
  animation-duration: calc(var(--list-item--index) * 75ms);
  animation-iteration-count: 1;
}*/
:host {
  width: inherit;
  display: list-item;
  padding-left: 0.5em;
  list-style-type: none;
  font: var(--list-item--font);
  min-width: 15ch;
  outline: none;
  color: var(--list-item--font-color);
  /* will-change: transform;
  transition: 0.3s ease-in-out 0s;
  transform: translateY(
    calc(-1 * (var(--list-item--offset, 0) * var(--list-item--height, 0)))
  );
  transition-property: transform opacity;
  @include root.state('[hidden]') {
    will-change: transform;
    transform: translateY(calc(-1 * (var(--list-item--offset, 0))));
  }*/
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
@media ( min-width: 0px) and ( max-width: 899.99px) {
  :host {
    width: inherit;
    display: none;
  }
  :host([top-level]) {
    display: block;
    font-size: 2rem;
    padding: 1rem;
  }
}
:host .sublist {
  margin: 0px;
  padding: 0px 0px 0px 1rem;
  /* visibility: hidden;
   opacity: 0;*/
  /* @media (prefers-reduced-motion) {
    visibility: visible;
  }
  @include root.state('[expanded]') {
    visibility: visible;
    opacity: 1;
  }*/
}

.item {
  margin: 0.25rem 0rem;
}
.item__content {
  display: grid;
  grid-template-areas: "icon link button";
  grid-template-columns: 2fr 8fr 2fr;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.item__content__prefix {
  grid-area: icon;
}
.item__content__prefix :host([active]:not([top-level])) {
  content: "◆";
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
}
.item__content__link {
  color: var(--list-item--font-color);
  font-family: var(--list-item--font-family);
}
:host([active]) .item__content__link {
  color: var(--primary-10);
  font-weight: 500;
}
.item__content__suffix {
  width: var(--list-item--height);
  grid-area: button;
}
:host([top-level]) .item__content__link {
  font-weight: 500;
}`;
