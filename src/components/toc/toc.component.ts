import { html, LitElement, TemplateResult } from 'lit';
import {
  property,
  query,
  queryAll,
  queryAsync,
  state,
} from 'lit/decorators.js';
import { HicksListItem, LIST_ITEM_TAG_NAME } from './toc-item.component';
import { style } from './toc.css';
import { ListChild } from '../../types/ListChild';
import { tocTemplates as templates } from './toc.templates';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import {
  IntersectionController,
  IntersectionObserverType,
} from '../../util/controllers/intersection.controller';
import { ListItemController } from '../../util/controllers/item.controller';
import { fastHash } from '../../util/primitives/salt-id';
import { debounceTime, filter, mapTo, takeWhile } from 'rxjs/operators';

import { fromEvent } from 'rxjs';
import { getHeadingDepth, queryHeader } from '../../util/primitives/headers';
import { queryAnchor } from '../../util/primitives/anchors';
import { MutationController } from '../../util/controllers/mutation.controller';
import { queryAssignedNodes } from 'lit/decorators.js';

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
export class TableOfContents extends LitElement {
  static styles = [style];
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  toggle: any;
  handleSlotChange(event) {
    console.log(this.menuToggle[0]);
  }
  @property({ type: Object })
  get slotNames() {
    return {
      toggle: 'navigation-toggle',
    };
  }
  //Child Queries
  @query('.list', true)
  topLevelList: HTMLUListElement;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLUListElement>;
  @queryAll('hicks-list-item')
  listItems: NodeListOf<HicksListItem>;
  @queryAsync('hicks-list-item')
  itemsLoaded: Promise<HicksListItem>;
  @queryAssignedNodes('navigation-toggle', true)
  menuToggle: HTMLElement;
  //Public properties
  @property({ type: Boolean, reflect: true })
  open: boolean;
  @property({ type: Boolean, reflect: true })
  mobile = true;
  @property({ type: Boolean })
  loaded = false;
  //Internal States
  @state()
  activeLink: string = '';
  //Shared controllers
  controllers: {
    intersection: IntersectionController;
    breakpoint: BreakpointController;
    item: ListItemController;
    mutation: MutationController;
  };
  //Templates
  list: TemplateResult[];
  displayedElements = new Set();
  hash = {
    section: 0,
    template: 0,
  };

  @state()
  template: TemplateResult<1>;
  itemMap: any;
  visibleItems: HicksListItem[];
  @state()
  allExpanded: boolean = false;
  @property()
  activeSection: string;
  positions: Map<string, { path: string; title: string }>;

  headingLevel: number = 2;
  activeAttribute = 'href';

  constructor() {
    super();
    this.open = false;
    this.activeLink = '';
    this.positions = new Map();

    this.scrollSpy = this.scrollSpy.bind(this);
    this.controllers = {
      intersection: new IntersectionController(this),
      breakpoint: new BreakpointController(this),
      item: new ListItemController(this),
      mutation: new MutationController(this),
    };
    this.controllers.breakpoint
      .observeArea(['mobile', 'tablet'])
      .pipe(debounceTime(30))
      .subscribe((matches: boolean) => {
        this.mobile = matches;
      });
    this.controllers.item.createHandler('hicks-toc');

    this.controllers.mutation
      .initiate('table-of-contents')
      .observe([this.closest('main').querySelector('content-tree')])
      .on('childList')
      .subscribe((change) => {
        this.list = this.refreshLinks(this.sections);
        this.controllers.intersection.observe(this.sections);
        this.requestUpdate();
      });
    this.addEventListener('keydown', (ev) => {
      if (this.mobile && this.open && ev.key === 'Escape') {
        this.open = false;
      }
    });
  }

  get sections(): HTMLElement[] {
    return Array.from(this.closest('main').querySelectorAll('section'));
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    //Build the toc
    this.list = this.refreshLinks(this.sections);
    this.initIntersectionObserver();

    this.itemsLoaded.then(() => {
      this.loaded = true;
    });
  }
  initIntersectionObserver() {
    let margin = { top: '-49%', bottom: '-50%', left: '0px', right: '0px' },
      threshold = [0];
    const boundScroll = this.scrollSpy.bind(this);
    this.controllers.intersection
      .initiate('hicks-toc', null, threshold, margin)
      .observe(this.sections)
      .on(IntersectionObserverType.ENTRY)
      .subscribe(boundScroll);
  }

