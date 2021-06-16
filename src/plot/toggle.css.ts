import { css } from 'lit';

 export const style = css`/** Block Element
* @access public
* @param {String} $element - Element's name
*/
.toggle {
  font-family: var(--title-font), Helvetica, sans-serif;
  color: #858585;
  text-align: left;
  font-size: 9pt;
  -webkit-text-stroke: #868686;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  text-transform: capitalize;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  grid-gap: 1em;
  gap: 1em;
}
.toggle:hover {
  -webkit-transition: 0.2s;
  transition: 0.2s;
  color: black;
}
.toggle[focus-within] {
  outline: 2px dashed black;
  outline-offset: 3px;
}
.toggle:focus-within {
  outline: 2px dashed black;
  outline-offset: 3px;
}
.toggle__label {
  position: relative;
  display: block;
  width: 2.8em;
  height: 1.4em;
  margin-left: 0.2em;
  cursor: pointer;
  background-color: #cccccc;
  -webkit-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -webkit-box-shadow: grey 0px 0px 0px 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
          box-shadow: grey 0px 0px 0px 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
  border-radius: 10px;
}
.toggle__label::before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e9e9e9));
  background-image: linear-gradient(#f6f6f6, #e9e9e9);
  -webkit-transition: -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -webkit-box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.514);
          box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.514);
  border: 1px solid gray;
  border-radius: 50%;
  top: -0.1em;
}
.toggle__label.is-toggled {
  background-color: var(--primary-5);
  -webkit-box-shadow: grey 0px 0px 0px 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
          box-shadow: grey 0px 0px 0px 1px inset, rgba(63, 63, 63, 0.2) 1px 2px 4px inset;
}
.toggle__label.is-toggled::before {
  -webkit-transform: translateX(1.3em);
          transform: translateX(1.3em);
}
.toggle__label__thumb {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-box-shadow: 1px 2px 4px inset rgba(63, 63, 63, 0.2);
          box-shadow: 1px 2px 4px inset rgba(63, 63, 63, 0.2);
  -webkit-transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  -webkit-box-shadow: inset 0 0 0 1px gray, 1px 2px 4px inset rgba(63, 63, 63, 0.2);
          box-shadow: inset 0 0 0 1px gray, 1px 2px 4px inset rgba(63, 63, 63, 0.2);
  border-radius: 10px;
}
.toggle__label__input {
  opacity: 0;
  width: 4.5em;
  height: 3em;
  position: absolute;
  top: -2em;
  left: -1.4em;
}`;
