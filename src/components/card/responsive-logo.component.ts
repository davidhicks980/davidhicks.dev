import { LogoComponent } from './logo.component';
import { styleResponsively } from './logo-resize.mixin';
import { StyleAdjustments } from './StyleAdjustments';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles: StyleAdjustments[] = [
  {
    query: 'screen and (max-width: 599.99px)',
    styles: { 'max-height': '200px' },
  },
];

@customElement('hicks-resizable-logo')
export class ResponsiveLogo extends styleResponsively(LogoComponent)(styles) {
  render() {
    return this.styleComponent(
      (style) => html`<div style="${style}">${super.render()}</div>`
    );
  }
}
