import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
@customElement('test')
export class Test extends LitElement {
  //@property({ type: Array }) propArray: any[]
  //@property({ type: String }) propString: string
  //@property({ type: Boolean }) propBoolean: boolean
  //@property({ type: Object }) propObject: object
  //@property({ type: Number }) propNumber: number
  //@property() color: string = 'black'
  render(): TemplateResult {
    //const colorStyle = styleMap({ color: this.color })
    //const colorClass = classMap({ color: this.color });
    return html``;
  }
  static get styles(): CSSResultGroup[] {
    return [css``];
  }
}
