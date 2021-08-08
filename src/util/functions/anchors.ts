export const queryAnchor = (el: Element): HTMLAnchorElement =>
  el ? el.querySelector('a') : undefined;