  /**
   * Used to build the list template whenever sections are changed
   *
   * @param {HTMLElement[]} sections
   * @memberof TableOfContents
   */
  refreshLinks(sections: HTMLElement[]): TemplateResult<1>[] {
    this.positions.clear();
    let childLists = new Map() as Map<string, ListChild[]>;
    const attributes = this.getSectionAttributes(sections, this.headingLevel),
      sortAttributes = (a, b) => {
        return b.sortOrder - a.sortOrder;
      };
    attributes.sort(sortAttributes);
    this.hash.section = fastHash(attributes.map((item) => item.href).join(''));
    return attributes.reduce((tree, heading) => {
      //prettier-ignore
      const { title, position: {root, index, path}, href, marker } = heading,
      //prettier-ignore
      //Get template for the list item's children
       {  fullPath,  childList } = templates.buildChildlist(childLists, path),
        template = templates.listItem(
        childList,
        { path, href, title, marker, index },
      );
      this.positions.set(href, { title, path });

      //If the content is nested, group it with any other templates on the same level. Else, push the template to the tree
      if (path.split('.').length > 1) {
        const subListItem = { template, treePath: fullPath };
        this.addItemToSubList(subListItem, childLists, root);
      } else {
        tree.push(template);
      }

      return tree;
    }, []);
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

  private getSectionAttributes(sections: HTMLElement[], headingLevel: number) {
    let rootArray = [],
      rootIndex = 0,
      previousDepth = 0,
      previousIndex = 0,
      index = 0;
    return sections.map((section) => {
      const header = queryHeader(section),
        link = queryAnchor(section),
        depth = getHeadingDepth(header),
        topLevel = depth === headingLevel,
        sameLevel = depth === previousDepth,
        higherLevel = depth < previousDepth;

      //if at level = 0
      if (topLevel) {
        rootIndex++;
        rootArray = [];
        index = rootIndex;
        //if on same level as last el
      } else if (sameLevel) {
        index++;
      } else if (higherLevel) {
        const level = depth - headingLevel;
        rootArray = rootArray.slice(0, level + 1);
        index = rootArray.pop();
        index++;
      }
      //if at deeper level
      else {
        index = 1;
        rootArray.push(previousIndex);
      }
      const root = rootArray.join('.');
      const path = topLevel ? `${rootIndex}` : root + `.${index}`,
        sortOrder = depth * 1000 + 100 - index,
        position = { root, index, path };
      previousDepth = depth;
      previousIndex = index;
      return {
        title: header.innerText,
        href: link.getAttribute('href'),
        position,
        marker: section.dataset.tocMarker,
        sortOrder,
      };
    });
  }
  update(_changedProperties) {
    super.update(_changedProperties);

    this.visibleItems = Array.from(
      this.listItems
    ); /*[EXPANSION] Array.from(this.listItems)?.filter(
      (item) => !item.hidden
    );*/
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('open')) {
      if (this.open && this.mobile) {
        setTimeout(() => {
          this.listItems.item(0).focus();
          this.toggle = this.menuToggle[0];
        }, 500);
      }
    }
  }

  scrollSpy(sections: IntersectionObserverEntry[]): void {
    if (!this.sections.length || !sections) return;
    const previousActiveId = this.activeLink;
    const intersectingSections = sections.filter(
      (section) => section.isIntersecting
    );
    //Take the most recent intersection if one exists. Otherwise, take the last intersecting item
    this.activeLink =
      queryAnchor(intersectingSections[0]?.target)?.getAttribute('href') ||
      this.activeLink;

    //Make sure we do not already have the correct element selected

    queryAnchor(intersectingSections[0]?.target);
    if (previousActiveId !== this.activeLink) {
      if (this.listItems.length > 0) {
        this.collapseLists(Array.from(this.listItems).map((el) => el.path));
      }
      this.controllers.item.activate(this._getActivePath() ?? '');
      //[EXPANSION] this.updateItemOffsets();
    }
  }

  private _getActivePath() {
    if (this.positions.has(this.activeLink)) {
      return this.positions.get(this.activeLink).path;
    } else {
      throw Error('Active link does not exist');
    }
  }
  expandLists(paths: string | string[]) {
    this.controllers.item.expand(paths);
  }
  collapseLists(paths: string | string[]) {
    this.controllers.item.collapse(paths);
  }

  get closedLists() {
    return Array.from(this.listItems).filter((sl) => !sl.expanded);
  }
  /* [EXPANDED] private updateItemOffsets() {
    if (this.visibleItems) {
      Array.from(this.visibleItems).map((el: HicksListItem, i) => {
        let prevEl = el.previousElementSibling as HicksListItem;
        if (prevEl && prevEl.index === el.index - 1) {
          const offset = Array.from(this.closedLists)
            .filter((list) => list.path.includes(prevEl.path))
            .reduce((total, curr) => total + curr.listChildren, 0);
          if ((el.offset = offset + prevEl.offset)) {
            return;
          } else {
            el.offset = offset + prevEl.offset;
          }
        } else {
          el.offset = 0;
        }
      });
    }
  }*/

  /* [EXPANDED] toggleAll() {
    this.allExpanded
      ? this.controllers.item.collapseAll()
      : this.controllers.item.expandAll();
    this.allExpanded = !this.allExpanded;
  }*/

  render() {
    if (this.hash.template != this.hash.section) {
      this.template = templates.list(this.list);
      this.hash.template = this.hash.section;
    }
    let open = this.mobile && this.open;

    /*[EXPANDED] <div class="button__wrapper">
   <button
        @click=${this.toggleAll}
        type="button"
        class="expand-button button button--secondary"
        data-toggled=${this.allExpanded}
      >
        Expand All <span>+</span>
      </button>
    </div>*/
    return html`
      ${open
        ? html`<div
            tabindex="0"
            aria-hidden="true"
            @focus="${() => {
              return Array.from(this.listItems)[
                this.listItems.length - 1
              ].focus();
            }}"
          ></div>`
        : ''}
      <div class="button__wrapper">
        <div class="background"></div>
        <slot
          @slotchange="${this.handleSlotChange}"
          name="${this.slotNames.toggle}"
        ></slot>
      </div>
      ${this.template}
      ${open
        ? html`<div
            tabindex="0"
            aria-hidden="true"
            @focusin="${() => {
              this.menuToggle[0]?.focus();
            }}"
          ></div>`
        : ''}
    `;
  }
}
