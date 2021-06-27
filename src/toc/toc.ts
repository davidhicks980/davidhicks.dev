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
import {
  property,
  customElement,
  query,
  queryAll,
  state,
} from 'lit/decorators.js';
import { StateController } from '../component-state';
import { IconController } from '../icons/icon.controller';
import { style } from './toc.css';
import { repeat } from 'lit/directives/repeat.js';

import { ListChild } from './ListChild';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

import { flip } from '@lit-labs/motion';
type SectionParameters = {
  coords: string;
  href: string;
  title: string;
  comparator: number;
  root: string;
};

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
@customElement('hicks-toc')
export class TableOfContents extends LitElement {
  @query('.is-active')
  activeLink: HTMLAnchorElement;
  @queryAll('.is-active')
  links: NodeListOf<HTMLAnchorElement>;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLAnchorElement>;

  links2: NodeListOf<HTMLAnchorElement>;
  @state()
  activeLinkId: string = '';
  activeClass: string;
  tocVisibleClass: string;
  tocHTML!: any;
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) opened = true;
  headings!: HTMLHeadingElement[];
  observers!: {
    intersection?: IntersectionObserver;
    mutation?: MutationObserver;
  };
  previousOffset: number = 0;

  icons: IconController;
  stateObserver: StateController;
  listDiff: Map<number, string[]> = new Map();
  expandedClass: string;
  expandedHrefs = [];
  expandedPaths = ['1.1', '2.1.1'];
  sections: HTMLElement[];
  expandedLists = new Set();
  items = new Map() as Map<string, Ref<Element>>;
  needsUpdate: boolean = true;
  list: any[];
  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.activeClass = 'is-active';
    this.expandedClass = 'is-expanded';
    this.icons = new IconController(this, 'openBook');
    this.stateObserver = new StateController(this);
    this.observers = {};
  }

  toggle() {
    this.opened = !this.opened;
    this.icons.name = this.opened ? 'close' : 'openBook';
  }

  close() {
    this.opened = false;
  }
  open() {
    this.opened = true;
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
    this.articleContent = document.querySelector('content-tree');
    if (!this.articleContent) {
      console.warn(`Article container not found.`);
    }
    this.sections = this.getSections();
    this.previousOffset = this.articleContent.scrollTop;

    const mutationCallback = (mutationList: MutationRecord[]) => {
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
        ? (this.sections = this.getSections())
        : null;
    };

    this.observers.mutation = new MutationObserver(mutationCallback);
    this.observers.mutation.observe(this.articleContent, { childList: true });
    this.observers.intersection = new IntersectionObserver(this.scrollSpy, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.9],
    });

    this.classList.add('toc');

    this.sections.forEach((section: HTMLElement, i) => {
      this.observers.intersection.observe(section);
    });
    this.updateList();
  }

  _refreshLinks = (sections: HTMLElement[]) => {
    if (sections) {
      var { nodes, subLists } = this.getSectionData(sections);
      const nodelist = nodes?.reduce((tree, heading, i) => {
        const { arr, string } = heading;
        let path = string.href;
        let childContent;
        //If the node has children, diff and append the node's children to a ul group within the node's li.
        if (subLists.has(string.coords)) {
          const children = subLists.get(string.coords);
          /*   const childPath = children.map((child) =>
            child.active ? '[act]' : '' + child.path
          );*/

          childContent = this.getSubList(string, children);

          path = path + children.join('--');
        }

        const active = this.activeLinkId === string.href;
        // isExpanded = this.expandedPaths.some((path: string) =>
        //  path.includes(string.coords)
        // );
        //Make the template, nesting childContent if applicable;

        const ref = createRef();
        let li = this.getListItem(arr, string, childContent, ref);
        this.items.set(string.href, ref);
        //If the content is nested, group it with any other templates on the same level. Else, push the template to the tree;
        if (arr.coords.length > 1) {
          if (subLists.has(string.root)) {
            subLists.get(string.root).push({ li, path, active });
          } else {
            subLists.set(string.root, [{ li, path, active }]);
          }
        } else {
          tree.push(li);
        }
        return tree;
      }, []);
      this.needsUpdate = false;
      return nodelist;
    }
  };

  getScrollDirection = () => {
    const currentOffset = window.scrollY;
    const sign = Math.sign(this.previousOffset - currentOffset);
    this.previousOffset = currentOffset;
    return sign;
  };

  private getSectionData(sections: HTMLElement[]) {
    const nodes = sections.map((section) => {
      const href = section.id;
      const [hrefCoords, hrefTitle] = href.split('__', 2);
      const coords = hrefCoords.split('.');
      const localIndex = coords.slice(-1);
      const root = coords.slice(0, -1).join('.');
      const len = coords.length;
      //Sort descending by length and ascending by value (ex. 5.1.1.2 > 5.1.1.3 < 1.1.1.1 > 1.2)
      const comparator = len * 1000 + (100 - Number(localIndex));
      return {
        arr: { coords },
        string: {
          coords: hrefCoords,
          href,
          title: hrefTitle,
          comparator,
          root,
        },
      };
    });
    nodes.sort((a, b) => b.string.comparator - a.string.comparator);
    let subLists = new Map() as Map<string, ListChild[]>;
    return { nodes, subLists };
  }

  private getSubList(string: SectionParameters, children: ListChild[]) {
    const keyDiff = (item: ListChild) =>
      item.active ? '[act]' : '' + item.path;
    const templateFn = (item: ListChild) => item.li;
    return html`<ul
      ${flip()}
      data-toc-position="${string.coords}"
      class="list__sublist"
    >
      ${repeat(children, keyDiff, templateFn)}
    </ul>`;
  }

  private getListItem(
    arr: { coords: string[] },
    string: SectionParameters,
    childContent: TemplateResult<2 | 1>,
    reference: Ref
  ) {
    return html`<li
      data-toc-position="${arr.coords.join('.')}"
      class="list__item"
    >
      <a
        data-toc-position="${arr.coords.join('.')}"
        class="list__item__link"
        href="#${string.href}"
        ${flip()}
        ${ref(reference)}
        >${string.title}</a
      >
      ${childContent}
    </li>`;
  }
  updateList() {
    this.list = this._refreshLinks(this.sections);
  }
  getSections(): HTMLElement[] {
    return Array.from(this.articleContent?.querySelectorAll('section'));
  }
  scrollSpy(sections: IntersectionObserverEntry[]) {
    const lastActive = this.activeLinkId;
    const isScrollingDown = this.getScrollDirection() < 0;
    const down = isScrollingDown;
    const sort = down ? 1 : -1;

    sections.forEach((section) => {
      if (section.isIntersecting) {
        section.target.classList.add('in-viewport');
      } else {
        section.target.classList.remove('in-viewport');
      }
    });
    const active = this.sections
      .filter((item) => item.classList.contains('in-viewport'))
      //Want a larger top when scrolling down => means element is further down the page
      .sort((a, b) =>
        Math.sign(
          sort * (b.getBoundingClientRect().top - a.getBoundingClientRect().top)
        )
      );
    if (active.length) {
      this.activeLinkId = active[0].id;
    }
    this.activeLinkId = active[0].id;
    if (lastActive !== this.activeLinkId) {
      const refer = this.getRef(this.activeLinkId);
      const lastRef = this.getRef(lastActive);
      lastRef?.classList?.remove(this.activeClass);
      refer?.classList?.add(this.activeClass);
      if (this.sublists.length > 0) {
        this.sublists.forEach((list) => list.classList.remove('is-expanded'));
      }
      let parent = refer?.parentElement;
      while (parent?.hasAttribute('data-toc-position')) {
        if (parent.tagName.toLowerCase() === 'ul') {
          parent.classList.add('is-expanded');
        }
        parent = parent.parentElement;
      }
    }
  }
  getRef(reference) {
    return this.items.get(reference)?.value;
  }
  render() {
    return html`
      <div class="toc__toggle">
        <mwc-icon-button @click="${this.toggle}"
          >${this.icons.icon('--gr-8', '--blue3')}</mwc-icon-button
        >
      </div>

      <div class="toc__head">
        <div class="toc__label">
          <span>On this page</span>
        </div>
      </div>

      <div class="toc__content">
        <h2 class="toc__header">
          <a class="toc__header__link"></a>
        </h2>
        <div>
          <ul class="list">
            ${this.list}
          </ul>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static get styles() {
    return [style, css``];
  }
}
