import { css } from 'lit';

 export const style = css`.unlock-resume__input-wrapper {
  padding: 1.5rem 0px;
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
  -webkit-box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07);
}

input {
  padding: 0.5em;
  font-size: 12pt;
  font-family: var(--body-font);
  border-radius: 3px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid var(--gray-9);
  width: 100%;
}
input[type=text] {
  font-size: 12pt;
  width: 100%;
  caret-color: var(--primary-9);
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
  font-size: calc(2rem * 0.5);
  height: 2rem;
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
  -webkit-box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);
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
  -webkit-box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);
          box-shadow: 0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);
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

.button[type=submit], button[type=submit].button--primary, button[type=submit].button--secondary {
  width: 100%;
}

label {
  font-family: var(--body-font);
  font-weight: 500;
}

form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

fieldset {
  background: white;
  border-radius: 5px;
  border: 1px solid var(--gray-3);
  max-width: 400px;
  width: 100%;
  display: grid;
  grid-template-rows: 1rem 2.5rem 2rem 2rem;
  grid-gap: 1rem;
  gap: 1rem;
  padding: 1.25rem;
}

@-webkit-keyframes rotate-el {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes rotate-el {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate-el-parent {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate-el-parent {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.loading-parent {
  -webkit-animation: 1s ease-in-out infinite running rotate-el-parent;
          animation: 1s ease-in-out infinite running rotate-el-parent;
  height: 1.5rem;
  width: 1.5rem;
}

.loading {
  -webkit-animation: 3s ease-in-out 0s infinite normal none running rotate-el;
          animation: 3s ease-in-out 0s infinite normal none running rotate-el;
  -webkit-transform-origin: center;
          transform-origin: center;
  fill: var(--secondary-8);
}

.loading-reverse {
  -webkit-animation: 2s linear 0s infinite none running rotate-el;
          animation: 2s linear 0s infinite none running rotate-el;
  -webkit-transform-origin: center;
          transform-origin: center;
  fill: var(--primary-8);
}

.unlock-resume__message {
  color: var(--primary-10);
  font-weight: 500;
  font-family: var(--title-font);
  font-size: 1.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  justify-items: center;
}`;
