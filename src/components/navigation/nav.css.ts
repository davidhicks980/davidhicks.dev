import { css } from 'lit';

 export const style = css`/* hicks-nav */
:host {
  --nav--gap: 2vw;
  --nav--direction: row;
  --nav--direction-breakpoint: 600px;
  --nav--height: 2.25rem;
  --nav--item--background-color: transparent;
  --nav--item--font-color: black;
  --nav--item--font-size: 1em;
  --nav--item--border: none;
  --nav--item--font-weight: 500;
  --nav--item--hover--opacity: 0.6;
  --nav--item--selected--font-color: black;
  --nav--item--hover--text-transform: underline;
}

.navigation {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: var(--nav--direction);
          flex-direction: var(--nav--direction);
  grid-gap: var(--nav--gap);
  gap: var(--nav--gap);
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  height: var(--nav--height);
}
.navigation__slot {
  display: contents;
}

:host(:hover) ::slotted(hicks-nav-item) {
  opacity: var(--nav--item--hover--opacity);
}

:host(:hover) ::slotted(hicks-nav-item:hover) {
  opacity: 1;
}`;