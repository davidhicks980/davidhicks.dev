import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Address {
  street: string;
  suburb: string;
}

@customElement('address-component')
export class AddressComponent extends LitElement {
  @property({
    type: Object,
    hasChanged: (currentAddress?: Address, previousAddress?: Address) => {
      return true;
    },
  })
  address?;

  firstUpdated(_changedProperties) {
    this.address = { street: '111 11 street', suburb: 'somewhere in canada' };
  }
  render() {
    return html` <input
        @input="${(e) => {
          this.address.street = e.target.value;
          this.requestUpdate('address');
        }}"
      />
      <span>${JSON.stringify(this.address)}</span>`;
  }
}
