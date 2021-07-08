import { html, nothing, svg, TemplateResult } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { ListChild } from '../../types/ListChild';
import { ChildList } from '../../types/ChildList';
import { ListItemParameters } from '../../types/ListItemParameters';

export const tocTemplates = {
  expandIcon: svg`<svg
slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    class="expand-icon"
  >
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>`,
  expandButton() {
    return html`<hicks-icon-expand-button
      class="list-item__content__expand-btn"
      height="24px"
      width="24px"
      slot="expand-button"
    >
      ${this.expandIcon}
    </hicks-icon-expand-button>`;
  },
  listItem(
    children: Partial<ChildList>,
    { path, href, title, marker, index }: ListItemParameters
  ) {
    const { count: childCount, template: childList } = children,
      reference = createRef(),
      expandButton = childCount > 0 ? this.expandButton() : '',
      template = html`<hicks-list-item
        childCount="${childCount}"
        index="${index}"
        path="${path}"
        href="${href}"
        ${ref(reference)}
      >
        <span slot="prefix">${marker}</span>
        <span slot="link">${title}</span>
        <span slot="suffix">${expandButton}</span>
        ${childList}
      </hicks-list-item>`;
    /*html`<li
        data-children="${childCount}"
        data-position="${path}"
        class="list list-item"
        style="${styleMap(styles)}"
      >
        <div data-marker="${marker}" class="list-item__content">
          <a class="list-item__content__link" href="#${href}" ${ref(reference)}
            >${title}</a
          >
          ${childCount ? expandButton : ''}
        </div>

        ${childTemplate}
      </li>`;*/

    return {
      template,
      reference,
    };
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
      <ul data-expanded-list class="list">
        ${list}
      </ul>
    </div>`;
  },
};
