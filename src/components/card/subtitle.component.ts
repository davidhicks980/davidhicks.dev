import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
@customElement('subtitle-component')
export class SubtitleComponent extends LitElement {
  @property({ type: Array })
  propArray: any[];
  @property({ type: String })
  propString: string;
  @property({ type: Boolean })
  propBoolean: boolean;
  @property({ type: Object })
  propObject: object;
  @property({ type: Number })
  propNumber: number;
  @property()
  color: string = 'black';
  render(): TemplateResult {
    const colorStyle = styleMap({ color: this.color });
    const colorClass = classMap({ color: this.color });
    return html`<p>pharmacist + developer</p>`;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        :host {
          --hicks--subtitle--font-family: 'DM Mono', monospace;
          --hicks--subtitle--font-size: calc(var(--grid-width) * 0.16 * 0.25);
        }
        p {
          font-family: var(--hicks--subtitle--font-family);
          font-size: var(--hicks--subtitle--font-size);
          margin: 0px;
        }
      `,
    ];
  }
}
