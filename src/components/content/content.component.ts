import { html, LitElement, Template, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { literal, html as staticHTML } from 'lit/static-html.js';
import { fastHash } from '../../util/primitives/salt-id';
import { clone } from './deep-clone';
import { PageSection } from './PageSection';
export class Tree {
  private _cachedTree: PageSection[];
  constructor() {}
  private _linkIcon = html`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="gray"
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
    position: string,
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
  loadTree(tree: PageSection[], cache = false) {
    if (cache) {
      this._cachedTree = tree;
    }
    return this._buildTree(tree, 1);
  }

  insertContent(position: number[], content: PageSection | PageSection[]) {
    let clonedTree = clone(this._cachedTree),
      branch = clonedTree;
    while (position.length) {
      branch = branch[position.shift()];
      branch.subcontent = branch?.subcontent ?? [];
      branch = branch.subcontent;
    }
    if (Array.isArray(content)) {
      content.forEach((el) => branch.push(el));
    } else {
      branch.push(content);
    }
    return clonedTree;
  }
  update(position: number, content: PageSection) {
    let clonedTree = clone(this._cachedTree) as PageSection[];
    clonedTree.splice(position, 1, content);
    return clonedTree;
  }

  _buildTree(section: PageSection[], depth: number) {
    let root = section.slice();
    let contentTree = [];

    if (Array.isArray(section)) {
      while (root.length) {
        const { title, content, subcontent, marker } = root.shift();
        if (!title) {
          throw TypeError(
            '[content.component.tree]Content title cannot be undefined.'
          );
        }
        const href = `${title}`.replace(/[^\w\d.-]/g, '_');
        const hasChildren = Array.isArray(subcontent) && subcontent.length;
        let children = html``,
          childHash = 0;

        if (hasChildren) {
          const childArray = this._buildTree(subcontent, depth + 1);
          const compareKey = (template) => template.key;
          const getTemplate = (template) => template.template;
          childHash = fastHash(childArray.map((item) => item.key).join('--'));
          //repeat used because it allows key tracking, which may be more performant for large objects
          children = html`${repeat(childArray, compareKey, getTemplate)} `;
        }
        const link = this._getHeaderLink(href);
        const heading = this._getHeader(depth, html`${title}${link}`);
        const template = this._compose(
          heading,
          content ?? html``,
          children,
          href,
          marker
        );

        contentTree.push({
          template: template,
          key: href + childHash + depth,
        });
      }
    }
    return contentTree as {
      template: TemplateResult<any>;
      key: string;
    }[];
  }

  _getHeaderLink(href: string) {
    return html`<a href="#${href}" class="content__header__link"
      >${this._linkIcon}</a
    >`;
  }
  _getHeader(level: number, content: TemplateResult<1>) {
    const h = [
      literal`h1`,
      literal`h2`,
      literal`h3`,
      literal`h4`,
      literal`h5`,
      literal`h6`,
    ];
    if (level < 1) {
      throw TypeError('[Tree._getHeader] Header depth must be between 1 and 6');
    } else if (level > 6) {
      level = 6;
    }
    const tag = h[level];
    return staticHTML`<${tag}>${content}</${tag}>`;
  }
}

type TemplateTuple = [string, TemplateResult<1>];

type KeyedTemplate = Map<string, TemplateResult<1>>;

export class ContentTree extends LitElement {
  tree: Tree;
  content: KeyedTemplate;
  @state()
  template: TemplateTuple[];

  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  load(sections: PageSection[]) {
    this.tree.loadTree(sections, true).forEach((e) => {
      this.content.set(e.key, e.template);
    });
    this.refreshTemplate(this.content);
  }
  updateSection(position: number, entries: PageSection) {
    let update = this.tree.update(position, entries);
    this.tree.loadTree(update, true).forEach(({ template, key }) => {
      this.content.set(key, template);
    });
    this.refreshTemplate(this.content);
  }

  refreshTemplate(content: KeyedTemplate) {
    this.template = this._getContentArray(content);
    this.requestUpdate();
  }
  constructor() {
    super();
    this.tree = new Tree() as Tree;
    this.content = new Map();
  }
  private _getContentKey = ([key, _]: TemplateTuple) => key;

  private _getContentTemplate = ([_, template]: TemplateTuple) => template;

  private _getContentArray = (content): TemplateTuple[] => Array.from(content);
  render() {
    return repeat(this.template, this._getContentKey, this._getContentTemplate);
  }
}
