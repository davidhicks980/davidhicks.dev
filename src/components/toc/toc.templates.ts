import { html, nothing, svg, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ListChild } from '../../types/ListChild';
import { ChildList } from '../../types/ChildList';
import { ListItemParameters } from '../../types/ListItemParameters';

export const tocTemplates = {
  expandIcon: svg`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    class="expand-icon"
  >
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>`,
  expandButton(clickHandler: Function) {
    return html`<hicks-icon-expand-button
      class="list-item__content__expand-btn"
      @toggle="${clickHandler}"
    >
      ${this.expandIcon}
    </hicks-icon-expand-button>`;
  },
  listItem(
    children: Partial<ChildList>,
    clickHandler: Function,
    { path, href, title, marker, index }: ListItemParameters
  ) {
    const { count: childCount, template: childTemplate } = children,
      expandButton = childCount > 0 ? this.expandButton(clickHandler) : '',
      styles = {
        '--item--index': index.toString(),
      };
    return html`<hicks-list-item
      childItems="${childCount}"
      position="${path}"
      marker="${marker}"
      path="${path}"
      href="${href}"
      ?active="${false}"
      class="list list-item"
      style="${styleMap(styles)}"
    >
      <span slot="prefix">${marker}</span>
      <span slot="link">${title}</span>
      <span slot="suffix">${expandButton}</span>

      ${childTemplate}
    </hicks-list-item>`;
  },
  childList(path: string, children: ListChild[]) {
    const keyDiff = (child: ListChild) => {
      return child.isActive ? '[act]' : '' + child.treePath;
    };
    const templateFn = (item: ListChild) => item.template;
    return html`<ul
      slot="children"
      data-position="${path}"
      class="list__sublist"
    >
      ${repeat(children, keyDiff, templateFn)}
    </ul>`;
  },
  emptyChildList: { fullPath: '', childList: { count: 0, template: nothing } },

  buildChildlist: function (sublists: Map<string, ListChild[]>, path: string) {
    if (!sublists.has(path)) {
      return this.emptyChildList;
    }
    let childList: Partial<ChildList> = {};
    childList.params = sublists.get(path);
    childList.count = childList.params.length;
    childList.template = this.childList(path, childList.params);
    let fullPath = path + childList.params.join('||');
    return { childList, fullPath };
  },
  list(list: TemplateResult | TemplateResult[]) {
    return html`<div class="toc__list">
      <ul data-expanded class="list is-expanded">
        ${list}
      </ul>
    </div>`;
  },
};
