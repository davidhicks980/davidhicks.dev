/**
 * Per Justin Fagnani, a semantic mixin utility
 *```
 * class MyClass extends mix(MySuperClass).with(MyMixin, OtherMixin) {
 * ...
 *}
 * ```
 * @param {*} superclass
 */
export const mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {
  superclass: unknown;
  constructor(superclass: unknown) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce(
      (component, mixin) => mixin(component),
      this.superclass
    );
  }
}
