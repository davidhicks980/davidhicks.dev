import { css } from 'lit';

 export const style = css`:host {
  cursor: pointer;
}

.toggle {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  color: var(--gray-8);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  font-family: var(--title-font), Helvetica, sans-serif;
  font-size: 9pt;
  grid-gap: 1em;
  gap: 1em;
  text-align: left;
  -webkit-text-stroke: #868686;
  text-transform: capitalize;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
.toggle:hover {
  color: #000;
  -webkit-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
}
.toggle[focus-within] {
  outline: 2px dashed #000;
  outline-offset: 3px;
}
.toggle:focus-within {
  outline: 2px dashed #000;
  outline-offset: 3px;
}

.toggle__label {
  background-color: #cccccc;
  border-radius: 10px;
  -webkit-box-shadow: grey 0 0 0 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
          box-shadow: grey 0 0 0 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
  display: block;
  height: 1.4em;
  margin-left: 0.2em;
  position: relative;
  -webkit-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -o-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  width: 2.8em;
}
.toggle__label::before {
  background-image: -o-linear-gradient(#f6f6f6, #e9e9e9);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e9e9e9));
  background-image: linear-gradient(#f6f6f6, #e9e9e9);
  border: 1px solid var(--gray-7);
  border-radius: 50%;
  -webkit-box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.514);
          box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.514);
  content: "";
  height: 1.4em;
  position: absolute;
  top: -0.1em;
  -webkit-transition: -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -o-transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  width: 1.4em;
}
.toggle__label.is-toggled {
  background-color: var(--primary-5);
  -webkit-box-shadow: var(--gray-5) 0 0 0 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
          box-shadow: var(--gray-5) 0 0 0 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
}
.toggle__label.is-toggled::before {
  -webkit-transform: translateX(1.3em);
      -ms-transform: translateX(1.3em);
          transform: translateX(1.3em);
}
.toggle__label__thumb {
  background-color: #ccc;
  border-radius: 10px;
  bottom: 0;
  -webkit-box-shadow: 1px 2px 4px inset rgba(63, 63, 63, 0.2);
          box-shadow: 1px 2px 4px inset rgba(63, 63, 63, 0.2);
  -webkit-box-shadow: inset 0 0 0 1px gray, 1px 2px 4px inset rgba(63, 63, 63, 0.2);
          box-shadow: inset 0 0 0 1px gray, 1px 2px 4px inset rgba(63, 63, 63, 0.2);
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -o-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
}
.toggle__label__input {
  height: 3em;
  left: -1.4em;
  opacity: 0;
  position: absolute;
  top: -2em;
  width: 4.5em;
}`;
