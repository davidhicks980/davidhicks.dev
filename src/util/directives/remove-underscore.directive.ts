import { Directive, directive } from 'lit-html/directive.js';
export class RemoveUnderscore extends Directive {
  render(value: string) {
    return value.replace(/_/g, ' ');
  }
}

export const removeUnderscores = directive(RemoveUnderscore);
