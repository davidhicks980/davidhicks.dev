import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './contact.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';

@customElement('hicks-contact')
export class HicksContact extends LitElement {
  @property({ type: Boolean })
  showGreetingEntry: boolean;
  breakpointControl: any;
  @property({ type: Boolean })
  mobile: boolean = false;
  handleSubmit(e) {
    e.preventDefault();
  }

  constructor() {
    super();
    this.showGreetingEntry = false;
  }
  firstUpdated(_changedProperties) {
    this.breakpointControl = new BreakpointController(this);
    this.breakpointControl
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
  }
  greeting = (entry) => {
    return entry
      ? html`<label for="greeting"> Preferred greeting </label>
          <input
            id="greeting"
            name="greeting"
            placeholder="Dr. Holly Plouff"
            type="text"
          />`
      : '';
  };
  render(): TemplateResult {
    return html`
      <form
        action="https://davidhicks-dev-default-rtdb.firebaseio.com/contact-me.json"
        method="POST"
      >
        <div class="form-container">
          <label for="fullname"> Name </label>
          <input
            id="fullname"
            name="fullname"
            placeholder="David Hicks"
            type="text"
          />
          <label for="email"> Email </label>
          <input
            id="email"
            placeholder="email@gmail.com"
            name="email"
            type="email"
          />
          <label for="response"> Request a response </label>
          <input
            id="response"
            @click="${(ev) => {
              this.showGreetingEntry = ev.path[0].checked;
            }}"
            type="checkbox"
            name="response"
          />

          ${this.greeting(this.showGreetingEntry)}
          <label class="full-width" for="message">
            Message<abbr title="required" aria-label="required">*</abbr>
          </label>
          <textarea
            id="message"
            class="full-width"
            name="message"
            placeholder="I love your cat. I heard his name is kitty. You should be more selective with names."
            required
          ></textarea>
          <button class="primary" type="submit">Submit</button>
        </div>
      </form>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
