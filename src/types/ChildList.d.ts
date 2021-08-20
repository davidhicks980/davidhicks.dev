import { TemplateResult } from 'lit';
import { ListChild } from './ListChild';

export interface ChildList {
  count: number;
  template?: TemplateResult | Symbol;
  params?: ListChild[];
}
