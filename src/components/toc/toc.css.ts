import { css } from 'lit';

 export const style = css`:host {
  --list--item-count: 0;
  --list--header-font: bold 1.5rem var(--body-font), sans-serif;
  --item--font-size: 1.25em;
  --item--scaler: 1.5;
  --item--height: calc(var(--item--scaler) * 1em);
  --track--scale: calc(var(--item--scaler) * var(--list--item-count));
  --host--height: calc(var(--list--item-count) * var(--item--height) + 3.5rem);
  --host--width: 200px;
  --host--top: calc(var(--toolbar-height, 20vh) + 5vh);
}

:host(.toc) {
  position: sticky;
  top: var(--host--top);
  display: grid;
  grid-template-columns: 2rem 1fr;
  grid-template-rows: 2rem var(--host--height);
  width: var(--host--width);
  overflow: hidden;
}

.toc__content {
  width: 200px;
  grid-row: 2/3;
  grid-column: 2/3;
  height: calc(var(--host--height) - 1rem);
  display: block;
}
.toc__content__link-icon {
  vertical-align: middle;
}
.toc__track .toc-track {
  grid-column: 1/2;
  grid-row: 2/2;
  height: var(--item--height);
  -webkit-transform: scaleY(var(--track--scale));
          transform: scaleY(var(--track--scale));
  display: inline;
  position: absolute;
  border: 2px solid var(--primary-7);
  border-width: 0 0 0 2px;
  width: 2px;
  -webkit-transform-origin: top left;
          transform-origin: top left;
  will-change: transform;
  -webkit-transition: -webkit-transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.toc__head {
  grid-row: 1/2;
  grid-column: 2/3;
  border-bottom: 1px solid var(--gray-7);
  font: var(--list--header-font);
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  width: 66%;
}

.list {
  margin: 0;
  padding-left: 0.5rem;
  overflow: visible;
  height: calc(var(--list--item-count) * var(--item--height));
}
[dir="ltr"] .list__sublist {
  padding-left: 0.75rem;
}
[dir="rtl"] .list__sublist {
  padding-right: 0.75rem;
}
.list__sublist {
  padding-left: 0.75rem;
  list-style-type: none;
  display: block;
  overflow: visible;
  position: absolute;
  opacity: 0;
}
.list__sublist.is-expanded {
  top: inherit;
  opacity: 1;
}
.list__item {
  --item--marker: "";
  display: list-item;
  height: var(--item--height);
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  will-change: transform;
  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  list-style-type: var(--item--marker);
  position: absolute;
  width: calc(var(--host--width) - 4rem);
  padding-left: 0.5em;
}
.is-expanded > .list__item {
  -webkit-transform: translateY(calc( (var(--item--index) + var(--item--neighbor-index)) * var(--item--height)));
          transform: translateY(calc( (var(--item--index) + var(--item--neighbor-index)) * var(--item--height)));
  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), -webkit-transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.list__item__link {
  color: var(--gray-9);
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  width: 100%;
}
.list__item__link:hover, .list__item__link.is-active {
  color: var(--primary-8);
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow 1s;
  transition: text-shadow 1s;
}
.list__item__link:hover {
  text-decoration: underline;
  -webkit-text-decoration-color: var(--secondary-9);
          text-decoration-color: var(--secondary-9);
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
}

@-webkit-keyframes OpenList {
  0% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
  }
}

@keyframes OpenList {
  0% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
  }
}
@-webkit-keyframes CloseList {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
  }
}
@keyframes CloseList {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
  }
}
/*
:host(.toc) {
    display: grid;
    grid-template-columns: 1rem 4rem;
    grid-template-rows: 2rem 8rem;
}

:host(.toc) .toc__head {
    display: flex;
    flex-direction: row;
}

:host([opened]) .toc__container {
    padding: 24px 0;
    top: 63px;
    z-index: 100;
    width: 200px;
    position: sticky;
    display: grid;
}

.toc__border {
    margin-left: -24px;
    padding-left: 21px;
}

.toc__content {
    height: calc(100% - 24px);
    overflow-y: auto;
    padding: 0 24px;
}

.toc__content__link-icon {
    vertical-align: middle;
}

.toc__header {
    margin-bottom: 12px;
    margin-top: 12px;
}

.toc__header__link {
    font-size: 1.4rem;
    font-weight: 500;
    appearance: none;
}

.toc__header__link:hover {
    color: var(--orange-8);
}

.toc__label {
    font-size: 1.4rem;
}

.toc__head {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.list {
    --item-padding: 0%;
    margin-left: 30px;
    padding: 0;
    list-style-type: none;
    margin-block: 0px;
    padding-inline: 0px;
    border-left: 3px solid var(--secondary-6);
    display: grid;
}

.list__item {
    list-style-type: none;
    margin: 0.5rem 0px;
}

.list__item__link {
    font-size: 0.8rem;
    margin-left: var(--item-padding);
    color: gray;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list__item__link.is-active .list__item.is-bordered {
    border: 2px dotted blue;
}*/`;
