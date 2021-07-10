import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { ListItemController } from '../../../util/controllers/item.controller';
import { HicksListItem } from './.....toc-item.component';
import { style } from './hickslist.css';

@customElement('hicks-list')
export class HicksList extends LitElement {
  @queryAssignedNodes('', true, 'hicks-list-item')
  childSlot: NodeListOf<HicksListItem>;
  @property({ type: String, reflect: true }) path: string = '';
  @property({ type: Boolean, reflect: true }) expanded: boolean = false;
  controller: ListItemController;

  constructor() {
    super();
    this.controller = new ListItemController(this);
  }
  render(): TemplateResult {
    return html`<ul slot="children" class="list__sublist">
      <slot></slot>
    </ul>`;
  }

  willUpdate(_changedProperties: Map<string, unknown>) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('expanded')) {
      if (this.childSlot && this.childElementCount > 0) {
        this.childSlot.forEach((el: HicksListItem) => {
          el.shown = this.expanded;
        });
      }

      this.controller.updateElementCount(
        this.path,
        this.expanded ? this.childElementCount : 0
      );
    }
  }

  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
