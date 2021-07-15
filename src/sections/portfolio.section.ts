import { html } from 'lit';
import { pkCardIcon } from '../icons/pk-card.dataurl';
import { elderDrugIcon } from '../icons/elder-drug.icon';

export const portfolioSection = {
  title: 'Portfolio',
  marker: '🎨',
  subcontent: [
    {
      title: 'Section 2.1',
      content: html`<hicks-expansion imageuri="${pkCardIcon}">
          <span slot="header">Pharmacokinetics Components</span>
          <span slot="description">
            Built for students at the Eshelman School of Pharmacy, the
            pharmacokinetics component project was aimed at creating interactive
            learning tools to visualize how changes in drug dosing parameters
            affect the net amount of drug found in a patient's serum
          </span>
        </hicks-expansion>
     <hicks-expansion imageuri="${elderDrugIcon}">
          <span slot="header">Elder Drug</span>
          <span slot="description">
            ElderDrug.com is an Angular project aimed at making Beers Criteria
            -- a list of Beers Criteria. Additionally, Elder Drug expands index
            terms to include brands and generics for all entries, even those
            that only specify a class or therapeutic category (e.g.
            'Antipsychotics' would include 'aripiprazole' and 'Abilify'). Many
            drugs in this database have been determined by querying
            Class/Therapeutic Category members (e.g. Cyclooxygenase Inhibitors),
            and using the resulting generic RxCUIs to query brand names.
          </span>
        </hicks-expansion>
         
        
        `,
        
    },
  ],
};
