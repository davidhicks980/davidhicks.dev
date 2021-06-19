import { css } from 'lit';

 export const style = css`/** Block Element
* @access public
* @param {String} $element - Element's name
*/
:host {
  --nav-item--font-family: "DM Mono", sans-serif;
  --nav-item--font-size: 1.2rem;
  --nav-item--font-color: var(--gray-8);
  --nav-item--highlight-color: var(--primary-8);
  --nav-item--background: white;
  --nav-item--outline: white;
}

.link {
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
}
:host .link::before {
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  position: absolute;
  z-index: -1;
  background-color: var(--nav-item--background);
  opacity: 0;
  border-radius: 5px;
  -webkit-transition: opacity 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: opacity 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
  -webkit-box-shadow: 0px 0px 0px 2px var(--nav-item--outline);
          box-shadow: 0px 0px 0px 2px var(--nav-item--outline);
  will-change: opacity;
}
:host .link:hover::before {
  opacity: 0.1;
}
:host .link:hover:active::before {
  opacity: 0.2;
}

:host .link:active::before {
  opacity: 0.1;
}

:host .link:focus::before {
  opacity: 0.1;
}

.link__text {
  font-family: var(--nav-item--font-family);
  font-size: var(--nav-item--font-size);
  color: var(--nav-item--font-color);
  font-weight: 500;
}`;
