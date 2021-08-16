import { css } from 'lit';

 export const style = css`/*
$tree-front: string.slice(#183758, 2, 10);
$tree-rear: string.slice(#245181, 2, 10);
$trees: header($tree-front, $tree-rear);
*/
.header__toolbar {
  position: sticky;
  height: var(--toolbar-height);
  border-bottom: 1px solid;
  border-color: transparent;
  top: -1px;
  max-width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  overflow: hidden;
}
@media ( min-width: 900px) {
  .header__toolbar__toggle__container {
    display: none;
  }
}
.header__toolbar__svg {
  position: absolute;
  width: 1920px;
  height: inherit;
}
.header__toolbar__svg__path {
  fill: var(--primary-11);
}
.header__toolbar__content {
  position: absolute;
  height: 90%;
  top: 0px;
  right: 3%;
  left: 3%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  z-index: 5;
  -ms-flex-line-pack: center;
      align-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.header__toolbar__content__links {
  display: inherit;
  grid-gap: 0.75rem;
  gap: 0.75rem;
}
.header__toolbar__content__section {
  color: white;
  font-size: 14pt;
}
.header__grid {
  position: sticky;
  top: calc(var(--upper-height) * -1 - 1px);
  z-index: 10;
}
.header__upper {
  height: var(--upper-height);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -ms-flex-line-pack: justify;
      align-content: space-between;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  place-content: space-between;
  max-height: var(--upper-height);
  background-image: radial-gradient(at -50%, at -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  background-image: radial-gradient(at -50% -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  padding-bottom: 20vh;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.header__upper > * {
  padding: 0vw 5vw;
}
.header__upper::after {
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  position: absolute;
  background-image: url("./icons/noise-reducedsmall.png");
  opacity: 0.2;
  -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(10%, rgba(0, 0, 0, 0)), to(black));
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 10%, black);
          mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(10%, rgba(0, 0, 0, 0)), to(black));
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 10%, black);
  pointer-events: none;
}
.header__upper__nav ::slotted(hicks-nav) {
  --nav-item--font-color: white;
  --nav-item--hover--font-color: var(--secondary-3);
  --nav-item--selected--font-color: var(--secondary-8);
}
@media ( min-width: 0px) and ( max-width: 899.99px) {
  .header__upper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: start;
    padding-top: 15vh;
  }
  .header__upper__title {
    -ms-flex-item-align: center;
        align-self: center;
  }
}
@media ( min-width: 600px) and ( max-width: 899.99px) {
  .header__upper {
    grid-gap: 10vh;
    gap: 10vh;
  }
  .header__upper__background {
    position: absolute;
  }
  .header__upper__background > svg {
    height: 100%;
    width: 100%;
  }
  .header__upper__nav {
    grid-area: nav;
  }
  .header__upper__nav ::slotted(hicks-nav) {
    --nav-item--hover--opacity: 1;
    --nav-item--hover--background-color: transparent;
    --nav-item--font-color: var(--primary-2);
    --nav-item--font-weight: 300;
    --nav-item--font-family: var(--body-font);
  }
  .header__upper__title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    grid-gap: 1rem;
    gap: 1rem;
    z-index: 1;
    grid-area: title;
  }
}
@media ( min-width: 0px) and ( max-width: 599.99px) {
  .header__upper {
    grid-gap: 25vh;
    gap: 25vh;
  }
  .header__upper__nav ::slotted(hicks-nav) {
    --nav--direction: column;
    --nav--justify-content: start;
    --nav-item--hover--text-transform: uppercase;
    --nav-item--padding: 0.2em 0.75em;
    --nav-item--font--color: white;
    --nav-item--hover--font-color: white;
    --nav-item--hover--opacity: 1;
    --nav-item--border: 2px solid var(--secondary-4);
    --nav-item--radius: 1em;
  }
  .header__upper__nav ::slotted(hicks-nav):hover::after {
    opacity: 0.8;
  }
  .header__upper__nav ::slotted(hicks-nav)::after {
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
}

.icon {
  min-width: 1rem;
  max-width: 5rem;
  width: 10vw;
  fill: #a7aef0;
  width: clamp(1rem, 10vw, 5rem);
}
.icon.is-collapsed {
  max-width: 4rem;
  width: 4rem;
}

.divider {
  border-left: 1px solid white;
  display: block;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin-left: 2px;
}

hicks-nav {
  --nav--base-color: var(--gray-12);
}

.is-hidden {
  opacity: 0;
  -webkit-transition: opacity 250ms ease;
  transition: opacity 250ms ease;
}

.is-shown {
  -webkit-transition: opacity 250ms ease;
  transition: opacity 250ms ease;
  opacity: 1;
}

@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes backgroundin {
  from {
    background-color: var(--background-color);
  }
  to {
    background-color: white;
  }
}
@keyframes backgroundin {
  from {
    background-color: var(--background-color);
  }
  to {
    background-color: white;
  }
}
@-webkit-keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fade-slide-in {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}
@keyframes fade-slide-in {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}
.animate-title--in {
  -webkit-animation-name: fade-slide-in;
          animation-name: fade-slide-in;
  -webkit-animation-iteration-count: 1;
          animation-iteration-count: 1;
  -webkit-animation-direction: forwards;
          animation-direction: forwards;
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  -webkit-animation-duration: 500ms;
          animation-duration: 500ms;
  overflow: hidden;
}`;
