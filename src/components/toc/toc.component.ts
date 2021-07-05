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

import { css, html, LitElement, TemplateResult } from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { IconController } from '../../icons/icon.controller';
import { style } from './tocdrawer.css';
import { repeat } from 'lit/directives/repeat.js';

import { ListChild } from '../../types/ListChild';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

import { styleMap } from 'lit/directives/style-map.js';
import { elementAt } from 'rxjs/operators';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
type SectionParameters = {
  coords: string;
  href: string;
  title: string;
  comparator: number;
  root: string;
};

export interface RepeatedLIParameters {
  count: number;
  template?: TemplateResult;
  params?: ListChild[];
}

export type ListItemParameters = {
  path: string;
  index: number;
  href: string;
  title: string;
  children: RepeatedLIParameters;
  marker: string;
};

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
const addClassIf = (
  condition: boolean,
  element: HTMLElement,
  classes: string[] | string
) => {
  if (condition) {
    addClass(element, classes);
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
  @state()
  toggledLists: Set<string> = new Set();
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) opened = true;
  headings!: HTMLHeadingElement[];
  @property({ type: Boolean, reflect: true }) mobile = true;
  observers!: {
    intersection?: IntersectionObserver;
    sectionChange?: MutationObserver;
  };
  previousOffset: number = 0;

  classes: {
    expanded: string;
    selected: string;
  } = { selected: 'is-active', expanded: 'is-expanded' };
  icons: IconController;
  sections: HTMLElement[];
  expandedLists = new Set();
  items = new Map() as Map<string, Ref<Element>>;
  list: any[];
  offsets = new Map() as Map<string, number>;
  breakpointControl: any;
  tablet: any;

  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);

    this.observers = {};
  }

  connectedCallback() {
    // This sets initial global state before subscribing to the store.
    // If we didn't do this then `this.opened` would always be set to false
    // because onStateChanged runs synchronously after we call
    // super.connectedCallback();

    super.connectedCallback();
    this.opened = true;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.breakpointControl = new BreakpointController(this);
    this.breakpointControl.observeBreakpoint(
      'screen and (max-width: 599.99px)',
      (ev) => (this.mobile = ev.matches)
    );

    this.classList.add('toc');

    this.articleContent = document.querySelector('content-tree');
    if (!this.articleContent) {
      console.warn(`Article container not found.`);
    }
    this.updateSections();
    this.observeSectionChanges();
    this.observers.intersection = this.getScrollObserver();
    this.previousOffset = this.articleContent.scrollTop;

    this.updateList();
    this.sections.forEach((section: HTMLElement, i) => {
      this.observers.intersection.observe(section);
    });
  }
  /**
   * Used to build the list template whenever sections are changed
   *
   * @param {HTMLElement[]} sections
   * @memberof TableOfContents
   */
  _refreshLinks = (sections: HTMLElement[]) => {
    const toArr = (position: string) => position.split('.');
    let sublists = new Map() as Map<string, ListChild[]>;
    const sectionData = this.getSectionData(sections);
    return sectionData.reduce((tree, heading) => {
      //prettier-ignore
      const { title, position: {root, index, path}, href, marker } = heading;
      const isActive = this.currentSectionId === href;
      //Get template for the list item's children;
      let childItems = { treePath: '', children: { count: 0 } };
      if (sublists.has(path)) {
        childItems = this.getListItemChildren(sublists, path);
      }
      const { treePath, children } = childItems;
      const itemParameters = {
        path,
        index,
        href,
        title,
        children,
        marker,
      } as ListItemParameters;
      let { template, itemRef } = this.getListItemTemplate(itemParameters);
      //A map of list items that can be referenced once the list is instantiated
      this.items.set(href, itemRef);
      //If the content is nested, group it with any other templates on the same level. Else, push the template to the tree;
      if (toArr(path).length > 1) {
        const subListItem = { template, treePath, isActive };
        this.addItemToSubList(subListItem, sublists, root);
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

  private observeSectionChanges() {
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

  private getListItemChildren(
    sublists: Map<string, ListChild[]>,
    path: string
  ) {
    let child: Partial<RepeatedLIParameters> = {};
    child.params = sublists.get(path);
    child.count = child.params.length;
    child.template = this.getSublistTemplate(path, child.params);
    let treePath = path + child.params.join('||');
    return { children: child, treePath };
  }

  private getSectionData(sections: HTMLElement[]) {
    const sectionData = sections.map((section, i) => {
      const [path, title] = section.id.split('--', 2);
      const pathArray = path.split('.');
      /////////
      //
      //[2,5,3,4]
      // Root: Ancestors of the current node = [2, 5, 3]
      // Index: The current node = [4]
      const root = pathArray.slice(0, -1).join('.');
      const index = Number(pathArray.slice(-1));

      //Sort descending by length and ascending by value (ex. 5.1.1.2 > 5.1.1.3 < 1.1.1.1 > 1.2)
      const recurseOrder = pathArray.length * 1000 + (100 - index);
      const marker = section.dataset.tocMarker;
      return {
        title,
        href: section.id,
        position: {
          root,
          index,
          path,
        },
        marker,
        recurseOrder,
      };
    });
    sectionData.sort((a, b) => b.recurseOrder - a.recurseOrder);
    return sectionData;
  }

  private getSublistTemplate(path: string, children: ListChild[]) {
    const keyDiff = (item: ListChild) => {
      return item.isActive ? '[act]' : '' + item.treePath;
    };
    const templateFn = (item: ListChild) => item.template;
    return html`<ul data-toc-position="${path}" class="list__sublist">
      ${repeat(children, keyDiff, templateFn)}
    </ul>`;
  }

  private getListItemTemplate({
    path,
    index,
    href,
    title,
    children,
    marker,
  }: ListItemParameters) {
    const itemRef = createRef();
    const depth = path.split('.').length;
    const styles = styleMap({
      '--item--index': index.toString(),
      '--item--marker': `"${marker}"`,
      '--sublist--depth': depth.toString(),
    });
    const template = html`<li
      data-toc-position="${path}"
      data-toc-children="${children.count}"
      class="list list-item"
      style="${styles}"
    >
      <div class="list-item__content">
        <a class="list-item__content__link" href="#${href}" ${ref(itemRef)}
          >${title}</a
        >
        ${children.count > 0
          ? html`<button
              class="list-item__content__expand-btn"
              @click="${this.handleExpandEvent}"
            >
              +
            </button>`
          : ''}
      </div>

      ${children.template}
    </li>`;

    return {
      template,
      itemRef,
    };
  }
  updateList() {
    this.list = this._refreshLinks(this.sections);
  }
  updateSections() {
    this.sections = Array.from(
      this.articleContent?.querySelectorAll('section')
    );
  }
  handleExpandEvent(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    let tar = button.parentElement.parentElement.querySelector('ul');

    if (tar && hasClasses(tar, 'is-locked')) {
      removeClass(tar, ['is-expanded', 'is-locked']);
      button.textContent = '+';
    } else {
      addClass(tar, ['is-expanded', 'is-locked']);
      button.textContent = '-';
    }
    this.expandParentLists(tar);
    this.updateItemOffsets();
  }
  updateItemCount() {
    const expandedChildren = String(this.expandedListChildren.length);
    this.style.setProperty('--list--item-count', expandedChildren);
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
    console.log(parent);
    while (parent?.hasAttribute('data-toc-position')) {
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
      const { tocChildren, tocPosition } = el.dataset;
      //Get element's layer within the toc
      const itemLayer = tocPosition.split('.').length;
      const hasExpandedChild = (child: HTMLElement) => {
        return hasClasses(child, this.classes.expanded);
      };
      //If there were any layers of children before this element, add their respective indices to the element's position
      let layer = itemLayer;
      let previousChildren = 0;
      while (childLayers.has(layer)) {
        previousChildren += childLayers.get(layer);
        layer++;
      }
      const offset = String(previousChildren);

      el.style.setProperty('--item--neighbor-index', offset);
      //Find if the element has an expanded child to determine whether to add it's children's layers to our element map
      if (Array.from(el.childNodes).some(hasExpandedChild)) {
        let childrenOnLayer = childLayers.has(itemLayer)
          ? childLayers.get(itemLayer)
          : 0;
        //Add element's child count to current layer
        childLayers.set(itemLayer, Number(tocChildren) + childrenOnLayer);
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
          </div>`}
      <div class="toc__track"><span class="toc-track"></span></div>
      <div class="toc__content">
        <ul class="list is-expanded">
          ${this.list}
        </ul>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
