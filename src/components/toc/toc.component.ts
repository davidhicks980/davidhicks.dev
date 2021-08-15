import { html, LitElement, TemplateResult } from 'lit';
import {
  property,
  query,
  queryAll,
  queryAsync,
  state,
} from 'lit/decorators.js';
import { HicksListItem } from './toc-item.component';
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
import { debounceTime, filter, mapTo } from 'rxjs/operators';

import { fromEvent } from 'rxjs';
import { getHeadingDepth, queryHeader } from '../../util/functions/headers';
import { queryAnchor } from '../../util/functions/anchors';
import { MutationController } from '../../util/controllers/mutation.controller';

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
  //Child Queries
  @query('.list', true)
  topLevelList: HTMLUListElement;
  @queryAll('.list__sublist')
  sublists: NodeListOf<HTMLUListElement>;
  @queryAll('hicks-list-item')
  listItems: NodeListOf<HicksListItem>;
  @queryAsync('hicks-list-item')
  itemsLoaded: Promise<HicksListItem>;
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
    // focus: FocusController;
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
      //focus: new FocusController(this),
      item: new ListItemController(this),
      mutation: new MutationController(this),
    };
    this.controllers.breakpoint
      .observeArea(['mobile', 'tablet'])
      .pipe(debounceTime(30))
      .subscribe((matches: boolean) => {
        this.mobile = matches;
      });
    this.controllers.item
      .createHandler('hicks-toc')
      .observe.all()
      .pipe(mapTo(true))
      .subscribe((_) => {
        //[EXPANDED] window.requestAnimationFrame(() => this.updateItemOffsets());
      });
    this.controllers.mutation
      .initiate('table-of-contents')
      .observe([this.closest('main').querySelector('content-tree')])
      .on('childList')
      .subscribe((change) => {
        this.list = this.refreshLinks(this.sections);
        this.controllers.intersection.observe(this.sections);
        this.requestUpdate();
      });
    fromEvent(document, 'keydown')
      .pipe(filter((ev) => this.mobile && this.open && ev.key === 'Escape'))
      .subscribe(() => {
        this.open = false;
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
    let margin = { top: '-49%', bottom: '-49%', left: '0px', right: '0px' },
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
        { path, href, title, marker, index }
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
    if (_changedProperties.has('activeId')) {
      this.activeSection = this.positions.get(this.activeLink).title || '';
    }
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (
      _changedProperties.has('mobile') ||
      _changedProperties.has(_changedProperties.has('open'))
    ) {
      if (this.mobile && this.open) {
        this.itemsLoaded.then(() => {
          //      this.controllers.focus.trapFocus(
          //      this.topLevelList,
          //    this.listItems.item(0)
          //);
        });
      } else {
        //      this.controllers.focus.releaseFocus();
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

  toggleAll() {
    this.allExpanded
      ? this.controllers.item.collapseAll()
      : this.controllers.item.expandAll();
    this.allExpanded = !this.allExpanded;
  }
  render() {
    if (this.hash.template != this.hash.section) {
      this.template = templates.list(this.list);
      this.hash.template = this.hash.section;
    }

    return html`
      <!--  <div class="button__wrapper">
     <button
          @click=${this.toggleAll}
          type="button"
          class="expand-button button button--secondary"
          data-toggled=${this.allExpanded}
        >
          Expand All <span>+</span>
        </button>
      </div>-->
      <div class="button__wrapper">
        <div class="background"></div>
        <slot name="toggle"></slot>
      </div>
      ${this.template}
    `;
  }
}
