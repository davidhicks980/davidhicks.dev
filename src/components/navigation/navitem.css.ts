import { css } from 'lit';

 export const style = css`:root {
  --header-font: "PT Sans", sans-serif;
  --body-font: "Arimo", sans-serif;
}

h1 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 99;
}

h2 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 62;
}

h3 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 49;
}

h4 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 35;
}

h5 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 25;
}

h6 {
  font-family: "PT Sans", sans-serif;
  font-family: var(--header-font);
  font-size: 21;
}

/** Block Element
* @access public
* @param {String} $element - Element's name
*/
.link {
  text-decoration: none;
  position: relative;
  display: block;
  padding: var(--nav--item--padding);
  border-radius: var(--nav--item--radius);
  background: var(--nav--item--background-color);
  border: var(--nav--item--border);
  -webkit-clip-path: var(--nav-item--clip-path);
          clip-path: var(--nav-item--clip-path);
  -webkit-text-decoration: var(--nav--item--text-decoration);
          text-decoration: var(--nav--item--text-decoration);
  -webkit-box-shadow: var(--nav--item--hover--box-shadow);
          box-shadow: var(--nav--item--hover--box-shadow);
  -webkit-transition: var(--nav--item--transition);
  transition: var(--nav--item--transition);
}
.link__content {
  font: var(--nav--item--font);
  color: var(--nav--item--font-color);
  min-height: 2rem;
  min-width: 2rem;
  -webkit-transition: var(--nav--item--transition);
  transition: var(--nav--item--transition);
}
:host([selected]) .link__content {
  --nav--item--font-color: var(--nav-item--selected--font-color);
}
.link:hover {
  opacity: 1;
  --nav--item--font-color: var(--nav--item--hover--font-color);
  --nav--item--background-color: var(--nav--item--hover--background-color);
  --nav--item--box-shadow: var(--nav--item--hover--box-shadow);
  --nav--item--text-decoration: var(--nav--item--hover--text-decoration);
}`;
