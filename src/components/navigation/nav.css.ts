import { css } from 'lit';

 export const style = css`/* hicks-nav */
:host {
  --nav--direction: row;
  --nav--direction-breakpoint: 600px;
  --nav-item--background-color: transparent;
  --nav-item--font-color: #fff;
  --nav-item--font-size: 1.35em;
  --nav-item--font-weight: 300;
  --nav-item--font-family: sans-serif;
  --nav-item--border: none;
  --nav-item--hover--opacity: 0.7;
  --nav-item--selected--font-color: var(--secondary-8);
  display: block;
}

.navigation {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: var(--nav--direction);
          flex-direction: var(--nav--direction);
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.navigation__slot {
  display: contents;
}

:host(:hover) hicks-nav-item {
  opacity: var(--nav-item--hover--opacity);
}

:host(:hover) hicks-nav-item:hover {
  opacity: 1;
}`;
