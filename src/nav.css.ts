import { css } from 'lit';

 export const style = css`/* hicks-nav */
:host {
  --nav--gap: 1vw;
  --nav--direction: row;
  --nav--direction-breakpoint: 600px;
  --nav--base-color: white;
  --nav--text-transform: none;
  --nav--font-size: 1.2rem;
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
  text-transform: var(--nav--text-transform);
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.navigation__slot {
  display: contents;
}

::slotted(hicks-nav-item) {
  --nav-item--font-color: var(--nav--base-color, "white");
  --nav-item--font-size: var(--nav--font-size);
}`;
