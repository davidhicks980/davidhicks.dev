// Wait a minute...that’s a weird mix?

import { html } from 'lit';

export const aboutSection = {
  title: 'About',
  marker: '🐈',
  subcontent: [
    {
      title: 'Summary',
      content: html`My name is David Hicks. I’m a developer and a pharmacist
      from Asheville NC.`,
    },
    {
      title: 'Pharmacy and Programming...?',
      content: html`It may seem like a strange mix, but pharmacy was actually
        what ignited my interest in development.As I was rotating through
        different pharmacy practices, I kept hearing about how much my
        preceptors dreaded their electronic health records. It didn’ t take long
        for me to understand their frustrations, so I decided I would learn how
        to create my own healthcare tools.

        <aside>
          I later learned from our marketing and communications director that
          our school’s simulation EHR was
          <em>designed to be difficult to navigate</em>, so as to prepare us for
          what was to come.
        </aside>

        I began with a simple potassium dosing calculator written in Javascript,
        and progressed to learning about medical APIs. Then SQL. Then Angular,
        OOP, mixins, Web Components, RxJS… anything that gave me new ways to
        develop. It’s approaching three years since I started programming, and
        now I can’ t imagine a career in anything else. Having recently
        graduated with my PharmD (since May 2021!), I’m now searching for a team
        that shares my passion and enthusiasm, and that is willing to mentor me
        on enterprise development. In return, I hope that my knowledge of
        pharmacy and my eagerness to learn and contribute will help us develop
        tools that people look forward to using. `,
    },
  ],
};
