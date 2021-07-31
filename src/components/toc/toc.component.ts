import { html, LitElement, TemplateResult, svg } from 'lit';
import {
  property,
  query,
  queryAll,
  queryAsync,
  state,
} from 'lit/decorators.js';
import { style } from './toc.css';
import { ListChild } from '../../types/ListChild';
import { tocTemplates as templates } from './toc.templates';
import { HicksListItem } from './toc-item.component';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { IntersectionController } from '../../util/controllers/intersection.controller';
import { FocusController } from '../../util/controllers/focus.controller';
import { ListItemController } from '../../util/controllers/item.controller';
import { fastHash } from '../../util/primitives/salt-id';
import { mapTo } from 'rxjs/operators';

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
  activeId: string = '';
  //Shared controllers
  controllers: {
    intersection: IntersectionController;
    breakpoint: BreakpointController;
    focus: FocusController;
    item: ListItemController;
  };
  //Templates
  list: TemplateResult[];
  displayedElements = new Set();
  hash = {
    section: 0,
    template: 0,
  };

  template: TemplateResult<1>;
  itemMap: any;
  displayedListItems: HicksListItem[];
  @state()
  allExpanded: boolean = false;

  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.controllers = {
      intersection: new IntersectionController(this),
      breakpoint: new BreakpointController(this),
      focus: new FocusController(this),
      item: new ListItemController(this),
    };
    this.controllers.breakpoint.observe('mobile').subscribe(([id, matches]) => {
      this[id] = matches ?? false;
    });
    this.controllers.item
      .createHandler('hicks-toc')
      .observe.all()
      .pipe(mapTo(true))
      .subscribe((_) => {
        window.requestAnimationFrame(() => this.updateItemOffsets());
      });
  }

  get sections(): HTMLElement[] {
    return Array.from(document.querySelectorAll('section'));
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    //Build the toc
    this.list = this.refreshLinks(this.sections);
    this.initIntersectionObserver();
    this.open = true;
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
      .on('entry')
      .subscribe(boundScroll);
  }

  /**
   * Used to build the list template whenever sections are changed
   *
   * @param {HTMLElement[]} sections
   * @memberof TableOfContents
   */
  refreshLinks = (sections: HTMLElement[]) => {
    const toArr = (position: string) => position.split('.');
    let childLists = new Map() as Map<string, ListChild[]>;
    const sectionInfo = this.getSectionAttributes(sections);
    sectionInfo.sort((a, b) => b.sortOrder - a.sortOrder);

    this.hash.section = fastHash(
      sectionInfo.map((item) => item.href).join('-')
    );
    return sectionInfo.reduce((tree, heading) => {
      //prettier-ignore
      const { title, position: {root, index, path}, href, marker } = heading,
      //prettier-ignore
       isActive = this.activeId === href,
      //Get template for the list item's children
       {  fullPath,  childList } = templates.buildChildlist(childLists, path),
        template = templates.listItem(
        childList,
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
  update(_changedProperties) {
    super.update(_changedProperties);
    this.displayedListItems = Array.from(this.listItems)?.filter(
      (item) => !item.hidden
    );
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has('mobile')) {
      if (this.mobile === true) {
        this.itemsLoaded.then(() => {
          this.controllers.focus.trapFocus(
            this.topLevelList,
            this.listItems.item(0)
          );
        });
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
    this.activeId = intersectingSections[0]?.target?.id || this.activeId;

    //Make sure we do not already have the correct element selected
    if (previousActiveId !== this.activeId) {
      if (this.listItems.length > 0) {
        this.collapseLists(Array.from(this.listItems).map((el) => el.path));
      }
      this.controllers.item.activate(this.activeId.split('--')[0]);
      this.updateItemOffsets();
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
  private updateItemOffsets() {
    if (this.displayedListItems) {
      Array.from(this.displayedListItems).map((el: HicksListItem, i) => {
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
  }

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
      <div class="button__wrapper">
        <button
          @click=${this.toggleAll}
          type="button"
          class="expand-button button button--secondary"
          data-toggled=${this.allExpanded}
        >
          Expand All <span>+</span>
        </button>
      </div>
      ${this.template}
    `;
  }
}
