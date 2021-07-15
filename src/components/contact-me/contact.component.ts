import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './contact.css';
@customElement('hicks-contact')
export class HicksContact extends LitElement {
  @property({ type: Boolean })
  showGreetingEntry: boolean;
  constructor() {
    super();
    this.showGreetingEntry = false;
  }
  greeting = (entry) => {
    return entry
      ? html`<label for="greeting"> Preferred greeting </label>
          <input name="greeting" placeholder="Dr Holly Plouff" type="text" />`
      : '';
  };
  render(): TemplateResult {
    return html`
      <form>
        <label for="fullname"> Name </label>
        <input name="fullname" placeholder="David Hicks" type="text" />
        <label for="email"> Email </label>
        <input name="email" type="email" />
        <label for="response"> Request a response </label>
        <input
          @click="${(ev) => {
            console.log(ev.path[0].checked);
            this.showGreetingEntry = ev.path[0].checked;
            console.log(this.showGreetingEntry);
          }}"
          type="checkbox"
          name="response"
          placeholder="youremail@gmail.com"
        />
        ${this.greeting(this.showGreetingEntry)}
        <div class="textarea">
          <label for="message"> Message </label>
          <textarea
            name="message"
            placeholder="I love your cat. I heard his name is kitty. You should be more selective with names."
            required
          >
          </textarea>
        </div>

        <div>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
