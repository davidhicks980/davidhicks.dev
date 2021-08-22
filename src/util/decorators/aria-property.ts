/**
 * A property decorator proxies an aria attribute to an internal node
 *
 * This decorator is only intended for use with ARIA attributes, such as `role`
 * and `aria-label` due to screenreader needs.
 *
 * Upon first render, `@ariaProperty` will remove the attribute from the host
 * element to prevent screenreaders from reading the host instead of the
 * internal node.
 *
 * This decorator should only be used for non-Symbol public fields decorated
 * with `@property`, or on a setter with an optional getter.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @ariaProperty
 *   @property({ type: String, attribute: 'aria-label' })
 *   ariaLabel?: string;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
export function ariaProperty(
  protoOrDescriptor: {},
  name?: string,
  descriptor?: PropertyDescriptor
): any {
  if (name !== undefined) {
    return tsDecorator(protoOrDescriptor, name, descriptor);
  } else {
    throw new Error('@ariaProperty only supports TypeScript Decorators');
  }
}
