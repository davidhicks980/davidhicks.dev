import { css } from 'lit';

 export const style = css`input,
textarea {
  padding: 0.5em;
  font-size: 12pt;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid var(--gray-9);
}
input[type=text], input[type=email],
textarea[type=text],
textarea[type=email] {
  font-size: 12pt;
  max-width: 30ch;
  caret-color: blue;
  grid-column: 3/4;
}
input[type=checkbox],
textarea[type=checkbox] {
  height: 1rem;
  width: 1rem;
  grid-column: 3/4;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: var(--gray-8);
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: var(--gray-8);
}
input::-moz-placeholder, textarea::-moz-placeholder {
  color: var(--gray-8);
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: var(--gray-8);
}
input::-ms-input-placeholder, textarea::-ms-input-placeholder {
  color: var(--gray-8);
}
input::placeholder,
textarea::placeholder {
  color: var(--gray-8);
}
input:hover,
textarea:hover {
  background-color: var(--gray-1);
}

label {
  width: 20ch;
}

textarea {
  min-height: 200px;
}

.full-width {
  width: 100%;
  grid-column: 1/4;
}

button {
  margin: 1rem 0rem;
  padding: 0.25em 0.5em;
  border-radius: 3px;
}

.form-container {
  display: grid;
  grid-template-columns: 20ch auto;
  grid-row-gap: 1rem;
  row-gap: 1rem;
  max-width: 900px;
}
:host([mobile]) .form-container {
  grid-template-columns: 100%;
  width: 100%;
}

abbr[title=required] {
  all: unset;
  color: red;
}

.button-container {
  width: 100%;
}

/* CSS */
button {
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--body-font);
  font-size: 1rem;
  height: 2.5em;
  -webkit-transition: all 250ms;
  transition: all 250ms;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  width: 20ch;
  border: none;
  position: relative;
}
button.primary {
  color: white;
  background-color: var(--primary-9);
}
button.primary:hover::after {
  opacity: 0.8;
}
button.primary::after {
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
button.primary:hover {
  -webkit-filter: brightness(1.1);
          filter: brightness(1.1);
}
button.primary:active {
  -webkit-box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
          box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.26);
}
button.secondary {
  background-color: var(--gray-1);
  color: var(--gray-11);
  -webkit-box-shadow: inset 0px 0px 0px 1px var(--gray-6);
          box-shadow: inset 0px 0px 0px 1px var(--gray-6);
  border: 1px solid gray;
}
button.secondary:hover::after {
  opacity: 0.8;
}
button.secondary::after {
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
button.secondary:hover {
  background-color: var(--gray-2);
}
button.secondary:active {
  -webkit-box-shadow: inset 0px 0px 0px 1px blue;
          box-shadow: inset 0px 0px 0px 1px blue;
}

:host {
  max-width: 1200px;
}`;
