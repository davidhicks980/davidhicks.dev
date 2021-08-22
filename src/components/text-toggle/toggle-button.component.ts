import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { style } from './toggle-button.css';
@customElement('hicks-toggle-button')
export class ToggleComponent extends LitElement {
  @queryAssignedNodes('', true)
  text;
  @property({ type: String, reflect: true, attribute: 'aria-pressed' })
  toggled: string = 'false';

  /**
   * Toggles the toggle button's state between *pressed* and *not pressed*.
   *
   * @param {HTMLElement} button
   */
  toggleState(force?: boolean) {
    let state;
    if (typeof force === 'boolean') {
      state = force ? 'true' : 'false';
    } else {
      state = this.toggled === 'true' ? 'false' : 'true';
    }
    this.toggled = state;
    this.dispatchEvent(
      new CustomEvent('pressed', {
        detail: this.toggled === 'true',
        bubbles: true,
        composed: true,
      })
    );
  }

  keydownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.toggleState();
    } else if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
    }
  }
  keyupHandler(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar') {
      this.toggleState();
    }
  }
  clickHandler(event: KeyboardEvent) {
    this.toggleState();
  }

  firstUpdated(_changedProperties) {
    this.addEventListener('click', this.clickHandler.bind(this));
    this.addEventListener('keydown', this.keydownHandler.bind(this));
    this.addEventListener('keyup', this.keyupHandler.bind(this));
    this.setAttribute('role', 'button');
    this.tabIndex = 0;
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
