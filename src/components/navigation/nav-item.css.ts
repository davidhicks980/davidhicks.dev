import { css } from 'lit';

 export const style = css`.link {
  display: block;
  padding: 0.5rem;
  padding: var(--nav-item--padding, 0.5rem);
  position: relative;
  text-decoration: none;
  -webkit-transition: var(--nav-item--transition);
  -o-transition: var(--nav-item--transition);
  transition: var(--nav-item--transition);
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
.link__content {
  color: var(--nav-item--font-color);
  font-family: var(--body-font);
  font-size: var(--nav-item--font-size);
  font-weight: var(--nav-item--font-weight);
  min-height: 2rem;
  min-width: 2rem;
}
:host([selected]) .link__content {
  color: var(--nav-item--selected--font-color);
}
.link:hover {
  -webkit-box-shadow: var(--nav-item--hover--box-shadow);
          box-shadow: var(--nav-item--hover--box-shadow);
  color: var(--nav-item--hover--font-color);
  opacity: 1;
}`;
