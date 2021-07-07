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
import { property, queryAll, state } from 'lit/decorators.js';
import { style } from './toc.css';
import { ListChild } from '../../types/ListChild';
import { Ref } from 'lit/directives/ref.js';
import { HicksIconToggleButton } from '../icon-button/icon-button';
import { tocTemplates as templates } from './toc.templates';
import { ListItemParameters } from '../../types/ListItemParameters';

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

const addClass = (toElement: HTMLElement, classes: string[] | string) => {
  toElement?.classList?.add(...(Array.isArray(classes) ? classes : [classes]));
};
const removeClass = (fromElement: HTMLElement, classes: string[] | string) => {
  fromElement?.classList?.remove(
    ...(Array.isArray(classes) ? classes : [classes])
  );
};
const swapClasses = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  classes: string[] | string
) => {
  if (toElement) addClass(toElement, classes);
  if (fromElement) removeClass(fromElement, classes);
};
const toggleClassIf = (
  element: HTMLElement,
  condition: boolean,
  classes: string[] | string
) => {
  if (condition) {
    addClass(element, classes);
  } else {
    removeClass(element, classes);
  }
};
const removeClassIf = (
  element: HTMLElement,
  classes: string[] | string,
  condition: boolean
) => {
  if (condition) {
    removeClass(element, classes);
  }
};

function hasClasses(el: HTMLElement, classes: string[] | string) {
  if (el && el.classList) {
    if (Array.isArray(classes)) {
      return (classes as string[]).every((cl) => el.classList.contains(cl));
    } else {
      return el.classList.contains(classes as string);
    }
  }
}

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */

export class TableOfContents extends LitElement {
  static styles = [style];

  @queryAll('.is-active')
  links: NodeListOf<HTMLAnchorElement>;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLUListElement>;
  @queryAll('.is-expanded>li')
  expandedListChildren: NodeListOf<HTMLLIElement>;

  @state()
  currentSectionId: string = '';
  @property({ type: Boolean, reflect: true })
  open: boolean;
  @state()
  toggledLists: Set<string> = new Set();
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) mobile = true;
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
  items = new Map() as Map<string, Ref<Element>>;

  list: TemplateResult[];
  offsets = new Map() as Map<string, number>;
  breakpointControl: any;
  tablet: any;

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
        this.handleToggleEvent,
        { path, href, title, marker, index }
      );

      //A map of list items references that can be referenced once the list is instantiated. Used when manipulating list items
      this.items.set(href, reference);

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
  handleToggleEvent(e: MouseEvent) {
    console.log(e);
    const button = e.target as HTMLButtonElement;
    let tar = button.parentElement.parentElement.querySelector('ul');

    if (tar && hasClasses(tar, 'is-locked')) {
      removeClass(tar, ['is-expanded', 'is-locked']);
    } else {
      addClass(tar, ['is-expanded', 'is-locked']);
    }
    this.expandParentLists(tar);
    this.updateItemOffsets();
  }
  updateItemCount() {
    const expandedChildren = String(this.expandedListChildren.length);
    this.style.setProperty('--list--item-count', expandedChildren);
  }
  update(_changedProperties) {
    super.update(_changedProperties);
    if (_changedProperties.has('open') || _changedProperties.has('mobile')) {
      this.updateItemOffsets();
    }
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
      toggleClassIf(tar, section.isIntersecting, 'in-viewport');
    });

    const sortedSections = this.sections
      .filter((item) => hasClasses(item, 'in-viewport'))
      //Want a larger top when scrolling down => means element is further down the page
      .sort(sortPredicate);
    if (!sortedSections.length) return;

    this.currentSectionId = sortedSections[0].id;

    if (lastVisitedSection !== this.currentSectionId) {
      const currLI = this.getListItemInstance(this.currentSectionId);
      const prevLI = this.getListItemInstance(lastVisitedSection);
      swapClasses(prevLI, currLI, this.classes.selected);

      if (this.sublists.length > 0) {
        this.sublists.forEach((list: HTMLUListElement) => {
          removeClassIf(list, 'is-expanded', !hasClasses(list, 'is-locked'));
        });
      }
      this.expandParentLists(currLI);
      this.updateItemOffsets();
    }
  }
  private expandParentLists(currLI: Element) {
    let parent = currLI?.parentElement.parentElement;
    while (parent?.hasAttribute('data-position')) {
      if (parent.tagName.toLowerCase() === 'ul') {
        addClass(parent, 'is-expanded');
      }
      parent = parent.parentElement;
    }
  }

  private updateItemOffsets() {
    this.updateItemCount();
    const childLayers = new Map() as Map<number, number>; // keep track of layers and item count. If a prior sibling has more children than the current item, shift the current element by the number of siblings;
    Array.from(this.expandedListChildren).map((el: HTMLElement, i) => {
      const { children, position } = el.dataset;
      //Get element's layer within the toc
      const itemLayer = position.split('.').length;
      const hasExpandedChild = (child: HTMLElement) => {
        return hasClasses(child, this.classes.expanded);
      };
      //If there were any layers of children before this element, add their respective indices to the element's position
      let layer = itemLayer,
        previousChildren = 0;
      while (childLayers.has(layer)) {
        previousChildren += childLayers.get(layer);
        layer++;
      }
      const offset = previousChildren.toString();

      el.style.setProperty('--item--neighbor-index', offset);
      //Find if the element has an expanded child to determine whether to add it's children's layers to our element map
      if (Array.from(el.childNodes).some(hasExpandedChild)) {
        let childrenOnLayer = childLayers.has(itemLayer)
          ? childLayers.get(itemLayer)
          : 0;
        //Add element's child count to current layer
        childLayers.set(itemLayer, Number(children) + childrenOnLayer);
      }
    });
  }

  getListItemInstance(linkHref: string): HTMLElement {
    return this.items.get(linkHref)?.value as HTMLElement;
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
