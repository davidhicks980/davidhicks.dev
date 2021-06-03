import { css } from 'lit';

 export const style = css`h1 {
  font-family: var(--header-font);
  font-size: 99;
}

h2 {
  font-family: var(--header-font);
  font-size: 62;
}

h3 {
  font-family: var(--header-font);
  font-size: 49;
}

h4 {
  font-family: var(--header-font);
  font-size: 35;
}

h5 {
  font-family: var(--header-font);
  font-size: 25;
}

h6 {
  font-family: var(--header-font);
  font-size: 21;
}

/** Block Element
* @access public
* @param {String} $element - Element's name
*/
:host(.toc) {
  position: sticky;
  top: 20vh;
  top: var(calc(--toolbar-height + 5vh), 20vh);
  display: grid;
  grid-template-columns: 3rem 9rem;
  grid-template-rows: auto 100%;
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

.list {
  --list-item-padding: 0%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.list a, .list a:hover, .list a:focus, .list a:active {
  text-decoration: none;
  color: inherit;
}
.list__item {
  list-style-type: none;
}
.list__item__link {
  font-size: 0.8rem;
  margin-left: var(--list-item-padding);
  color: var(--gray-9);
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list__item__link:hover {
  color: var(--secondary-2);
}
.list__item__link.is-active {
  color: var(--primary-8);
  font-weight: 500;
}
.list.is-bordered {
  border: 2px dotted blue;
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
