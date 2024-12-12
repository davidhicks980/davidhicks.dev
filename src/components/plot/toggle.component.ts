import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { style } from './toggle.css';

@customElement('plot-switch')
export class PlotSwitch extends LitElement {
  @property({ reflect: true, type: Boolean })
  toggled = false;

  @property({ reflect: true, type: String })
  name = '';

  toggle() {
    this.dispatchEvent(
      new CustomEvent('toggle', { detail: { toggled: this.toggled } })
    );
  }

  render() {
    const classes = { 'is-toggled': this.toggled };
    return html`<div class="toggle">
      <label for="toggle-input"> <slot></slot> </label>
      <div class="toggle__label ${classMap(classes)}">
        <input
          @click="${this.toggle}"
          type="checkbox"
          class="toggle__label__input"
          name="toggle-input"
        />
      </div>
    </div>`;
  }

  static get styles() {
    return [style];
  }
}
