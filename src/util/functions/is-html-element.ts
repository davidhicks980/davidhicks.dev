export function isElement(element: unknown): boolean {
  return element instanceof Element || element instanceof HTMLDocument;
}
