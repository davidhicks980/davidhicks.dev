import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
//import { classMap } from 'lit/directives/class-map.js'
@customElement('hicks-grid-item')
export class GridItem extends LitElement {
  //@property({ type: Array }) propArray: any[]
  //@property({ type: String }) propString: string
  //@property({ type: Boolean }) propBoolean: boolean
  //@property({ type: Object }) propObject: object
  @property() rows: string = '1 / 2';
  @property() columns: string = '1 / 2';
  //@property() color: string = 'black'
  render(): TemplateResult {
    const gridStyle = styleMap({
      gridRows: this.rows,
      gridColumns: this.columns,
    });
    return html` <div .style="${gridStyle}"><slot></slot></div> `;
  }
  //static get styles(): CSSResultGroup[] {return [css``]}
}
