import { css } from 'lit';

 export const style = css`.link {
  text-decoration: none;
  position: relative;
  display: block;
  padding: var(--nav-item--padding);
  border-radius: var(--nav-item--radius);
  background: var(--nav-item--background-color);
  border: var(--nav-item--border);
  -webkit-clip-path: var(--nav-item--clip-path);
          clip-path: var(--nav-item--clip-path);
  -webkit-text-decoration: var(--nav-item--text-decoration);
          text-decoration: var(--nav-item--text-decoration);
  -webkit-box-shadow: var(--nav-item--hover--box-shadow);
          box-shadow: var(--nav-item--hover--box-shadow);
  -webkit-transition: var(--nav-item--transition);
  transition: var(--nav-item--transition);
  color: var(--nav-item--font-color);
  font-family: var(--body-font);
  font-size: var(--nav-item--font-size);
  font-weight: var(--nav-item--font-weight);
}
.link__content {
  min-height: 2rem;
  min-width: 2rem;
}
:host([selected]) .link__content {
  color: var(--nav-item--selected--font-color);
}
.link:hover {
  opacity: 1;
  color: var(--nav-item--hover--font-color);
  background-color: var(--nav-item--hover--background-color);
  -webkit-box-shadow: var(--nav-item--hover--box-shadow);
          box-shadow: var(--nav-item--hover--box-shadow);
  -webkit-text-decoration: var(--nav-item--hover--text-decoration);
          text-decoration: var(--nav-item--hover--text-decoration);
}`;
