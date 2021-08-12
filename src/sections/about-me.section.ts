// Wait a minute...that’s a weird mix?

import { html } from 'lit';

export const aboutSection = {
  title: 'About',
  marker: '🐈',
  subcontent: [
    {
      title: 'Summary',
      content: html`
      My name is David Hicks. I’m a developer and a pharmacist from Asheville NC.
      `,
    },
    {
      title: 'Background',
      subcontent: [
          {
            title: 'Pharmacy and Programming',
            content: html`<p>While working on my PharmD, I realized that healthcare technology has fallen behind other industries. The safeguards that were implemented to protect patients have made innovation slower and more expensive, and the difficulty of communicating in both domains makes designing tools challenging. I want to use my understanding of how practitioners work, coupled with my experience developing software, to design software that patients and providers <i>enjoy</i> using.</p>`,
          },
          {
            title: 'Style of Development',
            content: html`<p>I tend to use whatever paradigm or framework fits the project I'm working on. So far, that has primarily been TypeScript alone or in combination with Angular or LitElement. Over the past year, I've also become a bit of a ReactiveX zealot, and have learned some Python for shorter scripts and web scraping. Also, while I've spent most of my time writing front-end logic, I'm always happy to learn and develop for any part of the stack. 
            </p>`
          }
      ]
    },
    {
      title: "What I'm Looking For",
      subcontent: [
          {
            title: 'Collaboration and Mentorship',
            content: html`<p>Most of the work I've done has been self-directed, so I'm looking forward to having others to learn from and to share ideas with.</p>`,
          },
          {
            title: 'Best Practices',
            content: html`<p></p>`
          }
      ]
    },
    
  ],
};
