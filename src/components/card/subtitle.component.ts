import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('subtitle-component')
export class SubtitleComponent extends LitElement {
  render(): TemplateResult {
    return html`<p class="subtitle__paragraph">pharmacist + developer</p>`;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        :host {
          --subtitle--font-family: 'DM Mono', monospace;
          --subtitle--font-size: calc(var(--grid-width) * 0.16 * 0.25);
          --subtitle--font-color: #232b33;
        }
        .subtitle__paragraph {
          font-family: var(--subtitle---font-family);
          font-size: var(--subtitle--font-size);
          color: var(--subtitle--font-color);
          margin: 0px;
        }
      `,
    ];
  }
}
