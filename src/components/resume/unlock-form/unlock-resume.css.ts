import { css } from 'lit';

 export const style = css`.unlock-resume__input-wrapper {
  padding: 0.7rem 0px;
}

input {
  padding: 0.5em;
  font-size: 12pt;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid var(--gray-9);
}
input[type=text] {
  font-size: 12pt;
  max-width: 30ch;
  caret-color: var(--primary-9);
  grid-column: 3/4;
  -webkit-text-security: disc;
}
input::-webkit-input-placeholder {
  color: var(--gray-8);
}
input::-moz-placeholder {
  color: var(--gray-8);
}
input:-ms-input-placeholder {
  color: var(--gray-8);
}
input::-ms-input-placeholder {
  color: var(--gray-8);
}
input::placeholder {
  color: var(--gray-8);
}
input:hover {
  background-color: var(--gray-1);
}

.unlock-resume__hint {
  font-size: 9pt;
  color: var(--gray-11);
}
.unlock-resume__hint--emphasis {
  font-style: normal;
}

button.button, button.button--secondary, button.button--primary {
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--body-font);
  font-size: calc(2em * 0.5);
  height: 2em;
  -webkit-transition: all 250ms;
  transition: all 250ms;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  width: 20ch;
  border: none;
  position: relative;
}
button.button--primary {
  --button--background--primary: var(--primary-11);
  --button--color--primary: white;
  --button--shadow--primary: var(--gray-6);
  --button--shadow--primary--active: var(--gray-6);
  color: var(--button--color--primary);
  background: var(--button--background--primary);
}
button.button--primary:hover::after {
  opacity: 0.8;
}
button.button--primary::after {
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
  -webkit-box-shadow: 0 2px 4px rgb(87 107 138/24%);
          box-shadow: 0 2px 4px rgb(87 107 138/24%);
}
button.button--primary:hover {
  -webkit-filter: brightness(1.1);
          filter: brightness(1.1);
}
button.button--primary:active {
  -webkit-box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
          box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
}
button.button--secondary {
  --button--background--secondary: var(--gray-1);
  --button--color--secondary: var(--gray-11);
  --button--shadow--secondary: inset 0px 0px 0px 1px var(--gray-6);
  --button--shadow--secondary--active: inset 0px 0px 0px 1px blue;
  background-color: var(--button--background--secondary);
  color: var(--button--color--secondary);
  -webkit-box-shadow: var(--button--shadow--secondary);
          box-shadow: var(--button--shadow--secondary);
}
button.button--secondary:hover::after {
  opacity: 0.8;
}
button.button--secondary::after {
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
  -webkit-box-shadow: 0 2px 4px rgb(87 107 138/24%);
          box-shadow: 0 2px 4px rgb(87 107 138/24%);
}
button.button--secondary:hover {
  -webkit-filter: brightness(0.975);
          filter: brightness(0.975);
}
button.button--secondary:active {
  -webkit-box-shadow: var(--button--shadow--secondary--active);
          box-shadow: var(--button--shadow--secondary--active);
  -webkit-filter: brightness(0.95);
          filter: brightness(0.95);
}
button.button--secondary:active::after {
  opacity: 1;
}

label {
  font-family: var(--body-font);
  font-weight: 500;
  display: block;
}

.form-field__padding {
  padding: 0.4em 0px 0.6em 0px;
}

fieldset {
  background: white;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid #cfc9c9;
  -webkit-box-shadow: 0 3px 6px rgb(87 107 138/36%);
          box-shadow: 0 3px 6px rgb(87 107 138/36%);
}`;
