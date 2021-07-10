import { css } from 'lit';

 export const style = css`:host {
  padding-left: calc(1.5 * 1rem);
  padding-left: calc(1.5 * var(--font-size, 1rem));
  opacity: 0;
  padding-bottom: 2rem;
}

:host([expanded]) {
  opacity: 1;
}`;
