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

/**Took breakpoints from web.dev site for convenience...nothing super radical tho*/
/** Block Element
* @access public
* @param {String} $element - Element's name
*/
:host(.toc) {
  position: sticky;
  top: 20vh;
  top: var(--toolbar-height, 20vh);
  display: grid;
  grid-template-columns: 2rem auto;
  grid-template-rows: 2rem 100%;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.toc__toggle {
  grid-row: 1/2;
  grid-column: 1/2;
}
.toc__toggle--close {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.toc__content {
  height: calc(100% - 24px);
  overflow-y: auto;
  grid-row: 2/3;
  grid-column: 2/3;
}
.toc__content__link-icon {
  vertical-align: middle;
}
.toc__head {
  grid-row: 1/2;
  grid-column: 2/3;
}
.toc__head__link {
  font-family: "Arial";
  font-size: 1.2rem;
  font-weight: 500;
  font-size: 1rem;
  margin-left: var(--list-item-padding);
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.toc__head__link a, .toc__head__link a:hover, .toc__head__link a:focus, .toc__head__link a:active {
  text-decoration: none;
  color: inherit;
}
.toc__label {
  font-size: 1.25rem;
  vertical-align: middle;
}

:host {
  --x-coord: 0px;
  --y-coord: 0px;
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
.list {
  --list-item-padding: 0%;
  margin: 0;
  padding-left: 0.5rem;
  position: relative;
  overflow: visible;
}
.list::before {
  content: "";
  border-left: 2px solid var(--primary-7);
}
[dir="ltr"] .list__sublist{
  padding-left: 0.75rem;
}
[dir="rtl"] .list__sublist{
  padding-right: 0.75rem;
}
.list__sublist {
  padding-left: 0.75rem;
  margin: 0px;
  list-style-type: none;
  overflow: visible;
  opacity: 0.1;
  display: block;
  top: auto;
}
.list__sublist li {
  height: 1px;
  display: block;
  -webkit-transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.list__sublist.is-expanded {
  top: auto;
  opacity: 1;
  -webkit-transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.list__sublist.is-expanded > li {
  height: 1rem;
}
.list__sublist.is-expanded + li {
  top: auto;
}
.list__item.is-cv {
  list-style-type: "📜";
}
.list__item.is-portfolio {
  list-style-type: "🎨";
}
.list__item.is-about {
  list-style-type: "🐈";
}
.list__item.is-contact {
  list-style-type: "💌";
}
.list__item__link {
  font-size: 1rem;
  margin-left: var(--list-item-padding);
  color: var(--gray-9);
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.25em;
}
.list__item__link:hover::after, .list__item__link:focus::after {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  opacity: 1;
}
.list__item__link[data-toc-level="1"] {
  margin-left: 1em;
}
.list__item__link[data-toc-level="2"] {
  margin-left: 2em;
}
.list__item__link[data-toc-level="3"] {
  margin-left: 3em;
}
.list__item__link[data-toc-level="4"] {
  margin-left: 4em;
}
.list__item__link[data-toc-level="5"] {
  margin-left: 5em;
}
.list__item__link:hover {
  text-decoration: underline;
  -webkit-text-decoration-color: var(--secondary-6);
          text-decoration-color: var(--secondary-6);
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow 1s;
  transition: text-shadow 1s;
}
.list__item__link.is-active {
  color: var(--primary-8);
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow 1s;
  transition: text-shadow 1s;
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
    --list-item-padding: 0%;
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
    margin-left: var(--list-item-padding);
    color: gray;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list__item__link.is-active .list__item.is-bordered {
    border: 2px dotted blue;
}*/`;
