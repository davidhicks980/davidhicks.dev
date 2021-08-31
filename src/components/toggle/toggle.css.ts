import { css } from 'lit';

 export const style = css`.icon-button {
  background: none;
  border: none;
  display: block;
}

.icon-button {
  display: block;
  line-height: 0px;
  opacity: 1;
  padding: 0;
  position: relative;
  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);
  -webkit-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  -o-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  outline: none;
}
.icon-button::before {
  background-color: var(--icon-button--background);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  content: "";
  display: block;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  -webkit-transform: scale(1.35);
      -ms-transform: scale(1.35);
          transform: scale(1.35);
  -webkit-transform-origin: center;
      -ms-transform-origin: center;
          transform-origin: center;
  -webkit-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  -o-transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  transition: 250ms cubic-bezier(0.175, 0.885, 0.32, 1);
  -webkit-transition-property: opacity transform;
  -o-transition-property: opacity transform;
  transition-property: opacity transform;
  width: 100%;
}
.icon-button:hover::before {
  opacity: 0.3;
  -webkit-transform: scale(1.35);
      -ms-transform: scale(1.35);
          transform: scale(1.35);
}
.icon-button:hover:active::before {
  border: 1px solid var(--icon-button--active-outline);
  opacity: 0.6;
  -webkit-transform: scale(1.65);
      -ms-transform: scale(1.65);
          transform: scale(1.65);
}
.icon-button:active::before {
  border: 1px solid var(--icon-button--active-outline);
  opacity: 0.6;
  -webkit-transform: scale(1.65);
      -ms-transform: scale(1.65);
          transform: scale(1.65);
}
.icon-button:hover:focus::before {
  border: 1px solid var(--icon-button--outline);
  opacity: 0.6;
}
.icon-button:active::before {
  opacity: 0.3;
  -webkit-transform: scale(1.65);
      -ms-transform: scale(1.65);
          transform: scale(1.65);
  border: 1px solid var(--icon-button--active-outline);
}
.icon-button:focus::before {
  opacity: 0.6;
  border: 1px solid var(--icon-button--outline);
}

:host {
  --icon-button--background: rgba(255, 255, 255, 0.3);
  --icon-button--outline: rgba(255, 255, 255, 0.5);
  --icon-button--active-outline: rgba(255, 255, 255, 1);
  --icon-toggle--height: 2rem;
  --icon-toggle--width: 2rem;
  height: var(--icon-toggle--height);
  scroll-behavior: none;
  width: var(--icon-toggle--width);
  outline: none;
}`;
