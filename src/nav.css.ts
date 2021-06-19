import { css } from 'lit';

 export const style = css`/* hicks-nav */
:host {
  --nav--gap: 1vw;
  --nav--direction: "row";
  --nav--base-color: white;
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
}
.navigation__slot {
  display: contents;
}

::slotted(hicks-nav-item) {
  --nav-item--font-color: var(--nav--base-color, "white");
}`;
