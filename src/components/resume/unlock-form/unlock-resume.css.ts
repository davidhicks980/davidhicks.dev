import { css } from 'lit';

 export const style = css`button{border-radius:3px;font-weight:500;cursor:pointer;font-family:var(--body-font);-ms-touch-action:manipulation;touch-action:manipulation;border:none;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:2em;-webkit-box-align:center;-ms-flex-align:center;align-items:center}button{--button--background--primary: var(--primary-11);--button--color--primary: white;--button--shadow--primary: var(--gray-6);--button--shadow--primary--active: var(--gray-6);color:var(--button--color--primary);background:var(--button--background--primary)}button:hover::after{opacity:.8}button::after{content:"";position:absolute;z-index:0;top:0;left:0;width:100%;height:100%;opacity:0;border-radius:inherit;-webkit-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;pointer-events:none;margin:0px;-webkit-box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07);box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07)}button:hover{-webkit-filter:brightness(1.1);filter:brightness(1.1)}button:active{-webkit-box-shadow:inset 0px 1px 2px 2px rgba(0,0,0,.26);box-shadow:inset 0px 1px 2px 2px rgba(0,0,0,.26)}fieldset{background-color:var(--gray-0);padding:1.25em;border-radius:.25rem;border:1px solid var(--gray-4)}input{padding:.5em;font-size:12pt;font-family:var(--body-font),system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;border-radius:3px;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid var(--gray-6);caret-color:var(--primary-8);-webkit-transition-property:background-color outline-color;transition-property:background-color outline-color;-webkit-transition:300ms ease-in-out;transition:300ms ease-in-out;outline-color:var(--gray-6);background-color:#fff}input::-webkit-input-placeholder{color:var(--gray-8)}input::-moz-placeholder{color:var(--gray-8)}input:-ms-input-placeholder{color:var(--gray-8)}input::-ms-input-placeholder{color:var(--gray-8)}input::placeholder{color:var(--gray-8)}input:hover{background-color:#fff}input:focus{outline-color:var(--primary-8)}.unlock-resume__input-wrapper{padding:1.5rem 0px}:host:hover::after{opacity:.8}:host::after{content:"";position:absolute;z-index:0;top:0;left:0;width:100%;height:100%;opacity:0;border-radius:inherit;-webkit-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;pointer-events:none;margin:0px;-webkit-box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07);box-shadow:0px 0px 2px 2px  rgba(55, 64, 71, 0.07),0px 0px 4px 4px  rgba(55, 64, 71, 0.07),0px 0px 8px 8px  rgba(55, 64, 71, 0.07)}input[type=text]{font-size:1.15rem;width:100%;caret-color:var(--primary-9);-webkit-text-security:disc}input::-webkit-input-placeholder{color:var(--gray-8)}input::-moz-placeholder{color:var(--gray-8)}input:-ms-input-placeholder{color:var(--gray-8)}input::-ms-input-placeholder{color:var(--gray-8)}input::placeholder{color:var(--gray-8)}input:hover{background-color:var(--gray-0)}.unlock-resume__hint{font-size:9pt;color:var(--gray-9)}.unlock-resume__hint--emphasis{font-style:normal}button{font-size:1.15rem}.button[type=submit]{width:100%}label{font-family:var(--body-font);font-weight:500;color:var(--gray-9)}form{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}fieldset{max-width:400px;display:grid;grid-template-rows:1rem 2.5rem 2rem 2rem;grid-gap:1rem;gap:1rem}`;