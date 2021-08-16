// Wait a minute...that’s a weird mix?

import { html } from 'lit';
import { state } from '../util/primitives/store';
import { ContentModification } from '../components/content/content.component';

export const aboutSection = {
  title: 'About',
  marker: '🐈',
  content: "My name is David Hicks. I’m a developer and a pharmacist from Asheville, NC. My development experience has mostly involved Typescript alone or with Angular, but I am always looking for new languages and paradigms that I can use to create helpful tools. I'm on the search for a team who can use my pharmaceutical knowledge and my passion for development, and who will help guide me to towards becoming a better developer.",
  subcontent: [
          {
            title: 'Pharmacy and Programming',
            content: html`<p>Pharmacy and programming are unconventional companions: the former is highly regulated and slow-moving, while the latter is famous for it's willingness to move fast and break things. Where they share terrain is in their complexity, which can make designing software (that pharmacists enjoy using) enormously difficult. As a result, medical software can be more harmful than helpful, with <a href="https://www.atlassian.com/incident-management/on-call/alert-fatigue">alert fatigue</a>, 
              <a>poor data quality</a>, and 
              <a href="https://www.hopkinsmedicine.org/news/media/releases/study_suggests_medical_errors_now_third_leading_cause_of_death_in_the_us">medical errors</a> as examples. My goal in this space is that I can help create tools that reduce complexity for patients, providers, and developers.
              </p>`,
          },
          {
            title: 'Style of Development',
            content: html`<p>I prefer to use a paradigm, language, or framework fits the project I'm working on. So far, that has meant mostly TypeScript alone or in combination with Angular or LitElement, with an emphasis on object-oriented, component-based development. Over the past year, I've also become invested in RxJS, and have learned some Python for shorter scripts and web scraping.
            </p>`
          },    
  ],
};

state.update({sectionAdditions: { position: 0, template: aboutSection, change: ContentModification.INSERT }})