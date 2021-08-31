import { css } from 'lit';

 export const style = css`@-webkit-keyframes fade-in {
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
  color: var(--list-item--font-color);
  display: list-item;
  font: var(--list-item--font);
  list-style-type: none;
  min-width: 15ch;
  outline: none;
  padding-left: 0.5em;
  pointer-events: none;
  width: inherit;
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
    opacity: 1;
    -webkit-transform: none;
        -ms-transform: none;
            transform: none;
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }
}
@media ( min-width: 0) and ( max-width: 899.99px) {
  :host {
    display: none;
    width: inherit;
  }
  :host([top-level]) {
    display: block;
    font-size: 2.25rem;
    min-width: auto;
    padding: 1rem 0;
  }
}
:host .sublist {
  margin: 0;
  padding: 0 0 0 1rem;
  pointer-events: none;
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
  margin: 0.5rem 0;
}
.item__content {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: grid;
  grid-template-areas: "icon link button";
  grid-template-columns: 2fr 8fr 2fr;
}
@media ( min-width: 0) and ( max-width: 599.99px) {
  .item__content {
    width: inherit;
  }
}
.item__content__prefix {
  grid-area: icon;
}
@media ( min-width: 0) and ( max-width: 899.99px) {
  .item__content__prefix {
    display: none;
  }
}
:host(:not([top-level])) .item__content__prefix {
  padding-right: 1rem;
}
.item__content__a {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  grid-area: link;
  pointer-events: all;
  text-decoration: none;
  z-index: 5;
}
.item__content__link {
  color: var(--list-item--font-color);
  font-family: var(--list-item--font-family);
}
:host([active]) .item__content__link {
  color: var(--primary-10);
}
@media ( min-width: 0) and ( max-width: 899.99px) {
  :host([active]) .item__content__link {
    color: var(--primary-5);
  }
}

@media ( min-width: 0) and ( max-width: 899.99px) {
  :host([top-level]) .item__content__link {
    text-align: center;
  }
}

@media ( min-width: 0) and ( max-width: 899.99px) {
  :host .item__content__link:hover {
    color: var(--secondary-4);
  }
}
.item__content__suffix {
  grid-area: button;
  width: var(--list-item--height);
}
:host([top-level]) .item__content__link {
  font-weight: 500;
}

.toc-container {
  display: contents;
}`;
