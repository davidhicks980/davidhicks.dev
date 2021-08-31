import { css } from 'lit';

 export const style = css`.toolbar {
  border-bottom: 1px solid;
  border-color: transparent;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: var(--toolbar-height);
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  overflow: hidden;
  position: fixed;
  position: sticky;
  top: -1px;
}

.toolbar__right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.toolbar__right > * {
  margin: 0.5rem;
}

.toolbar__divider {
  margin: 0 0.5rem 0 0.5rem;
  border-right: 1px solid var(--primary-7);
  height: 2rem;
  width: 1px;
}
@media ( min-width: 900px) {
  .toolbar__divider {
    display: none;
  }
}

.toolbar__social {
  margin-right: 1rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--primary-4);
}

.toolbar__toggle {
  min-width: 2rem;
}
@media ( min-width: 900px) {
  .toolbar__toggle {
    display: none;
  }
}

.toolbar__svg {
  height: inherit;
  overflow: hidden;
  position: absolute;
  width: 1920px;
}
.toolbar__svg__path {
  fill: var(--primary-11);
}

.toolbar__content {
  -ms-flex-line-pack: center;
      align-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background: var(--primary-11);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  height: 90%;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  left: 0;
  padding: 0 1% 0 3%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
  -webkit-box-shadow: 5px -3px 5px 5px rgba(0,0,0,0.36078);
          box-shadow: 5px -3px 5px 5px rgba(0,0,0,0.36078);
}
.toolbar__content__links {
  display: inherit;
  grid-gap: 0.75rem;
  gap: 0.75rem;
}

.container {
  position: sticky;
  top: calc(var(--upper-height) * -1 - 1px);
  z-index: 10;
}

.upper {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background-image: -o-radial-gradient(at -50%, at -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  background-image: radial-gradient(at -50%, at -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  background-image: -o-radial-gradient(at -50% -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  background-image: radial-gradient(at -50% -2%, var(--primary-10) 31%, var(--primary-11) 74%);
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: var(--upper-height);
  max-height: var(--upper-height);
  padding-bottom: 5rem;
  -ms-flex-line-pack: space-evenly;
      align-content: space-evenly;
  -webkit-box-pack: space-evenly;
      -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
  place-content: space-evenly;
}
@media ( min-width: 0) and ( max-width: 899.99px) {
  .upper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: start;
    padding-top: 5rem;
  }
  .upper__title {
    -ms-flex-item-align: center;
        align-self: center;
  }
}
@media ( min-width: 600px) and ( max-width: 899.99px) {
  .upper {
    grid-gap: 3rem;
    gap: 3rem;
  }
  .upper__background {
    position: absolute;
  }
  .upper__background > svg {
    height: 100%;
    width: 100%;
  }
  .upper__nav {
    grid-area: nav;
  }
  .upper__title {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    grid-gap: 1rem;
    gap: 1rem;
    grid-area: title;
    z-index: 1;
  }
}
@media ( min-width: 0) and ( max-width: 599.99px) {
  .upper {
    grid-gap: 2rem;
    gap: 2rem;
  }
}

.icon {
  --header--icon-width: clamp(1rem, 3rem, 5rem);
  fill: #a7aef0;
  max-width: 5rem;
  min-width: 1rem;
  width: 5rem;
  width: 3rem;
  width: var(--header--icon-width, 3rem);
}
.icon.is-collapsed {
  max-width: 4rem;
  width: 4rem;
}

hicks-nav {
  --nav--base-color: var(--gray-12);
}

.is-hidden {
  opacity: 0;
  -webkit-transition: opacity 250ms ease;
  -o-transition: opacity 250ms ease;
  transition: opacity 250ms ease;
}

.is-shown {
  opacity: 1;
  -webkit-transition: opacity 250ms ease;
  -o-transition: opacity 250ms ease;
  transition: opacity 250ms ease;
}`;
