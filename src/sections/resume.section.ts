import { html, TemplateResult } from 'lit';
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
}
export class Resume {
  private _arrayMap: ResumeEntry[];
  private _title: string;
  private _subcontent: { title: string; content: TemplateResult<1> }[];
  get title(){
    return this._title;
  }
  get content(){
    return  html`
  <hicks-unlock-resume>
      
  </hicks-unlock-resume>
        <button
          id="view-resume-cv"
          aria-label="Choose whether to view my CV or my resume"
          role="switch"
          class="button--primary"
          aria-checked="true"
          data-primary-button
        >
          View CV
        </button>
        <button
          id="show-hide-details"
          aria-label="Display the details of each resume entry"
          class="button--secondary"
          data-secondary-button
        >
          Expand Details
        </button> `
  }
  get subcontent(){
    return this._subcontent
  }
  get template() {
    return {
      title: this._title,
      content: this.content,
      subcontent: this._subcontent,
    };
  }
  constructor(entries: ResumeEntry[]) {
    this._arrayMap = this._sortEntriesByDate(entries as ResumeEntry[]);
      this._subcontent = this._getGroupedArrayMap(this._arrayMap, 'section');
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
    return details.map((detail) => html`<li>${detail}</li>`);
  }
  private _getEntryDate(date) {
    return new Date(date).toLocaleDateString('default', {
      month: 'short',
      year: 'numeric',
    });
  }
  private _getEntryTemplate(entries: ResumeEntry) {
    return Object.entries(entries).map(([key, value]) => {
      let content;
      switch (key) {
        case 'detail':
          content = this._getDetail(value);
          break;
        case 'startDate':
        case 'endDate':
          content = this._getEntryDate(value);
          break;
        default:
          content = value;
          break;
      }
      return html`<span slot="${key}">${content}</span> `;
    });
  }
  private _getGroupedArrayMap(entryList: ResumeEntry[], groupBy: string) {
    let map = new Map() as Map<string, TemplateResult<1>[]>;
    let entries = entryList.slice();
    let length = entries.length;
    while (entries.length) {
      let entry = entries.pop() as ResumeEntry;
      let key = entry[groupBy];
      let content = html`
        <hicks-resume-entry index="${length - entries.length}">
          ${this._getEntryTemplate(entry)}
          <button slot="expand-button"></button>
        </hicks-resume-entry>
      `;

      if (key) {
        map.has(key) ? map.get(key).push(content) : map.set(key, [content]);
      }
    }
    return Array.from(map.entries()).map(([title, section]) => {
      return {
        title,
        content: html`<div class="resume__grid">${section}</div>`,
      };
    });
  }
  
  
}

export const resumeSection = {
  title: 'Resume',
  marker: '',
  content: html`
    <hicks-unlock-resume></hicks-unlock-resume>
    `
};