import { html } from "lit";
import { PageSection } from "../components/content/content.component";
import { elderDrugIcon } from "../icons/elder-drug.icon";
import { pkCardIcon } from "../icons/pk-card.dataurl";

export const testFile = {
  title: 'header',
  subcontent: [
    {
      title: '1',
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
      title: '2',
      subcontent: [
        {
          title: '2.1',
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
          subcontent: [
            {
              title: '2.1.1',
              content: html` test1 `,
            },
            {
              title: '2.1.2',
              content: html` test1 `,
            },
            {
              title: '2.1.3',
              content: html` test2 `,
            },
            {
              title: '2.1.4',
              content: html` test1 `,
            },
            {
              title: '2.1.5',
              content: html` test2 `,
              subcontent: [
                {
                  title: '2.1.5.1',
                  content: html` test2 `,
                },
                {
                  title: '2.1.5.2',
                  content: html` test2 `,
                },
                {
                  title: '2.1.5.3',
                  content: html` test2 `,
                },
              ],
            },
          ],
        },
        {
          title: '2.2',
          content: html`           `
        }
    ]
},
  ],
} as PageSection