import { css } from 'lit';

 export const style = css`/**Took breakpoints from web.dev site for convenience...nothing super radical tho*/
:host {
  --grid-width: clamp(360px, 40vw, 460px);
  --subtitle-font: "DM Mono", monospace;
  --brand--font-color: #232b33;
  --brand--logo-color: navy;
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
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.brand-grid__logo {
  grid-area: logo;
}
.brand-grid__logo logo-component {
  --logo--fill: var(--primary-12);
}
.brand-grid__title {
  grid-area: title;
}
.brand-grid__title title-component {
  --title--fill: var(--gray-12);
}
.brand-grid__subtitle {
  grid-area: subtitle;
}
.brand-grid__subtitle subtitle-component {
  --subtitle--font-color: var(--gray-11);
}
:host([mobile]) .brand-grid, :host([tablet]) .brand-grid {
  justify-items: center;
}
:host([mobile]) .brand-grid {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "logo";
}
:host([mobile]) .brand-grid__logo {
  grid-area: logo;
}
:host([tablet]) .brand-grid {
  grid-template-rows: 4fr 2fr 1fr;
  grid-template-areas: "logo" "title" "subtitle";
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  gap: 1rem;
  height: auto;
}
:host([tablet]) .brand-grid__logo {
  grid-area: logo;
  height: auto;
  width: 40%;
}
:host([tablet]) .brand-grid__title {
  grid-area: title;
  height: auto;
  width: 75%;
}
:host([tablet]) .brand-grid__subtitle {
  grid-area: subtitle;
  height: auto;
  -webkit-transform: scale(1.4);
          transform: scale(1.4);
}`;
