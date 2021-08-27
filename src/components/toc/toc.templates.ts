import { html, nothing, svg, TemplateResult } from 'lit';
import './toc-item.component';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ListChild } from '../../types/ListChild';
import { ChildList } from '../../types/ChildList';
import '../toggle/expansion.toggle.adapter';
import { ListItemParameters } from '../../types/ListItemParameters';
import { ifDefined } from 'lit/directives/if-defined.js';
export const tocTemplates = {
  expandIcon: () => svg`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    class="expand-icon"
  >
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>`,

  listItem(
    children: Partial<ChildList>,
    { path, href, title, marker, index }: ListItemParameters
  ) {
    const { count: childCount, template: childTemplate } = children,
      styles = {
        '--item--index': index.toString(),
      };
    return html`<hicks-list-item
      childItems="${ifDefined(childCount)}"
      marker="${marker}"
      path="${path}"
      link="${href}"
      ?active="${false}"
      class="list list-item"
      style="${styleMap(styles)}"
    >
      <span slot="prefix">${marker}</span>
      <span class="link-text" slot="link">${title}</span>
      <span slot="suffix">
        <hicks-expansion-toggle class="list-item__content__expand-btn">
          ${this.expandIcon()}
        </hicks-expansion-toggle>
      </span>

      ${childTemplate}
    </hicks-list-item>`;
  },
  childList(children: ListChild[]) {
    const keyDiff = (child: ListChild) => {
      return child.treePath;
    };
    const templateFn = (item: ListChild) => {
      return item.template;
    };
    return html`${repeat(children, keyDiff, templateFn)}`;
  },
  emptyChildList: { fullPath: '', childList: { count: 0, template: nothing } },

  buildChildlist: function (sublists: Map<string, ListChild[]>, path: string) {
    if (!sublists.has(path)) {
      return this.emptyChildList;
    }
    const childList: Partial<ChildList> = {};
    childList.params = sublists.get(path);
    childList.count = childList.params.length;
    childList.template = this.childList(childList.params);
    const fullPath = path + childList.params.join('||');
    return { childList, fullPath };
  },
  list(list: TemplateResult | TemplateResult[]) {
    return html`<div class="toc__list">
      <ul class="root-list list">
        ${list}
      </ul>
    </div>`;
  },
};
