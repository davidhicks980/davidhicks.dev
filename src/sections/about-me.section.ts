import { html } from 'lit';
import { state } from '../util/functions/store';
import { ContentModification } from '../components/content/content.component';

export const aboutSection = {
  title: 'About',
  marker: '🐈',
  content: html`<p>&emsp;&emsp;My programming journey began three years ago after being asked to create potassium dosing calculator for nurses. I had thought that learning JavaScript would be the biggest barrier to this project, but I found myself really enjoying the work I was doing. Since then, my passion for developing helpful tools has only seemed to grow, and now that I've graduated from pharmacy school, I've decided to pursue a career in software development.  </p>`,
  subcontent: [
          {
            title: 'Pharmacy and Programming',
            content: html`<p>&emsp;&emsp;Pharmacy and programming are unconventional companions: the former is highly regulated and slow-moving, while the latter is famous for its willingness to move fast and break things. Where they share terrain is in their complexity, which can make designing software enormously difficult. As a result, medical software can be more harmful than helpful, with <a href="https://www.atlassian.com/incident-management/on-call/alert-fatigue">alert fatigue</a>, 
              <a href="https://repository.immregistries.org/files/resources/5835adc2a9a72/survey_of_immunization_reporting_to_immunization_information_systems_by_major_u_s__pharmacies_.pdf">poor standardization</a>, and 
              <a href="https://www.hopkinsmedicine.org/news/media/releases/study_suggests_medical_errors_now_third_leading_cause_of_death_in_the_us">medical errors</a> threatening both provider efficiency and patient safety. My hope is that my understanding of medical terminology and work flow can be an asset to my development team, and that I can serve as an intermediary between software developers and healthcare staff.
              </p>`,
          },
          {
            title: 'Style of Development',
            content: html`<p>&emsp;&emsp;I prefer to use a paradigm, language, or framework fits the project I'm working on. So far, that has meant mostly TypeScript alone or in combination with Angular or Lit, with an emphasis on object-oriented, component-based front-end development. Over the past year, I've also become invested in RxJS, and have learned some Python for shorter scripts and web scraping. In the backend space, most of my experience is in MySQL/NodeJS, but I've recently moved my projects over to Firebase. 
            </p>`
          },    
          
  ],
};

state.update({sectionAdditions: { position: 0, template: aboutSection, change: ContentModification.INSERT }})