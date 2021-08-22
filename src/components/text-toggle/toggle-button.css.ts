import { css } from 'lit';

 export const style = css`:host([aria-pressed=true]),:host([aria-pressed=false]){border-radius:3px;font-weight:500;cursor:pointer;font-family:var(--body-font);-ms-touch-action:manipulation;touch-action:manipulation;border:none;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:2em;-webkit-box-align:center;-ms-flex-align:center;align-items:center}:host([aria-pressed=false]){--button--background--secondary: linear-gradient( var(--gray-0), var(--gray-1) );--button--color--secondary: var(--gray-11);--button--shadow--secondary: inset 0px 0px 0px 1px var(--gray-4);--button--shadow--secondary--active: inset 0px 0px 0px 1px blue;background-image:var(--button--background--secondary);color:var(--button--color--secondary);-webkit-box-shadow:var(--button--shadow--secondary);box-shadow:var(--button--shadow--secondary)}:hover:host([aria-pressed=false])::after{opacity:.8}:host([aria-pressed=false])::after{content:"";position:absolute;z-index:0;top:0;left:0;width:100%;height:100%;opacity:0;border-radius:inherit;-webkit-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;pointer-events:none;margin:0px;-webkit-box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07)}:hover:host([aria-pressed=false]){-webkit-filter:brightness(0.975);filter:brightness(0.975)}:active:host([aria-pressed=false]){-webkit-box-shadow:var(--button--shadow--secondary--active);box-shadow:var(--button--shadow--secondary--active);-webkit-filter:brightness(0.95);filter:brightness(0.95)}:active:host([aria-pressed=false])::after{opacity:1}:host([aria-pressed=true]){--button--background--tertiary: var(--secondary-2);--button--color--tertiary: var(--secondary-12);--button--shadow--tertiary: inset 0px 0px 0px 1px var(--secondary-8);--button--shadow--tertiary--active: inset 0px 0px 0px 1px blue;background-color:var(--button--background--tertiary);color:var(--button--color--tertiary);-webkit-box-shadow:var(--button--shadow--tertiary);box-shadow:var(--button--shadow--tertiary)}:hover:host([aria-pressed=true])::after{opacity:.8}:host([aria-pressed=true])::after{content:"";position:absolute;z-index:0;top:0;left:0;width:100%;height:100%;opacity:0;border-radius:inherit;-webkit-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;pointer-events:none;margin:0px;-webkit-box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07)}:hover:host([aria-pressed=true]){-webkit-filter:brightness(0.975);filter:brightness(0.975)}:active:host([aria-pressed=true]){-webkit-box-shadow:var(--button--shadow--tertiary--active);box-shadow:var(--button--shadow--tertiary--active);-webkit-filter:brightness(0.95);filter:brightness(0.95)}:active:host([aria-pressed=true])::after{opacity:1}:host{width:20ch;font-size:1rem;text-shadow:0px 0px 2px var(--secondary-14)}:host([aria-pressed=true]){background-image:-webkit-gradient(linear, left top, left bottom, from(var(--secondary-3)), to(var(--secondary-1)));background-image:linear-gradient(var(--secondary-3), var(--secondary-1))}`;
