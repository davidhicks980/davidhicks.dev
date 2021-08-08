import { LitElement } from 'lit';

export const keyboardEvent = (event: string, keyFilters: string | string[]) =>
  function (
    target: LitElement,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let f = descriptor.value;
    if (typeof f === 'function') {
      keyFilters = Array.isArray(keyFilters) ? keyFilters : [keyFilters];
      let listener = function (ev: KeyboardEvent) {
        if (keyFilters.includes(ev.key)) {
          f.apply(this, ev);
        }
      };
      setTimeout(() => {
        target.addEventListener(event, listener);
      }, 500);
    } else {
      throw Error(
        `${target.tagName}.${[
          propertyKey,
        ]}.keyboardEventDecorator: keyboardEvent decorator should only be used on a method within a class`
      );
    }
  };
