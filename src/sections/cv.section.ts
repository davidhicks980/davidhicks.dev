import { html, TemplateResult } from 'lit';
import {resumeEntries} from '../assets/content.json'


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
function sortEntriesByDate(entries: ResumeEntry[]) {
  let pred = (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate);
  return entries.sort(pred);
}
const getDetail = (detail) => {
 let details = [''];
    if (!Array.isArray(detail)) {
      details = [detail] as string[];
    } else {
      details = detail as string[];
    }
    return details.map((detail) => html`<li>${detail}</li>`);

  };


 const getDate =(date) => new Date(date).toLocaleDateString('default', {
              month: 'short',
              year: 'numeric',
            })
  


function getEntryTemplate(entries: ResumeEntry){
    return Object.entries(entries).map(([key, value]) => {
        let content;
        switch(key){
            case 'detail': 
             content = getDetail(value); 
             break;
             case 'startDate':
             case 'endDate':
                 content = getDate(value); 
                 break;
             default: 
             content = value;
             break;
        }
        return html`<span slot="${key}">${content}</span> `
      })}
function getGroupedArrayMap(entryList: ResumeEntry[], groupBy: string) {
  let map = new Map() as Map<string, TemplateResult<1>[]>
  let entries = entryList.slice()
  let length = entries.length;
  while (entries.length) {
    let entry = entries.pop() as ResumeEntry;
    let key = entry[groupBy];
    let content = html`
        <hicks-resume-entry index="${length - entries.length}">
            ${getEntryTemplate(entry)}
            <button slot="expand-button"></button>
        </hicks-resume-entry>
        `;
    
    if (key) {
      map.has(key) ? map.get(key).push(content) : map.set(key, [content]);
    }
  }
  return Array.from(map.entries()).map(([title, section])=>{
    return {
      title, 
      content: html`<hicks-grid item-width="1fr" autofill-column>${section}</hicks-grid>`
    }
  })
}
////////////////////
let arrayMap = sortEntriesByDate(resumeEntries as ResumeEntry[])

export const out = {title: 'Resume', subcontent: getGroupedArrayMap(arrayMap,'section')}
