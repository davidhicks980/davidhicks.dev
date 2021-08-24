import { html, TemplateResult } from 'lit';
import { ContentModification } from '../components/content/content.component';
import { state } from '../util/functions/store';
import { RESUME_SORT_ORDER } from './resume-sort-order';

interface ResumeEntry {
  section: string;
  startDate: string;
  endDate?: string;
  title: string;
  organization: string;
  locale: string;
  preceptor?: string;
  detail: string[] | string;
  type?: string;
  description?: string;
  resume: string;
}
export class Resume {
  private _arrayMap: ResumeEntry[];
  private _title: string;
  private _subcontent: { title: string; content: TemplateResult<1> }[];
  get title(){
    return this._title;
  }
  get unlockTemplate(){
    return html`
    <hicks-unlock-resume>
    </hicks-unlock-resume>
    `
  }
  get buttons(){
    return  html`
      <div style="display: flex; flex-direction: row; gap: 1rem; "> 
      <hicks-toggle-button
    id="view-resume-cv"
    aria-label="Choose whether to view my CV or my resume"
    class="button--primary"
  >
   Full History (CV)
  </hicks-toggle-button>
  <hicks-toggle-button 
    id="show-hide-details"
    aria-label="Display the details of each resume entry"
  >
  Expand All
  </hicks-toggle-button></div>
 
       `
  }
  get subcontent(){
    return this._subcontent
  }
  get template() {
    return {
      title: this._title,
      content: this.buttons,
      marker: '📜',
      subcontent: this._subcontent,
    };
  }
  constructor(entries: ResumeEntry[]) {
    this._arrayMap = this._sortEntriesByDate(entries as ResumeEntry[]);
      this._subcontent = this._getSectionTemplates(this._arrayMap, 'section');
      this._title = 'Resume'
   
  }
  private _sortEntriesByDate(entries: ResumeEntry[]) {
    let pred = (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate);
    return entries.sort(pred);
  }
  private _getDetail(detail) {
    let details = [''];
    if (!Array.isArray(detail)) {
      details = [detail] as string[];
    } else {
      details = detail as string[];
    }
    return details.map((detail: string) => html`<li>${detail}</li>`);
  }
  private _getEntryDate(date: string) {
    if(date.toLowerCase() ==='present'){
      return date;
    }
    return new Date(date).toLocaleDateString('default', {
      month: 'short',
      year: 'numeric',
    });
  }
  private _formatFieldContent(key: string, value: any) {
    switch (key) {
      case 'detail':
        return this._getDetail(value);
      case 'startDate':
      case 'endDate':
        return this._getEntryDate(value);
      default:
        return value;
    }
  }

  private _getSectionTemplates(entryList: ResumeEntry[], groupBy: string) {
    let map = new Map() as Map<string, TemplateResult<1>[]>;
    let entries = entryList.slice();
    while (entries.length) {
      let entry = entries.pop() as ResumeEntry;
      let sectionName = entry[groupBy];
      const fields = Object.entries(entry)
      let onResume = entry.resume === 'true';
      let content = html`
        <hicks-resume-entry ?on-resume="${onResume}">
          ${fields.map(([field, content]) => {
            if(field != 'resume'){
            return html`<span slot="${field}">${this._formatFieldContent(field, content)}</span> `;}
          })}
          <button slot="expand-button"></button>
        </hicks-resume-entry>
      `;

      if (sectionName) {
        map.has(sectionName) ? map.get(sectionName).push(content) : map.set(sectionName, [content]);
      }
    }
    const sections = Array.from(map)
    sections.sort((a,b)=>{
      let comparison =  RESUME_SORT_ORDER.indexOf(a[0]) - RESUME_SORT_ORDER.indexOf( b[0]);
      return  Math.sign(comparison);
    })
    return sections.map(([title, section]) => {
      return {
        title,
        
        content: html`
        <div class="resume__grid">
          ${section}
        </div>`,
      };
    });
  }
  
  
}

export const resumeSection = {
  title: 'Resume',
  marker: '📜',
  content: html`
 
  
    <hicks-unlock-resume></hicks-unlock-resume>
    `
};
state.update({sectionAdditions: { position: 2, template: resumeSection, change: ContentModification.INSERT }})