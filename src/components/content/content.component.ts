import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { literal, html as staticHTML } from 'lit/static-html.js';
import { timer } from 'rxjs';
import { fastHash } from '../../util/primitives/salt-id';
import { clone } from './deep-clone';
import { PageSection } from './PageSection';
export class Tree {
  constructor() {}
  private _linkIcon = html`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="var(--gray-8)"
    role="presentation"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"
    />
  </svg>`;

  _compose(
    header: TemplateResult,
    content: TemplateResult,
    children: TemplateResult,
    marker = ''
  ) {
    return html`<section data-toc-marker="${marker}">
        ${header} ${content}
      </section>
      ${children}`;
  }
  /**
   *Runs a recursive function over a given object to flatten into a key-value map;
   *
   * @param {PageSection} tree
   * @memberof Tree
   */
  loadTree(tree: PageSection[]) {
    return this._buildTree(tree, 1);
  }

  _buildTree(section: PageSection[], depth: number) {
    let root = section.slice();
    let contentTree = [];
    let item = 0;
    if (Array.isArray(section)) {
      while (root.length) {
        const { title, content, subcontent, marker } = root.shift();
        if (depth === 1) {
          item += 1;
        }
        if (!title) {
          throw TypeError('Content title cannot be undefined.');
        }
        const href = `${title}`.replace(/[^\w\d.-]/g, '_').toLowerCase();
        const childCount = Array.isArray(subcontent) && subcontent.length;
        let children = html``,
          childHash = 0;

        if (childCount > 0) {
          const childArray = this._buildTree(subcontent, depth + 1);
          const compareKey = (template) => template.key;
          const getTemplate = (template) => template.template;
          childHash = fastHash(childArray.map((item) => item.key).join('--'));
          //repeat used because it allows key tracking, which may be more performant for large objects
          children = html`${repeat(childArray, compareKey, getTemplate)} `;
        }
        const link = this._getHeaderLink(href);
        const heading = this._getHeader(depth, html`${title}${link}`, href);

        const template = this._compose(
          heading,
          content ?? html``,
          children,
          marker
        );

        contentTree.push({
          template: template,
          key: href + childHash + depth,
          item,
        });
      }
    } else {
      throw TypeError('Sections must be provided as arrays');
    }
    return contentTree as {
      template: TemplateResult<any>;
      key: string;
      item: number;
    }[];
  }

  _getHeaderLink(href: string) {
    return html`<a
      href="#${href}"
      style="position: absolute; margin-left: 0.5rem"
      class="content__header__link"
      >${this._linkIcon}</a
    >`;
  }
  _getHeader(level: number, content: TemplateResult<1>, href: string) {
    const h = [
      literal`h1`,
      literal`h2`,
      literal`h3`,
      literal`h4`,
      literal`h5`,
      literal`h6`,
    ];
    if (level < 1) {
      throw TypeError('Header depth must be between 1 and 6');
    } else if (level > 6) {
      level = 6;
    }
    const tag = h[level];
    return staticHTML`<${tag} id="${href}">${content}</${tag}>`;
  }
}

type TemplateTuple = [string, TemplateResult<1>];

type KeyedTemplate = Map<string, TemplateResult<1>>;

export enum ContentModification {
  INSERT = 'insert',
  DELETE = 'delete',
  REPLACE = 'replace',
}

const contentUndefined = TypeError(
  'In order to replace or insert sections, you must define the entries you want to insert'
);
export class ContentTree extends LitElement {
  tree: Tree;
  content: KeyedTemplate;
  _cache: (PageSection | true)[];

  @state()
  template: TemplateTuple[];
  loading: boolean = true;
  sectionsToSplice = new Map();
  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  async load(sections: PageSection[]) {
    this.content.clear();
    const order = this.tree.loadTree(sections).map((section) => {
      let { key, template, item } = section;
      this.content.set(key, template);
      return [key, item] as [string, number];
    });
    this.refreshTemplate(this.content, new Map(order));
    return;
  }
  changeSections(
    position: number,
    change: ContentModification,
    entry?: PageSection
  ) {
    let splicedSections = (clone(this._cache) || []) as (PageSection | true)[];
    //If the position already exists, you can write to spliced sections
    if (splicedSections[position]) {
      switch (change) {
        case ContentModification.DELETE:
          splicedSections.splice(position, 1);
          break;
        case ContentModification.INSERT:
          if (entry && splicedSections[position] === true) {
            splicedSections.splice(position, 1, entry);
          } else if (entry) {
            splicedSections.splice(position, 0, entry);
          } else {
            throw contentUndefined;
          }
          break;
        case ContentModification.REPLACE:
          if (entry) {
            splicedSections.splice(position, 1, entry);
          } else {
            throw contentUndefined;
          }
          break;
      }
    } else {
      while (splicedSections.length < position + 1) {
        splicedSections.push(true);
      }
      splicedSections[position] = entry;
    }
    this._cache = splicedSections;
    this.batchLoad();
  }
  batchLoad() {
    timer(250).subscribe(() => {
      const sections = this._cache.filter(
        (item) => typeof item != 'boolean'
      ) as PageSection[];
      this.load(sections).then((res) => {
        this.updateComplete.then(() => {
          this.loading = false;
        });
      });
    });
  }

  refreshTemplate(content: KeyedTemplate, order: Map<string, number>) {
    this.template = this._getContentArray(content).sort((a, b) => {
      return order.get(a[0]) - order.get(b[0]);
    });
    this.requestUpdate();
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
  }

  constructor() {
    super();
    this._cache = [];
    this.tree = new Tree() as Tree;
    this.content = new Map();
  }
  private _getContentKey = ([key, _]: TemplateTuple) => key;

  private _getContentTemplate = ([_, template]: TemplateTuple) => template;

  private _getContentArray = (content): TemplateTuple[] => Array.from(content);
  render() {
    if (this.loading || !this.template) {
      return;
    }
    return repeat(this.template, this._getContentKey, this._getContentTemplate);
  }
}
