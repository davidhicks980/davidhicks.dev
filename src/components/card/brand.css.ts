import { css } from 'lit';

 export const style = css`/**Took breakpoints from web.dev site for convenience...nothing super radical tho*/
:host {
  --grid-width: 30vw;
  --subtitle-font: "DM Mono", monospace;
}

.brand-grid {
  display: grid;
  grid-template-areas: "logo title   " "logo title   " "logo title   " "logo title   " "logo subtitle" "logo subtitle";
  width: var(--grid-width);
  height: calc(var(--grid-width) * 0.16);
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 1rem;
  -webkit-column-gap: 1rem;
     -moz-column-gap: 1rem;
          column-gap: 1rem;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.brand-grid__logo {
  grid-area: logo;
}
.brand-grid__title {
  grid-area: title;
}
.brand-grid__subtitle {
  grid-area: subtitle;
}
@media (max-width: 599.99px) {
  .brand-grid {
    grid-template-areas: "logo";
  }
}
@media (min-width: 600px) and (max-width: 899.99px) {
  .brand-grid {
    grid-template-areas: "logo logo" "logo logo" "title title" "title title" "subtitle subtitle";
  }
}`;
