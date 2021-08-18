import { html } from "lit";
import { ContentModification } from "../components/content/content.component";
import { state } from "../util/primitives/store";

export const contact = {
  title: 'Contact',
  marker: '💌',
    content: html`
    <hicks-contact></hicks-contact>
    `,
};
state.update({sectionAdditions: { position: 3, template: contact, change: ContentModification.INSERT }})