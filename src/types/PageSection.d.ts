import { TemplateResult } from 'lit';

export type PageSection = {
  title: string;
  content?: TemplateResult;
  subcontent?: PageSection[];
  marker?: string;
};
