import { css } from 'lit';

 export const style = css`:host {
  --primary--light: var(--primary-5);
  --primary: var(--primary-7);
  --primary--light--transparent: var(--primary-2);
  --font: sans-serif;
  --font-color: var(--gray-6);
}

.range {
  background-image: -webkit-gradient(linear, left top, right top, from(var(--primary--light)), color-stop(100%, var(--primary)), to(white));
  background-image: linear-gradient(to right, var(--primary--light) 0%, var(--primary) 100%, white 100%);
  background-repeat: no-repeat;
  -webkit-transition-property: none !important;
  transition-property: none !important;
  -webkit-transform: none !important;
          transform: none !important;
  -webkit-animation: none !important;
          animation: none !important;
  border: 1px solid var(--gray-5);
  border-radius: 3px;
  height: 0.7em;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  -webkit-box-shadow: 1px 1px 4px 1px inset rgba(63, 63, 63, 0.1);
          box-shadow: 1px 1px 4px 1px inset rgba(63, 63, 63, 0.1);
  position: relative;
  outline: none;
  width: 100%;
}
.range * {
  font: var(--font);
  color: var(--font-color);
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
          appearance: none;
  width: 1.4em;
  height: 1.4em;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e9e9e9));
  background-image: linear-gradient(#f6f6f6, #e9e9e9);
  border-radius: 50%;
  border: 1px solid gray;
  -webkit-box-shadow: rgba(63, 63, 63, 0.5) 0px 1px 1px 0px;
          box-shadow: rgba(63, 63, 63, 0.5) 0px 1px 1px 0px;
}
.range::-webkit-slider-thumb:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(#dfdfdf), to(#e9e9e9));
  background-image: linear-gradient(#dfdfdf, #e9e9e9);
}
.range::-webkit-slider-thumb:hover {
  -webkit-box-shadow: 0 0 0 3px var(--primary--light--transparent);
          box-shadow: 0 0 0 3px var(--primary--light--transparent);
}
.range::-moz-slider-thumb {
  -moz-appearance: none;
       appearance: none;
  width: 1.4em;
  height: 1.4em;
  background-image: linear-gradient(#f6f6f6, #e9e9e9);
  border-radius: 50%;
  border: 1px solid gray;
  box-shadow: rgba(63, 63, 63, 0.5) 0px 1px 1px 0px;
  height: 2em;
  width: 2em;
}
.range::-moz-slider-thumb:active {
  background-image: linear-gradient(#dfdfdf, #e9e9e9);
}
.range::-moz-slider-thumb:hover {
  box-shadow: 0 0 0 3px var(--primary--light--transparent);
}
.range::-ms-thumb {
  appearance: none;
  width: 1.4em;
  height: 1.4em;
  background-image: linear-gradient(#f6f6f6, #e9e9e9);
  border-radius: 50%;
  border: 1px solid gray;
  box-shadow: rgba(63, 63, 63, 0.5) 0px 1px 1px 0px;
}
.range::-ms-thumb:active {
  background-image: linear-gradient(#dfdfdf, #e9e9e9);
}
.range::-ms-thumb:hover {
  box-shadow: 0 0 0 3px var(--primary--light--transparent);
}

.range::-ms-track {
  height: 1rem;
  width: 97%;
}

/**Slider Containers*/
.range-container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-self: center;
  justify-self: center;
  place-self: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 85%;
  padding: 0% 7.5%;
}

.range-container[focus-within] {
  outline: 2px dashed rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.range-container:focus-within {
  outline: 2px dashed rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.value-label {
  grid-column: 2/3;
}

.name-label {
  grid-column: 1/2;
  text-transform: capitalize;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.slider-container {
  grid-column: 1/3;
}

/**Responsive*/`;
