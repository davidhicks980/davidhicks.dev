import { css } from 'lit';

 export const style = css`:host{--expand-card--content-font: sans-serif;--expand-card--header-font: sans-serif;--expand-card--padding: 1rem;display:block;opacity:1;-webkit-transition:opacity 1s ease;-o-transition:opacity 1s ease;transition:opacity 1s ease}.header{padding:0 1rem;padding:0 var(--expand-card--padding, 1rem)}@media( min-width: 0)and ( max-width: 899.99px){.header{border-radius:7px 7px 0 0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:var(--primary-11);display:-webkit-box;display:-ms-flexbox;display:flex;grid-gap:1em;gap:1em;margin:0}.header__title{font-size:18pt}.header::before{background-image:var(--panel--image);background-origin:50% 50%;background-position:center;background-repeat:no-repeat;background-size:var(--panel--icon--size);content:" ";display:inline-block;height:2.5em;position:relative;width:2.5em}}.header ::slotted([slot=header]){color:var(--gray-12);display:content;font-family:var(--expand-card--header-font);font-size:22pt;font-weight:400;margin:0;margin-top:0;margin-bottom:0}@media( min-width: 0)and ( max-width: 899.99px){.header ::slotted([slot=header]){color:var(--primary-3);font-weight:600;letter-spacing:1px;text-shadow:#183758 0 1px 0}}.expansion{all:unset;background-color:#fff;border-radius:7px;-webkit-box-shadow:0 0 0 1px var(--gray-2);box-shadow:0 0 0 1px var(--gray-2);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-filter:brightness(1);filter:brightness(1);grid-gap:1em;gap:1em;text-align:left}.expansion:hover::after{opacity:.8}.expansion::after{-webkit-box-shadow:0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07),0px 0 8px 8px  rgba(55, 64, 71, 0.07);box-shadow:0px 0 2px 2px  rgba(55, 64, 71, 0.07),0px 0 4px 4px  rgba(55, 64, 71, 0.07),0px 0 8px 8px  rgba(55, 64, 71, 0.07);border-radius:inherit;content:"";height:100%;left:0;margin:0;opacity:0;pointer-events:none;position:absolute;top:0;-webkit-transition:opacity .3s ease-in-out;-o-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;width:100%;z-index:0}@media( min-width: 0)and ( max-width: 899.99px){.expansion{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}:host(:hover) .expansion{-webkit-box-shadow:0 0 0 1px var(--gray-1);box-shadow:0 0 0 1px var(--gray-1)}:host(:not([collapsed])) .expansion{border-bottom-right-radius:0}@media( min-width: 0)and ( max-width: 899.99px){:host(:not([collapsed])) .expansion{border-radius:0 0 0px 0px}}.content{border-radius:0 7px 7px 0;background:#fff;color:var(--gray-8);max-height:inherit;overflow:auto}@media( min-width: 0)and ( max-width: 899.99px){.content{border-radius:7px}}:host(:not([collapsed])) .content{border-bottom-right-radius:0}.content__padding{padding:.5rem}.ruler{border:2px solid var(--primary-8);border-width:2px 0 0;margin-left:var(--expand-card--padding);width:3em}@media( min-width: 0)and ( max-width: 899.99px){.ruler{margin:0;width:100%}}.panel{border-radius:0 0 8px 8px;background-color:var(--primary-8);font-family:var(--body-font);opacity:1;padding:10px;-webkit-transform:scale(1) translateY(0);-ms-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transition:opacity 250ms ease-out,-webkit-transform 350ms ease-out;transition:opacity 250ms ease-out,-webkit-transform 350ms ease-out;-o-transition:transform 350ms ease-out,opacity 250ms ease-out;transition:transform 350ms ease-out,opacity 250ms ease-out;transition:transform 350ms ease-out,opacity 250ms ease-out,-webkit-transform 350ms ease-out;visibility:visible;height:auto;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.panel__padding{background:#f2f2f2;border-radius:7px;padding:10px}:host([collapsed]:not(.is-expanding)) .panel,:host(.is-collapsing) .panel{opacity:0;-webkit-transform:scale(0.5) translateY(150px);-ms-transform:scale(0.5) translateY(150px);transform:scale(0.5) translateY(150px);visibility:hidden}:host([collapsed]:not(.is-expanding)) .panel{height:0px;padding:0px}.footer{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:0 var(--expand-card--padding)}@media( min-width: 0)and ( max-width: 899.99px){.footer{border-radius:7px;padding:1rem}}@media( min-width: 0)and ( max-width: 599.99px){.footer{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.footer__icons{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;grid-gap:.5rem;gap:.5rem;width:100%}.footer__icons ::slotted([slot=icon]){border:1px solid var(--primary-5);-webkit-filter:grayscale(1);filter:grayscale(1);max-height:2rem;padding:.5rem}.footer__icons:hover{-webkit-filter:grayscale(0);filter:grayscale(0)}.footer__icons ::slotted([slot=icon]:hover){-webkit-filter:grayscale(0);filter:grayscale(0)}.footer__button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding:1rem}p{margin-right:1em}.body{--panel--max-height: 200px;max-height:var(--panel--max-height);min-height:100px;overflow:auto;padding:0 var(--expand-card--padding)}.button--text{all:unset;border-radius:5px;color:var(--primary-10);cursor:pointer;font-family:var(--expand-card--content-font);font-weight:500;margin:1em;min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;padding:.75em 1em}.button--text:hover{background-color:var(--primary-4)}.button--text:active{background-color:var(--primary-6);-webkit-box-shadow:inset 0 0 0 1px var(--primary-10);box-shadow:inset 0 0 0 1px var(--primary-10)}.button--text:focus{-webkit-box-shadow:inset 0 0 0 1px var(--primary-8);box-shadow:inset 0 0 0 1px var(--primary-8)}.img{border-radius:7px 0 0 7px;background-color:var(--primary-10);background-image:var(--panel--image);background-position:center;background-repeat:no-repeat;background-size:var(--panel--image--size);height:inherit;-webkit-transition:background-size 500ms ease,-webkit-filter 500ms ease-in-out;transition:background-size 500ms ease,-webkit-filter 500ms ease-in-out;-o-transition:background-size 500ms ease,filter 500ms ease-in-out;transition:background-size 500ms ease,filter 500ms ease-in-out;transition:background-size 500ms ease,filter 500ms ease-in-out,-webkit-filter 500ms ease-in-out;min-width:120px}@media( min-width: 0)and ( max-width: 899.99px){.img{border-radius:7px;display:none}}:host(:not([collapsed])) .img{border-bottom-left-radius:0}p ::slotted([slot=description]){color:var(--gray-10);font:11pt;font-family:var(--expand-card--content-font)}`;
