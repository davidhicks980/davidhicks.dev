/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { html, LitElement, TemplateResult, svg } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import { style } from './toc.css';
import { ListChild } from '../../types/ListChild';
import { tocTemplates as templates } from './toc.templates';
import { HicksListItem } from './toc-item.component';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { IntersectionController } from '../../util/controllers/intersection.controller';
import { FocusController } from '../../util/controllers/focus.controller';

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */

export class TableOfContents extends LitElement {
  static styles = [style];
  /**Queries */
  @query('.list')
  rootList: HTMLUListElement;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLUListElement>;
  @queryAll('hicks-list-item')
  listItems: NodeListOf<HicksListItem>;
  @queryAll('ul[data-expanded]>hicks-list-item')
  visibleListItems: NodeListOf<HicksListItem>;
  /**Public properties */
  @property({ type: Boolean, reflect: true })
  open: boolean;
  @property({ type: Boolean, reflect: true })
  mobile = true;

  @state()
  activeId: string = '';

  controllers: {
    intersection: IntersectionController;
    breakpoint: BreakpointController;
    focus: FocusController;
  };
  //Holds the last scroll direction, in case the user switches direction. In that case, the previous scroll direction will be used
  switchDirection: number;
  //The list item template
  list: TemplateResult[];

  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.controllers = {
      intersection: new IntersectionController(this),
      breakpoint: new BreakpointController(this),
      focus: new FocusController(this),
    };
    this.controllers.breakpoint.observe('mobile').subscribe(([id, matches]) => {
      this[id] = matches ?? false;
    });
  }

  get sections(): HTMLElement[] {
    return Array.from(document.querySelectorAll('section'));
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.classList.add('toc');

    //Build the toc
    this.list = this._refreshLinks(this.sections);

    this.initIntersectionObserver();

    this.open = true;
  }
  initIntersectionObserver() {
    let margin = { top: '-49%', bottom: '-49%' },
      threshold = [0];
    const boundScroll = this.scrollSpy.bind(this);
    this.controllers.intersection
      .create('hicks-toc', null, threshold, margin)
      .observe(this.sections)
      .on('entry')
      .subscribe(boundScroll);
  }

  /**
   * Used to build the list template whenever sections are changed
   *
   * @param {HTMLElement[]} sections
   * @memberof TableOfContents
   */
  _refreshLinks = (sections: HTMLElement[]) => {
    const toArr = (position: string) => position.split('.');
    let childLists = new Map() as Map<string, ListChild[]>;
    const sectionInfo = this.getSectionAttributes(sections);
    sectionInfo.sort((a, b) => b.sortOrder - a.sortOrder);
    return sectionInfo.reduce((tree, heading) => {
      //prettier-ignore
      const { title, position: {root, index, path}, href, marker } = heading,
      //prettier-ignore
       isActive = this.activeId === href,
      //Get template for the list item's children
       {  fullPath,  childList } = templates.buildChildlist(childLists, path),
        template = templates.listItem(
        childList,
        this.handleToggleEvent,
        { path, href, title, marker, index }
      );

      //If the content is nested, group it with any other templates on the same level. Else, push the template to the tree
      if (toArr(path).length > 1) {
        const subListItem = { template, treePath: fullPath, isActive };
        this.addItemToSubList(subListItem, childLists, root);
      } else {
        tree.push(template);
      }
      return tree;
    }, []);
  };

  private addItemToSubList(
    item: ListChild,
    sublists: Map<string, ListChild[]>,
    root: string
  ) {
    //If the root (aka the parent ul element) of the item already has an entry, push the item to it. Otherwise, create a new array for child elements of the parent ul (iow, list items).
    return sublists.has(root)
      ? sublists.get(root).push(item)
      : sublists.set(root, [item]);
  }
  /*[2,5,3,4]
       Root: Ancestors of the current node = [2, 5, 3]
       Index: The current node = [4]*/
  private getSectionAttributes(sections: HTMLElement[]) {
    return sections.map((section, i) => {
      let [path, title] = section.id.split('--', 2),
        position = { root: '', index: 0, path },
        pathArray = path.split('.'),
        depth = pathArray.length * 1000;
      position.root = pathArray.slice(0, -1).join('.');
      position.index = Number(pathArray.slice(-1));
      return {
        title,
        href: section.id,
        position,
        marker: section.dataset.tocMarker,
        sortOrder: depth * 1000 + (100 - position.index),
      };
    });
  }

  handleToggleEvent(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    let tar = button.parentElement.parentElement.querySelector('ul');

    if (tar) {
      tar.toggleAttribute('data-expanded');
    }
    this.expandAncestorLists(tar);
    this.updateItemOffsets();
  }
  updateItemCount() {
    const expandedChildren = String(this.visibleListItems.length);
    this.style.setProperty('--list--item-count', expandedChildren);
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('mobile')) {
      if (this.mobile === true) {
        console.log(this.rootList);
        this.controllers.focus.trapElementChildren(
          this.rootList,
          this.listItems.item(0)
        );
      } else {
        this.controllers.focus.releaseFocus();
      }
    }
  }
  scrollSpy(sections: IntersectionObserverEntry[]): void {
    if (!this.sections.length || !sections) return;
    const previousActiveId = this.activeId;
    const intersectingSections = sections.filter(
      (section) => section.isIntersecting
    );
    //Take the most recent intersection if one exists. Otherwise, take the last intersecting item
    this.activeId = intersectingSections[0].target.id || this.activeId;

    //Make sure we do not already have the correct element selected
    if (previousActiveId !== this.activeId) {
      let map = this.itemMap();
      const currLI = map.get(this.activeId);
      currLI.activate();
      const prevLI = map.get(previousActiveId);
      if (prevLI) {
        prevLI.deactivate();
      }

      if (this.sublists.length > 0) {
        this.sublists.forEach(this.collapseList);
      }
      this.expandAncestorLists(currLI);
      this.updateItemOffsets();
    }
  }
  private collapseList(list: HTMLUListElement) {
    list.toggleAttribute('data-expanded', false);
  }
  private expandList(list: HTMLUListElement) {
    list.toggleAttribute('data-expanded', true);
    Array.from(list.children).forEach((element) => {
      (element as HicksListItem).shown = true;
    });
  }

  private expandAncestorLists(currLI: Element) {
    let parent = currLI?.parentElement;
    while (
      parent?.hasAttribute('data-position') ||
      parent.tagName === 'HICKS-LIST-ITEM'
    ) {
      if (parent.tagName === 'UL') {
        this.expandList(parent as HTMLUListElement);
      }
      parent = parent.parentElement;
    }
    this.updateItemOffsets();
  }

  private updateItemOffsets() {
    this.updateItemCount();
    const childLayers = new Map() as Map<number, number>; // keep track of layers and item count. If a prior sibling has more children than the current item, shift the current element by the number of siblings;
    Array.from(this.visibleListItems).map((el: HicksListItem, i) => {
      const { childItems, path } = el;
      //Get element's layer within the toc
      const itemLayer = path.split('.').length;

      //If there were any layers of children before this element, add their respective indices to the element's position
      let layer = itemLayer,
        previousChildren = 0;
      while (childLayers.has(layer)) {
        previousChildren += childLayers.get(layer);
        layer++;
      }
      const offset = previousChildren;
      el.offset = offset;
      //Find if the element has an expanded child to determine whether to add it's children's layers to our element map
      if (el.getSlottedList()?.hasAttribute('data-expanded')) {
        let childrenOnLayer = childLayers.has(itemLayer)
          ? childLayers.get(itemLayer)
          : 0;
        //Add element's child count to current layer
        childLayers.set(itemLayer, Number(childItems) + childrenOnLayer);
      }
    });
  }

  itemMap() {
    return new Map(Array.from(this.listItems).map((el) => [el.href, el]));
  }

  render() {
    return html`
      ${this.mobile
        ? ''
        : html`<div class="toc__head">
              <div class="toc__label">
                <span>Content</span>
              </div>
            </div>
            <!--<div class="toc__track"><span class="track"></span></div>--> `}
      ${templates.list(this.list)}
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
