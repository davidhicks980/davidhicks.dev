import { html } from 'lit';
import { state } from '../util/functions/store';
import { ContentModification } from '../components/content/content.component';

export const aboutSection = {
  title: 'About',
  marker: '🐈',
  content: html`<aside>My aim: build software that my mom would <em>enjoy</em> using</aside><p>&emsp;&emsp; My name is David Hicks. I'm a pharmacist and a web app developer from Asheville NC. I'm currently searching for an entry-level software career where I can learn how to develop at the enterprise level. Although I have a background in healthcare, all aspects of development interest me, so I'd love to hear what projects you could use help with. I'm also interested in hearing about your experience in healthcare, and advice for navigating the industry, so please <a href="#contact">reach out</a> if you have knowledge to share!</p>`,
  subcontent: [
          {
            title: 'Pharmacy and Programming',
            content: html`<p>&emsp;&emsp; Pharmacy and programming are similar only in their complexity, which can make designing software enormously difficult. As a result, medical software can be more harmful than helpful, with <a href="https://www.atlassian.com/incident-management/on-call/alert-fatigue">alert fatigue</a>, 
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