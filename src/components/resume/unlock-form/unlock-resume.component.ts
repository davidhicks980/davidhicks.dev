import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './unlock-resume.css';
import { FormHandler } from '../../../firebase.functions';

//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
import { RESUME_ENCRYPTION_KEY } from '../../../../private/resume-key';
import { state } from '../../../util/primitives/store';
import { ContentModification } from '../../content/content.component';
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
    this.formHandler.unlockResume(key).then((resume) => {
      if (resume) {
        state.update({
          sectionAdditions: {
            template: resume,
            position: 2,
            change: ContentModification.REPLACE,
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
  getFeedback(status: UnlockStatus) {
    let template = (message: string) =>
      html`<span class="unlock-resume__message">${message} </span>`;
    switch (status) {
      case UnlockStatus.NOT_SUBMITTED:
        return '';
      case UnlockStatus.SUBMITTED:
        return html`<div class="unlock-resume__message">
          LOADING
          <svg
            class="loading-parent"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle class="loading" cx="60" cy="60" r="10" />
            <circle class="loading-reverse" cx="25" cy="25" r="12.5" />
          </svg>
        </div> `;
      case UnlockStatus.UNSUCCESSFUL:
        return template(
          `The recruiter token you entered does not seem to be working. Perhaps you are playing around with the search form, in which case have at it! Otherwise, I may have messed something up. Feel free to email me at david@davidhicks.dev if this is the case.`
        );
      case UnlockStatus.SUCCESSFUL:
        return template(`Recruiter token successful. Unlocking...`);
    }
  }

  render(): TemplateResult | Symbol | string {
    let disabled = this.status > UnlockStatus.UNSUCCESSFUL;
    let feedbackTemplate = this.getFeedback(this.status);
    if (this.status === UnlockStatus.SUCCESSFUL) {
      return feedbackTemplate;
    }
    return html`
      <button
        @click="${() => {
          this.input.value = RESUME_ENCRYPTION_KEY;
        }}"
      >
        Test button
      </button>
      ${feedbackTemplate}
      <form @submit=${this.attemptUnlock}>
        <fieldset>
          <label for="unlock-resume-input"> RECRUITER TOKEN: </label>
          <input
            minlength="32"
            maxlength="32"
            required
            autocomplete="off"
            name="unlock-resume-token"
            type="password"
            id="unlock-resume-input"
            ?disabled="${disabled}"
          />
          <span class="unlock-resume__hint">
            <b>Note:</b>
            <em class="unlock-resume__hint--emphasis">
              This section is password protected to keep people from scraping my
              information. Your access will not be recorded.
            </em>
            🔐
          </span>

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
