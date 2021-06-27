import { html } from 'lit-html';
import { directive, Directive, PartInfo, PartType } from 'lit-html/directive';
export class CaptureSlot extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== 'class') {
      throw new Error(
        'The `classMap` directive must be used in the `class` attribute'
      );
    }
  }
  // Define a render method, which may accept arguments:
  render(value: number, minValue = Number.MIN_VALUE) {
    this.maxValue = Math.max(value, this.maxValue, minValue);
    return this.maxValue;
  }
}
const max = directive(MaxDirective);

// Call the directive with `value` and `minValue` arguments defined for `render()`:
const template = html`<div>${max(someNumber, 0)}</div>`;
