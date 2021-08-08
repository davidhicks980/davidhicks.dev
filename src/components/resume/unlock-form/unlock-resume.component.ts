import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './unlock-resume.css';
import { FormHandler } from '../../../firebase.functions';

//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
import { RESUME_ENCRYPTION_KEY } from '../../../../private/resume-key';
import { state } from '../../../util/primitives/store';
enum UnlockStatus {
  NOT_SUBMITTED,
  UNSUCCESSFUL,
  SUBMITTED,
  SUCCESSFUL,
}

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}
@customElement('hicks-unlock-resume')
export class UnlockResumeElement extends LitElement {
  @property({ type: Boolean, reflect: true }) isUnlocked: boolean = false;
  @property({ type: Number, reflect: true })
  status: UnlockStatus = UnlockStatus.NOT_SUBMITTED;
  @query('form')
  form: HTMLFormElement;
  @query('#unlock-resume-input')
  input;
  formHandler: FormHandler;
  async attemptUnlock(ev: SubmitEvent) {
    ev.preventDefault();
    if (this.status >= UnlockStatus.SUBMITTED) return;
    this.status = UnlockStatus.SUBMITTED;
    let key = new FormData(this.form).get('unlock-resume-token').toString();
    this.formHandler.unlockResume(key).then((res) => {
      if (res) {
        state.update({
          sectionAdditions: {
            template: res,
            position: 2,
          },
        });
        this.status = UnlockStatus.SUCCESSFUL;
      } else {
        this.status = UnlockStatus.UNSUCCESSFUL;
      }
    });
  }
  constructor() {
    super();
    this.formHandler = new FormHandler();
  }
  getStatus(status: UnlockStatus) {
    let template = (message: string) =>
      html`<span class="unlock-resume__message">${message} </span>`;
    switch (status) {
      case UnlockStatus.NOT_SUBMITTED:
        return '';
      case UnlockStatus.SUBMITTED:
        return template('Recruiter token submitted');
      case UnlockStatus.UNSUCCESSFUL:
        return template(`Recruiter token unsuccessful. David must've message something
        up.`);
      case UnlockStatus.SUCCESSFUL:
        return template(`Recruiter token successful. Unlocking...`);
    }
  }

  render(): TemplateResult | Symbol | string {
    let disabled = this.status > UnlockStatus.UNSUCCESSFUL;
    let status = this.getStatus(this.status);
    if (this.status === UnlockStatus.SUCCESSFUL) {
      return status;
    }
    return html`
      <button
        @click="${() => {
          this.input.value = RESUME_ENCRYPTION_KEY;
        }}"
      >
        Test button
      </button>
      ${status}
      <form @submit=${this.attemptUnlock}>
        <fieldset>
          <label for="unlock-resume-input">
            Enter your recruiter token below
          </label>
          <input
            autocomplete="off"
            name="unlock-resume-token"
            type="password"
            id="unlock-resume-input"
            ?disabled="${disabled}"
          />

          <div class="unlock-resume__hint">
            <b>Note:</b>
            <em class="unlock-resume__hint--emphasis">
              Your access will not be tracked.
            </em>
            🔐
          </div>

          <hr />
          <button class="button--primary" ?disabled="${disabled}" type="submit">
            Unlock
          </button>
        </fieldset>
      </form>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
