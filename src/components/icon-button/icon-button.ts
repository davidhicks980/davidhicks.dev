import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { style } from './iconbutton.css';
import { styleMap } from 'lit/directives/style-map.js';

export class HicksIconToggleButton extends LitElement {
  @property({ type: String }) toggleIcon: string = '';
  @property({ type: String }) defaultIcon: string = '';
  @property({ type: String }) togglePath: string = '';
  @property({ type: String }) defaultPath: string = '';
  @property({ type: String }) pathAnimation: string = '';

  @property({ type: Boolean, reflect: true }) toggled: boolean = false;

  @property() color: string = 'black';
  @query('slot')
  slot;

  private _toggleEvent: CustomEvent;

  constructor() {
    super();
    this._toggleEvent = new CustomEvent('toggle', {
      detail: { isToggled: this.toggled },
    });
  }
  handleClick = (event: MouseEvent) => {
    this.toggled = this.toggled ? false : true;
    this.dispatchEvent(this._toggleEvent);
    if (this.slottedIcon) {
      this.toggleIconClass();
    }
  };
  toggleIconClass() {
    this.toggled
      ? this.slottedIcon.classList.add('toggled')
      : this.slottedIcon.classList.remove('toggled');
  }
  iconStyle: any;
  slottedIcon: SVGElement;
  handleSlottedIcon() {
    this.slottedIcon = (
      this.slot as HTMLSlotElement
    ).assignedNodes()[0] as SVGElement;
    console.log(this.slottedIcon);
  }

  updated(_updates) {
    if (_updates.has('toggleIcon')) {
      this.iconStyle = styleMap({
        '--icon--default-src': `url("${this.defaultIcon}")`,
        '--icon--toggle-src': `url("${this.toggleIcon}")`,
        '--icon--default-path': `${this.defaultPath}`,
        '--icon--toggle-path': `${this.togglePath}`,
        '--icon--path-animation': `${this.pathAnimation}`,
        '--icon--color': 'white',
      });
    }
  }
  animatedIcon = () =>
    html`<slot @slotchange="${this.handleSlottedIcon}" name="icon"></slot>`;
  render(): TemplateResult {
    return html`
      <button
        @click="${this.handleClick}"
        style="${this.iconStyle}"
        class="icon__button"
      >
        ${this.animatedIcon()}
      </button>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style, css``];
  }
}
