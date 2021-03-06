import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { style } from './unlock-resume.css';
import { unlockResume } from '../../../firebase.functions';
import { Tree } from '../../content/content.component';
import { Status } from '../../status/status.component';
import { PageSection } from '../../../types/PageSection';

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}
@customElement('hicks-unlock-resume')
export class UnlockResumeElement extends LitElement {
  @property({ type: Boolean, reflect: true }) isUnlocked = false;
  @property({ type: Number, reflect: true })
  status: Status = Status.NOT_SUBMITTED;
  @query('form')
  form: HTMLFormElement;
  @query('#unlock-resume-input')
  input: HTMLElement;
  @state({
    hasChanged(value, oldValue) {
      return true;
    },
  })
  resumeTemplate: TemplateResult<2>[];
  async attemptUnlock(ev: SubmitEvent) {
    ev.preventDefault();
    //If the token has already been submitted or the resume is unlocked, return
    if ([Status.SUBMITTED, Status.SUCCESSFUL].includes(this.status)) {
      return;
    }
    this.status = Status.SUBMITTED;
    const key = new FormData(this.form).get('unlock-resume-token').toString();
    unlockResume(key).then((resume) => {
      if (resume) {
        this.resumeTemplate = new Tree()
          .loadSections([resume] as PageSection[])
          .map((template) => template.template);
        this.status = Status.SUCCESSFUL;
      } else {
        this.status = Status.UNSUCCESSFUL;
      }
    });
  }

  statusMessages = {
    [Status.NOT_SUBMITTED]: 'Try submitting',
    [Status.SUBMITTED]: 'Loading...',
    [Status.SUCCESSFUL]: `Recruiter token successful. Unlocking...`,
    [Status.UNSUCCESSFUL]: `The recruiter token you entered does not seem to be working. Perhaps you are playing around with the search form, in which case have at it! Otherwise, I may have messed something up. Feel free to email me at david@davidhicks.dev if this is the case.`,
  };
  statusTemplate(status: Status) {
    return html`<hicks-status icon-placement="before" status="${status}"
      >${this.statusMessages[status]}</hicks-status
    >`;
  }

  render(): TemplateResult | Symbol | string {
    const submitted = this.status >= Status.SUBMITTED;
    const message = this.statusTemplate(this.status);
    if (this.status === Status.SUCCESSFUL) {
      return message;
    }
    return html`
      ${this.status === Status.NOT_SUBMITTED ? '' : message}
      <form @submit=${this.attemptUnlock}>
        <fieldset ?disabled="${submitted}">
          <label for="unlock-resume-input">Enter Recruiter Token: </label>
          <input
            minlength="4"
            maxlength="32"
            required
            autocomplete="off"
            name="unlock-resume-token"
            type="password"
            id="unlock-resume-input"
            ?disabled="${submitted}"
          />
          <span class="unlock-resume__hint">
            <b>Note:</b>
            <em class="unlock-resume__hint--emphasis">
              This section is password protected to keep people from scraping my
              information. Your access will not be recorded.
            </em>
            ????
          </span>

          <button
            class="button--primary"
            ?disabled="${submitted}"
            type="submit"
          >
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
