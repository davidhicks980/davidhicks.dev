export const queryHeader = (el: HTMLElement) =>
  el?.querySelector('h1, h2, h3, h4, h5, h6') as HTMLHeadingElement;
export const getHeadingDepth = (el: HTMLHeadingElement) =>
  Number(el.tagName[1]) as number;
