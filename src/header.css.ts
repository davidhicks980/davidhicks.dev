import { css } from 'lit';

 export const style = css`/** Block Element
* @access public
* @param {String} $element - Element's name
*/
.header__toolbar {
  position: sticky;
  top: 0px;
  width: 100%;
  height: 15vh;
}
.header__toolbar__svg {
  position: relative;
  height: inherit;
  width: inherit;
}
.header__grid {
  position: sticky;
  top: calc(var(--upper-height) * -1);
  width: 100%;
  max-width: 1920px;
}
.header__navigation {
  border-radius: 5px;
  color: white;
  pointer-events: all;
  -ms-touch-action: all;
      touch-action: all;
}
.header__navigation__link {
  margin: 5px;
  color: white;
}
.header__navigation__link:hover {
  background-color: lightcoral;
  padding: 5px;
  pointer-events: all;
  -ms-touch-action: all;
      touch-action: all;
}
.header__upper {
  height: var(--upper-height);
  background-color: var(--background-color);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -ms-flex-pack: distribute;
      justify-content: space-around;
  padding: 1rem;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  max-height: var(--upper-height);
}
@media screen and (max-width: 599.99px) {
  .header__upper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    justify-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }
}
.header__title-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  max-height: 10vh;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  grid-gap: 1rem;
  gap: 1rem;
  -webkit-box-flex: 0;
      -ms-flex: 0 1 50%;
          flex: 0 1 50%;
  z-index: 1;
}
.header__title__icon {
  min-width: 1rem;
  max-width: 5.5rem;
  width: 10vw;
  fill: #a7aef0;
  width: clamp(1rem, 10vw, 5.5rem);
}

.gradientstop-1 {
  stop-color: var(--background-color);
}

.gradientstop-2 {
  stop-color: var(--background-color);
}

.gradientstop-3 {
  stop-color: var(--background-color);
}

.gradientstop-4 {
  stop-color: var(--background-color);
}

.gradientstop-5 {
  stop-color: var(--background-color);
}`;
