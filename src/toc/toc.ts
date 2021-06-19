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

import { css, html, LitElement } from 'lit';
import { property, customElement, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { StateController } from '../component-state';
import { IconController } from '../icons/icon.controller';
import { style } from './toc.css';
import { styleMap } from 'lit/directives/style-map.js';
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
  @queryAll('.list__item__link')
  links2: NodeListOf<HTMLAnchorElement>;
  activeLinkId: string;
  activeClass: string;
  tocVisibleClass: string;
  tocHTML!: any;
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) opened = true;
  headings!: HTMLHeadingElement[];
  observer!: IntersectionObserver;
  previousOffset: number = 0;

  icons: IconController;
  stateObserver: StateController;
  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.activeClass = 'is-active';
    this.icons = new IconController(this, 'openBook');
    this.stateObserver = new StateController(this);
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
    this.articleContent = this.closest('main');

    if (!this.articleContent) {
      console.warn(`Article container not found.`);
    }
    this.headings = this.getHeadings();
    this.previousOffset = this.articleContent.getBoundingClientRect().top;
    this.observer = new IntersectionObserver(this.scrollSpy, {
      root: this.articleContent,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0.1, 0.5, 1],
    });

    this.classList.add('toc');
    this.headings.forEach((heading: HTMLHeadingElement, i) => {
      heading.dataset.tocIndex = i.toString();
      this.observer.observe(heading);
    });
    window.addEventListener(
      'hashchange',
      (e) => {
        this._activateLink(window.location.hash.slice(1));
      },
      { passive: true }
    );
  }
  _getLinkClasses(id: string) {
    return classMap({
      isActive: id === this.activeLinkId,
      list__item__link: true,
    });
  }
  _refreshLinks = (headings: HTMLHeadingElement[]) => {
    let lastLvl = 0;
    return headings?.reduce((tree, heading, index) => {
      const { id, innerText, tagName } = heading;
      const currLvl = Number(tagName[1]) - 1;
      let node = html`<li class="list__item">
        <a
          data-toc-index="${heading.dataset.tocIndex}"
          data-toc-id="${id}"
          data-toc-level="${currLvl}"
          class="list__item__link"
          href="#${id}"
          >${innerText}</a
        >
      </li>`;
      if (currLvl > lastLvl) {
        //prettier-ignore
        tree.push(html`<ul>`);
      }
      if (currLvl < lastLvl) {
        tree.push(html`</ul>`);
      }
      tree.push(node);
      lastLvl = currLvl;
      return tree;
    }, []);
  };

  scrollDirFrom = (previousOffset: number) => {
    const currentOffset = this.articleContent.getBoundingClientRect().top;
    const sign = Math.sign(currentOffset - previousOffset);
    this.previousOffset = currentOffset;
    return sign;
  };

  getHeadings(): HTMLHeadingElement[] {
    return Array.from(this.articleContent?.querySelectorAll('h2[id], h3[id]'));
  }
  scrollSpy(headings: IntersectionObserverEntry[]) {
    let midPoint =
      window.innerHeight || document.documentElement.clientHeight / 2;
    const lastIndexStr = this.activeLink?.dataset?.tocIndex;
    if (lastIndexStr === undefined) {
      this._selectActiveHeader(headings, midPoint);
      return;
    }
    let { isIntersecting, target } = headings[0];
    let tar = target as HTMLElement;
    const lastIndexNum = Number(lastIndexStr);
    const targetIndex = Number(tar.dataset.tocIndex);
    const isScrollingDown = this.scrollDirFrom(this.previousOffset) < 0;
    /*If the element is not intersecting, check if the closest visible header is within the viewport*/
    if (isIntersecting === false) {
      this._selectClosestVisible(targetIndex, isScrollingDown, midPoint);
      return;
    }
    const isSectionLarger = targetIndex > lastIndexNum;
    if (isScrollingDown) {
      if (isSectionLarger) {
        this._activateLink(tar.id);
      }
    } else if (!isSectionLarger) {
      this._activateLink(tar.id);
    }
  }

  private _selectClosestVisible(
    currentIndex: number,
    scrollingDown: boolean,
    midpoint: number
  ) {
    let nextIndex = scrollingDown ? currentIndex + 1 : currentIndex - 1;

    let nextLink = this.links2.item(nextIndex) || false;
    if (nextLink != false) {
      let { top } = nextLink.getBoundingClientRect();
      let bp = scrollingDown ? top < midpoint && top > 0 : top > 0;
      if (bp === true) {
        this._activateLink(nextLink.dataset.tocId);
      } else return;
    }
  }

  private _selectActiveHeader(
    headings: IntersectionObserverEntry[],
    midPoint: number
  ) {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_VALUE;
    let larger = false;
    let bounds = headings.reduce((acc, curr) => {
      let { boundingClientRect: bounds, isIntersecting, target } = curr;
      if (isIntersecting) {
        let y = Math.floor(bounds.y);
        larger = y > midPoint;
        min = y < min ? y : min;
        max = y > max ? y : max;
        acc.set(y, target.id);
      }
      return acc;
    }, new Map());
    const selector = larger ? bounds.get(min) : bounds.get(max);
    this._activateLink(selector);
  }
  private _activateLink(selector: string) {
    this.activeLinkId = selector ?? this.activeLinkId;
    this.requestUpdate('activeLinkId');
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
        <div>${this._refreshLinks(this.headings)}</div>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  static get styles() {
    return [style, css``];
  }
}
