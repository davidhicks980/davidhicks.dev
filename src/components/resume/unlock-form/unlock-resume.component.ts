import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { style } from './unlock-resume.css';
import { unlockResume } from '../../../firebase.functions';
import { state } from '../../../util/primitives/store';
import { ContentModification } from '../../content/content.component';
import { Status } from '../../status/status.component';

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}
@customElement('hicks-unlock-resume')
export class UnlockResumeElement extends LitElement {
  @property({ type: Boolean, reflect: true }) isUnlocked: boolean = false;
  @property({ type: Number, reflect: true })
  status: Status = Status.NOT_SUBMITTED;
  @query('form')
  form: HTMLFormElement;
  @query('#unlock-resume-input')
  input: HTMLElement;
  async attemptUnlock(ev: SubmitEvent) {
    ev.preventDefault();
    if (this.status >= Status.SUBMITTED) return;
    this.status = Status.SUBMITTED;
    let key = new FormData(this.form).get('unlock-resume-token').toString();
    unlockResume(key).then((resume) => {
      if (resume) {
        state.update({
          sectionAdditions: {
            template: resume,
            position: 2,
            change: ContentModification.REPLACE,
          },
        });
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
    let submitted = this.status >= Status.SUBMITTED;
    let message = this.statusTemplate(this.status);
    if (this.status === Status.SUCCESSFUL) {
      return message;
    }
    return html`
      ${message}
      <form @submit=${this.attemptUnlock}>
        <fieldset ?disabled="${submitted}">
          <label for="unlock-resume-input">ENTER RECRUITER TOKEN: </label>
          <input
            minlength="32"
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
            🔐
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
