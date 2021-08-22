import { css } from 'lit';

 export const style = css`@-webkit-keyframes rotate-el{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-el{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes rotate-el-parent{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-el-parent{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.icon-dimensions{height:1.5rem;height:var(--status--icon-height, 1.5rem);width:1.5rem;width:var(--status--icon-width, 1.5rem);min-width:1.5rem;min-height:1.5rem}.loading-parent{-webkit-animation:1s ease-in-out infinite running rotate-el-parent;animation:1s ease-in-out infinite running rotate-el-parent}.loading{-webkit-animation:3s ease-in-out 0s infinite normal none running rotate-el;animation:3s ease-in-out 0s infinite normal none running rotate-el;-webkit-transform-origin:center;transform-origin:center;fill:var(--secondary-8)}.loading-reverse{-webkit-animation:2s linear 0s infinite none running rotate-el;animation:2s linear 0s infinite none running rotate-el;-webkit-transform-origin:center;transform-origin:center;fill:var(--status-color)}@-webkit-keyframes stroke{100%{stroke-dashoffset:0}}@keyframes stroke{100%{stroke-dashoffset:0}}.checkmark{display:block;stroke-width:4;stroke:var(--status-color);stroke-miterlimit:20;-webkit-animation:fill .4s ease-in-out .4s forwards,.9s both;animation:fill .4s ease-in-out .4s forwards,.9s both}.checkmark__check{-webkit-transform-origin:50% 50%;transform-origin:50% 50%;stroke-dasharray:48;stroke-dashoffset:48;-webkit-animation:stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;animation:stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards}.status-container{color:var(--status-color);font-weight:500;font-family:var(--title-font);font-size:1rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:.6rem;border:1px solid;background:var(--status-background);grid-gap:1rem;gap:1rem;margin:2.5rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host([status="0"]){--status-color: var(--primary-10);--status-background: var(--primary-1)}:host([status="1"]){--status-color: var(--complement-10);--status-background: var(--complement-1)}:host([status="2"]){--status-color: var(--primary-10);--status-background: var(--primary-1)}:host([status="3"]){--status-color: var(--secondary-10);--status-background: var(--secondary-1)}@-webkit-keyframes warning{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes warning{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}.warning{-webkit-animation:warning .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;animation:warning .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards}`;
