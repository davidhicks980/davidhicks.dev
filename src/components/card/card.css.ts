import { css } from 'lit';

 export const style = css`/**Took breakpoints from web.dev site for convenience...nothing super radical tho*/
:host {
  border-radius: 4px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-transition: -webkit-box-shadow 0.5s;
  transition: -webkit-box-shadow 0.5s;
  transition: box-shadow 0.5s;
  transition: box-shadow 0.5s, -webkit-box-shadow 0.5s;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-3);
  height: 150px;
  max-height: 200px;
  min-width: 150px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
}
:host:hover::after {
  opacity: 0.8;
}
:host::after {
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

p ::slotted(*) {
  font-size: 10pt;
  font-weight: 400;
}

h1 ::slotted(*) {
  font-size: 24pt;
  font-weight: 400;
  margin: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}`;
