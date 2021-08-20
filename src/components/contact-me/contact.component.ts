import { LitElement, html, CSSResultGroup, TemplateResult, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './contact.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { contact } from '../../firebase.functions';
import { Status } from '../loading/status.component';

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

@customElement('hicks-contact')
export class HicksContact extends LitElement {
  @property({ type: Boolean })
  showGreetingEntry: boolean = false;
  breakpointControl: any;
  @property({ type: Boolean })
  mobile: boolean = false;
  @query('form')
  form: HTMLFormElement;
  @property({ type: Number })
  status: Status;

  async handleSubmit(ev: SubmitEvent) {
    ev.preventDefault();
    if (this.status >= Status.SUBMITTED) return;
    this.status = Status.SUBMITTED;
    let values = '';
    new FormData(this.form).forEach(
      (entry: FormDataEntryValue, key: string) => {
        values = values + '|' + key + ': ' + entry;
      }
    );
    contact(values).then((success) => {
      if (success) {
        this.status = Status.SUCCESSFUL;
      } else {
        this.status = Status.UNSUCCESSFUL;
      }
    });
  }
  constructor() {
    super();
    this.status = Status.NOT_SUBMITTED;
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
            placeholder="Dr. Plouff"
            type="text"
          />`
      : '';
  };

  statusMessages = {
    [Status.NOT_SUBMITTED]: '',
    [Status.SUBMITTED]: 'Sending...',
    [Status.SUCCESSFUL]: `Message Successfully Sent!`,
    [Status.UNSUCCESSFUL]: `There was an error sending your message. Please try again, or message me using one of the social links above.`,
  };
  statusTemplate = (status: Status, ignore?: Status[]) => {
    if (ignore.includes(status)) {
      return '';
    }
    return html`<hicks-status status="${status}"
      >${this.statusMessages[status]}</hicks-status
    >`;
  };
  render(): TemplateResult | string {
    let disabled = this.status >= Status.SUBMITTED;
    let message = this.statusTemplate(this.status, [Status.NOT_SUBMITTED]);
    if (this.status === Status.SUCCESSFUL) {
      return message;
    }
    return html`${message}
      <form @submit=${this.handleSubmit}>
        <p class="directions">
          I'd love to hear your honest feedback on this site and any career
          suggestions. I'm also always looking to discuss development topics, so
          if you are willing to chat, request a response and I'll reach out!
          <br />
        </p>
        <br />
        <fieldset ?disabled="${disabled}" class="form-container">
          <label for="fullname"> Name </label>
          <input
            id="fullname"
            name="fullname"
            placeholder="Holly Plouff"
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
            placeholder="Hello David. I suggest you replace this placeholder text immediately. It is not clever at all."
            required
          ></textarea>
          <button class="primary" type="submit">Submit</button>
        </fieldset>
      </form> `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
