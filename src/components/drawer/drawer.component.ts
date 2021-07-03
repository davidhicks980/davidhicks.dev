import {
  LitElement,
  html,
  css,
  CSSResultGroup,
  TemplateResult,
  nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
@customElement('hicks-drawer')
export class DrawerComponent extends LitElement {
  //@property({ type: Array }) propArray: any[]
  //@property({ type: String }) propString: string
  @property({ type: Boolean }) open: boolean = true;
  //@property({ type: Object }) propObject: object
  //@property({ type: Number }) propNumber: number
  //@property() color: string = 'black'
  render(): TemplateResult | Symbol {
    //const colorStyle = styleMap({ color: this.color })
    //const colorClass = classMap({ color: this.color });
    return this.open
      ? html`
          <slot name="title"></slot>
          <!-- Default slot-->

          <slot></slot>
        `
      : nothing;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        :host {
          --drawer--height: 100vh;
          --drawer--width: 100%;
          --drawer--background: white;
          --drawer--box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.1),
            0 0 2px 4px rgba(0, 0, 0, 0.1);
          height: var(--drawer--height);
          width: var(--drawer--width);
          background: var(--drawer--background);
          display: block;
          position: fixed;
          top: 0px;
          left: 0px;
        }
      `,
    ];
  }
}
