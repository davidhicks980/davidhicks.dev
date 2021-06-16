import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HicksExpansionPanel } from './expansion-panel/expansion-panel.component';
import { elderDrugIcon } from './icons/elder-drug.icon';
import { pkCardIcon } from './icons/pk-card.dataurl';
HicksExpansionPanel;
const testFile = {
  section: 'Page',
  subcontent: [
    {
      section: 'Portfolio',
      content: html`
        <hicks-expansion imageuri="${pkCardIcon}">
          <h4 slot="title">Pharmacokinetics Components</h4>
          <p slot="description">
            Built for students at the Eshelman School of Pharmacy, the
            pharmacokinetics component project was aimed at creating interactive
            learning tools to visualize how changes in drug dosing parameters
            affect the net amount of drug found in a patient's serum
          </p>
          <div slot="content"><plot-engine> </plot-engine></div>
        </hicks-expansion>

        <hicks-expansion imageuri="${elderDrugIcon}">
          <h4 slot="title">Elder Drug</h4>
          <p slot="description">
            ElderDrug.com is an Angular project aimed at making Beers Criteria
            -- a list of Beers Criteria. Additionally, Elder Drug expands index
            terms to include brands and generics for all entries, even those
            that only specify a class or therapeutic category (e.g.
            'Antipsychotics' would include 'aripiprazole' and 'Abilify'). Many
            drugs in this database have been determined by querying
            Class/Therapeutic Category members (e.g. Cyclooxygenase Inhibitors),
            and using the resulting generic RxCUIs to query brand names.
          </p>
          <div slot="content"><plot-engine> </plot-engine></div>
        </hicks-expansion>
      `,
    },
    {
      section: 'About',
      subcontent: [
        {
          section: 'My Ethos',
          content: html`
            <main class="layout__list">
              <h3>
                I want to create software that my mom would
                <i><b>enjoy</b></i> using.
              </h3>
              Doing so means designing software with the following in mind:
              <hicks-card-container>
                ${[
                  {
                    title: 'Accessibility',
                    body: ' A11y is more than aria-roles and roving tabindex. Accessible sites need to be enjoyable in any context.',
                  },
                  {
                    title: 'Reliability',
                    body: ' Javascript in a world where null is an object and NaN a number. Creating great products means creating a consistent experience out of unintuitive parts.',
                  },
                  { title: 'Speed', body: 'Who has time?' },
                  {
                    title: 'Simplicity',
                    body: 'We use apps to do tasks or find information. Elegant designs not only look great, but also do not overshadow their primary uses.',
                  },
                ].map(
                  (card) => html`<hicks-card
                    fontColor="white"
                    color="var(--primary-9)"
                    hue="90"
                  >
                    <h4 slot="title">${card.title}</h4>
                    <p slot="body">${card.body}</p>
                  </hicks-card>`
                )}</hicks-card-container
              >
            </main>
          `,
        },
      ],
    },
  ],
};

const linkIcon = () => html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 0 24 24"
  width="24px"
  fill="gray"
>
  <path d="M0 0h24v24H0V0z" fill="none" />
  <path
    d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"
  />
</svg>`;

const tags = (
  title: string,
  link: TemplateResult,
  level: number,
  href: string
) => {
  let header = html`${title}${link}`;
  const vals = {
    h1: () => html`<h1 id="${href}">${header}</h1>`,
    h2: () => html`<h2 id="${href}">${header}</h2>`,
    h3: () => html`<h3 id="${href}">${header}</h3>`,
    h4: () => html`<h4 id="${href}">${header}</h4>`,
    h5: () => html`<h5 id="${href}">${header}</h5>`,
    h6: () => html`<h6 id="${href}">${header}</h6>`,
  };
  return vals['h' + level];
};

@customElement('content-component')
export class ContentComponent extends LitElement {
  @property()
  file: string = '';

  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  @property({ type: String })
  section: string = 'home';

  content = [] as string[];

  parseFile(
    file: { section: string; content: TemplateResult; subcontent: any[] },
    level = 1
  ) {
    if (typeof level != 'number' || level < 1 || level > 7)
      return ['[err: too many headers]'];
    ///////////////////////////////////
    const { section: title, subcontent, content } = file;
    ////////////////////
    if (title) {
      let href = (title.toLowerCase().trim() + level).replace(/[^\w\d]/g, '_');
      let link = html`<a href="#${href}" class="toc__content__link-icon"
        >${linkIcon()}</a
      >`;
      this.content.push(tags(title, link, level, href)());
    }
    if (content) {
      this.content.push(content);
    }
    if (!Array.isArray(file.subcontent) || !file.subcontent.length) {
      return;
    } else {
      subcontent.forEach((item) => {
        this.parseFile(item, level + 1);
      });
    }
    return this.content;
  }

  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`<div>${this.parseFile(testFile)}</div>`;
  }
}
