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
.icon-button {
  padding: 0px;
  position: relative;
  opacity: 1;
  -webkit-transform: scale(1);
          transform: scale(1);
  display: block;
  line-height: 0px;
  -webkit-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
}
.icon-button::before {
  --icon-button--background: rgba(255, 255, 255, 0.3);
  --icon-button--outline: rgba(255, 255, 255, 0.5);
  --icon-button--active-outline: rgba(255, 255, 255, 1);
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  background-color: var(--icon-button--background);
  border-radius: 50%;
  -webkit-transform: scale(1.35);
          transform: scale(1.35);
  opacity: 0;
  -webkit-transform-origin: center;
          transform-origin: center;
  -webkit-transition-property: opacity transform;
  transition-property: opacity transform;
  -webkit-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  height: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 100%;
}
.icon-button:hover::before {
  opacity: 0.3;
  -webkit-transform: scale(1.35);
          transform: scale(1.35);
}
.icon-button:hover:active::before {
  opacity: 0.6;
  border: 1px solid white;
  -webkit-transform: scale(1.65);
          transform: scale(1.65);
}
.icon-button:active::before {
  opacity: 0.3;
  -webkit-transform: scale(1.65);
          transform: scale(1.65);
}
.icon-button:focus::before {
  opacity: 0.3;
}

.icon-button {
  background: none;
  border: none;
  display: block;
}

:host {
  --icon-toggle--height: 2rem;
  --icon-toggle--width: 2rem;
  height: var(--icon-toggle--height);
  width: var(--icon-toggle--width);
}`;
