import { html } from 'lit';
import { pkCardIcon } from '../icons/pk-card.dataurl';
import { elderDrugIcon } from '../icons/elder-drug.icon';
import { LOGO_LIT, LOGO_ROLLUP, LOGO_RXJS, LOGO_TYPESCRIPT, LOGO_WEB_COMPONENTS } from '../icons/logos';
//            ${LOGO_LIT}     ${LOGO_WEB_COMPONENTS}       ${LOGO_RXJS}            ${LOGO_ROLLUP}            ${LOGO_TYPESCRIPT} 

export const portfolioSection = {
  title: 'Portfolio',
  marker: '🎨',
  subcontent: [
    {
      title: 'Section 2.1',
      content: html`<hicks-expansion>
          <span slot="header">Pharmacokinetics Components</span>
          <span slot="description">
            Interactive pharmacokinetic web components.
          </span>
          <div style="max-height:50px; display:block;" slot="built-with">
          <img height='40px' src="./assets/icons/logo-lit.svg" alt="LitElement">
          <img height='40px' src="./assets/icons/logo-web-component.svg" alt="Web components">
          <img height='40px' src="./assets/icons/logo-rxjs.svg" alt="RxJS">
          <img height='40px' src="./assets/icons/logo-typescript.svg" alt="Typescript">
          <img height='50px' src="./assets/icons/logo-rollup.svg" alt="Rollup">



          </div>
          <plot-engine slot="content"></plot-engine>
        </hicks-expansion>
     <hicks-expansion>
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
