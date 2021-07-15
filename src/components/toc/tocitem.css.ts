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
:host {
  width: 100%;
}

.item__content {
  width: calc(var(--host--width) - 10%);
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-areas: "icon link button";
  grid-template-columns: 1fr 9fr 2fr;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.item__content__prefix {
  grid-area: icon;
  padding: 0.5rem;
}
:host([mobile]) .item__content {
  width: inherit;
  height: 100%;
}
.item__content__link {
  color: var(--item--font-color);
  text-decoration: none;
  z-index: 1;
  position: relative;
  grid-area: link;
  padding: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:host([mobile]) .item__content__link {
  width: inherit;
}
.item__content__link:hover, :host([active]) .item__content__link ::slotted(*) {
  color: var(--primary-8);
  text-shadow: currentColor 0.1px -0.1px, currentColor -0.1px 0.1px, currentColor 0.1px 0.1px, currentColor -0.1px -0.1px;
  -webkit-transition: text-shadow var(--item--transition--timing);
  transition: text-shadow var(--item--transition--timing);
}
.item__content__link:hover {
  -webkit-text-decoration: underline var(--secondary-9) 2px;
          text-decoration: underline var(--secondary-9) 2px;
  text-underline-offset: 1px;
}
.item__content__suffix {
  border: none;
  background: none;
  margin: 0px;
  padding: 0px;
  width: var(--item--height);
  height: var(--font-size);
  padding: 0px var(--font-size);
  position: relative;
  padding: 0.4rem;
  grid-area: button;
}`;
