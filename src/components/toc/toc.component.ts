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

import { html, LitElement, TemplateResult } from 'lit';
import { property, queryAll, queryAsync, state } from 'lit/decorators.js';
import { style } from './toc.css';
import { ListChild } from '../../types/ListChild';
import { Ref } from 'lit/directives/ref.js';

import { HicksIconToggleButton } from '../icon-button/icon-button';
import { tocTemplates as templates } from './toc.templates';
import { HicksItemComponent } from './toc-item.component';
import { ListItemController } from '../../util/controllers/table-of-contents.controller';

customElements.define('hicks-icon-expand-button', HicksIconToggleButton);

const mutationCallback =
  (updateSections: () => void) =>
  (mutationList: MutationRecord[]): void => {
    mutationList
      .filter((mutation) => mutation.type === 'childList')
      .map((mutation) => [
        ...Object.values(mutation.addedNodes),
        ...Object.values(mutation.removedNodes),
      ])
      .some((node) => {
        return 'tagName' in node
          ? node['tagName'].toLowerCase() === 'section'
          : false;
      })
      ? updateSections()
      : null;
  };

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */

export class TableOfContents extends LitElement {
  static styles = [style];

  @queryAll('active')
  links: NodeListOf<HTMLAnchorElement>;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLUListElement>;
  @queryAll('ul[data-expanded-list]>hicks-list-item')
  expandedULists: NodeListOf<HicksItemComponent>;
  @queryAll('hicks-list-item')
  listItems: NodeListOf<HicksItemComponent>;
  @queryAsync('hicks-list-item')
  itemsAttached;
  @state()
  currentSectionId: string = '';
  @property({ type: Boolean, reflect: true })
  open: boolean;
  @state()
  toggledLists: Set<string> = new Set();
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) mobile = true;
  @property({ type: Boolean, reflect: true }) tablet = true;

  @property({ type: String }) expandIcon!: string | null;

  headings!: HTMLHeadingElement[];

  previousOffset: number = 0;

  classes: {
    expanded: string;
    selected: string;
  } = { selected: 'is-active', expanded: 'is-expanded' };
  observers!: {
    intersection?: IntersectionObserver;
    sectionChange?: MutationObserver;
  };
  sections: HTMLElement[];
  expandedLists = new Set();
  items = new Map() as Map<string, Ref<HicksItemComponent>>;
  list: TemplateResult[];
  offsets = new Map() as Map<string, number>;
  breakpointControl: any;
  attached: boolean = false;
  itemController: ListItemController;
  observer!: MutationObserver;

  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);

    this.observers = {};
  }

  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.classList.add('toc');
    this.itemController = new ListItemController(this);

    /* const childNodeMap = new Map() as Map<string, number>;

    const listMutCB = function (
      this: TableOfContents,
      mutationList: MutationRecord[]
    ) {
      mutationList.map((mutation: MutationRecord) => {
        const tar = mutation.target as HTMLUListElement;
        if (tar && tar.hasAttribute('data-expanded-list')) {
          childNodeMap.set(tar.dataset.position, tar.childElementCount);
        } else {
          childNodeMap.set(tar.dataset.position, 0);
        }
      });

      const nodeArray = Array.from(childNodeMap);
      this.updateItemCount(
        nodeArray.reduce((a, [path, value]) => {
          return a + value;
        }, 0)
      );
      this.itemController.updateItems(nodeArray);
    };

    let mut = listMutCB.bind(this);
    this.observer = new MutationObserver(mut);
    this.observer.observe(this.shadowRoot, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['data-expanded-list'],
    });*/
    this.articleContent = document.querySelector('content-tree');
    if (!this.articleContent) {
      console.warn(`Article container not found.`);
    }
    //Get sections
    this.updateSections();
    //Build the toc
    this.list = this._refreshLinks(this.sections);

    this.observeSectionMutations();

    this.previousOffset = this.articleContent.scrollTop;
    this.mobile = window.matchMedia('(max-width: 599.99px)').matches;
    this.observers.intersection = this.getScrollObserver();
    this.sections.forEach((section: HTMLElement, i) => {
      this.observers.intersection.observe(section);
    });

    this.scrollSpy(this.observers.intersection.takeRecords());
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
       isActive = this.currentSectionId === href,
      //Get template for the list item's children
       {  fullPath,  childList } = templates.buildChildlist(childLists, path),
       { template, reference } = templates.listItem(
        childList,
        { path, href, title, marker, index }
      );

      //A map of list item references that can be referenced once the list is instantiated. Used when manipulating list items
      this.items.set(href, reference as Ref<HicksItemComponent>);

      //If the content is nested, group it with any other templates on the same level. Else, push the template to the tree;
      if (toArr(path).length > 1) {
        const subListItem = { template, treePath: fullPath, isActive };
        this.addItemToSubList(subListItem, childLists, root);
      } else {
        tree.push(template);
      }
      return tree;
    }, []);
  };

  getScrollDirection = () => {
    const currentOffset = window.scrollY;
    const sign = Math.sign(this.previousOffset - currentOffset);
    this.previousOffset = currentOffset;
    return sign;
  };

  private getScrollObserver() {
    return new IntersectionObserver(this.scrollSpy, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.9],
    });
  }

  private observeSectionMutations() {
    this.observers.sectionChange = new MutationObserver(
      mutationCallback(this.updateSections)
    );
    this.observers.sectionChange.observe(this.articleContent, {
      childList: true,
    });
  }

  private addItemToSubList(
    item: ListChild,
    sublists: Map<string, ListChild[]>,
    root: string
  ) {
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

  updateSections() {
    this.sections = Array.from(
      this.articleContent?.querySelectorAll('section')
    );
  }

  updateItemCount(count: number) {
    this.style.setProperty('--list--item-count', String(count));
  }

  scrollSpy(sections: IntersectionObserverEntry[]): void {
    if (!this.sections.length || !sections) return;
    const lastVisitedSection = this.currentSectionId;
    //Returns 1 if scrolling up, -1 if scrolling down
    const sort = this.getScrollDirection();
    const getTop = (el: HTMLElement) => el.getBoundingClientRect().top,
      sortPredicate = (a, b) => Math.sign(sort * (getTop(b) - getTop(a)));

    //If a section is intersecting, mark it as such with in-viewport class
    sections.forEach((section) => {
      let tar = section.target as HTMLElement;
      if (section.isIntersecting) {
        tar.classList.add('in-viewport');
      }
    });

    const sortedSections = this.sections
      .filter((item) => item.classList.contains('in-viewport'))
      //Want a larger top when scrolling down => means element is further down the page
      .sort(sortPredicate);
    if (!sortedSections.length) return;

    this.currentSectionId = sortedSections[0].id;

    if (
      lastVisitedSection !== this.currentSectionId ||
      this.currentSectionId === ''
    ) {
      const currLI = this.getListItemInstance(this.currentSectionId);
      const prevLI = this.getListItemInstance(lastVisitedSection);
      if (currLI && prevLI) {
        prevLI.active = false;
        currLI.active = true;
      }
      this.sublists.forEach((el) =>
        el.toggleAttribute('dataset-expanded-list', false)
      );
      this.expandParentLists(currLI);
      this.updateItemOffsets();
    }
  }
  private expandParentLists(currLI: HicksItemComponent) {
    let parent = currLI?.closest('ul');
    while (!parent.classList.contains('toc__list')) {
      parent.toggleAttribute('dataset-expanded-list', true);
      parent = parent.closest('ul');
    }
  }
  updated(_changedProperties: Map<string, unknown>) {
    super.updated(_changedProperties);
  }

  private updateItemOffsets() {
    const childLayers = new Map() as Map<number, number>; // keep track of layers and item count. If a prior sibling has more children than the current item, shift the current element by the number of siblings;
    Array.from(this.expandedULists).map((el: HicksItemComponent, i) => {
      const path = el.getAttribute('path');
      const childCount = el.getAttribute('childCount');
      //Get element's layer within the toc
      console.log(path, childCount);
      const itemLayer = path.split('.').length;
      //If there were any layers of children before this element, add their respective indices to the element's position
      let layer = itemLayer,
        previousElementChildren = 0;
      while (childLayers.has(layer)) {
        previousElementChildren += childLayers.get(layer);
        layer++;
      }
      const offset = previousElementChildren.toString();
      el.style.setProperty('--item--offset', offset);
      //Find if the element has an expanded child to determine whether to add it's children's layers to our element map
      if (el.hasAttribute('shown')) {
        let childrenOnLayer = childLayers.has(itemLayer)
          ? childLayers.get(itemLayer)
          : 0;
        //Add element's child count to current layer
        childLayers.set(itemLayer, Number(childCount) + childrenOnLayer);
      }
    });
  }

  getListItemInstance(linkHref: string): HicksItemComponent {
    return this.items.get(linkHref)?.value as HicksItemComponent;
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
