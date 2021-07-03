import { html, LitElement, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { HicksExpansionPanel } from '../expansion-panel/expansion-panel.component';
import { elderDrugIcon } from '../../icons/elder-drug.icon';
import { pkCardIcon } from '../../icons/pk-card.dataurl';
HicksExpansionPanel;
import { literal, html as staticHTML, unsafeStatic } from 'lit/static-html.js';

export type PageSection = {
  title: string;
  content?: TemplateResult;
  subcontent?: PageSection[];
  marker?: string;
};

const testFile = [
  {
    title: 'About',
    marker: '🐈',
    subcontent: [
      {
        title: 'My Ethos',
        content: html`
          <hicks-expansion imageuri="${pkCardIcon}">
            <h4 slot="title">Pharmacokinetics Components</h4>
            <p slot="description">
              Built for students at the Eshelman School of Pharmacy, the
              pharmacokinetics component project was aimed at creating
              interactive learning tools to visualize how changes in drug dosing
              parameters affect the net amount of drug found in a patient's
              serum
            </p>
            <div slot="content"><plot-engine> </plot-engine></div>
          </hicks-expansion>

          <hicks-expansion imageuri="${elderDrugIcon}">
            <h4 slot="title">Elder Drug</h4>
            <p slot="description">
              ElderDrug.com is an Angular project aimed at making Beers Criteria
              -- a list of Beers Criteria. Additionally, Elder Drug expands
              index terms to include brands and generics for all entries, even
              those that only specify a class or therapeutic category (e.g.
              'Antipsychotics' would include 'aripiprazole' and 'Abilify'). Many
              drugs in this database have been determined by querying
              Class/Therapeutic Category members (e.g. Cyclooxygenase
              Inhibitors), and using the resulting generic RxCUIs to query brand
              names.
            </p>
            <div slot="content"><plot-engine> </plot-engine></div>
          </hicks-expansion>
        `,
      },
    ],
  },
  {
    title: 'Portfolio',
    marker: '🎨',
    subcontent: [
      {
        title: 'Section 2.1',
        content: html``,
      },
    ],
  },
  {
    title: 'Resume',
    marker: '📜',

    subcontent: [
      {
        title: 'Section 2.1',
        content: html``,
      },
    ],
  },
  {
    title: 'Contact',
    marker: '💌',
    subcontent: [
      {
        title: 'Section 2.1',
        content: html``,
      },
    ],
  },
] as PageSection[];

export class Tree {
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
  template: TemplateResult<any>[];

  _compose(
    header: TemplateResult,
    content: TemplateResult,
    children: TemplateResult,
    position: string,
    marker = ''
  ) {
    return html`<section data-toc-marker="${marker}" id="${position}">
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
    this.template = this.construct(tree).map((node) => node.template);
  }

  construct(section: PageSection[], root = []) {
    //variables
    let contentTree = [];
    let index = 0;
    if (Array.isArray(section)) {
      for (let sub of section) {
        const { title, content, subcontent, marker } = sub;
        if (!title) {
          throw TypeError(
            '[content.component.tree]Content title cannot be undefined.'
          );
        }

        index++;
        const location = [...root, index];
        const href = `${location.join('.')}--${title}`.replace(
          /[^\w\d.-]/g,
          '_'
        );
        const hasChildren = Array.isArray(subcontent) && subcontent.length;
        const depth = location.length;

        let children = html``;

        if (hasChildren) {
          const childArray = this.construct(subcontent, location);
          const compareKey = (template) => true;
          const getTemplate = (template) => html`${template.template}`;
          //repeat used because it allows key tracking, which may be more performant for large objects
          children = html` ${repeat(childArray, compareKey, getTemplate)} `;
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
          key: location.join('.') + title,
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

@customElement('content-tree')
export class ContentTree extends LitElement {
  @property()
  file: string = '';
  @property({
    type: Array,
    hasChanged(value, oldValue) {
      return true;
    },
  })
  template: TemplateResult<any>[];
  tree: Tree;

  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  @property({ type: String })
  title: string = 'home';

  content = [] as TemplateResult[];

  connectedCallback() {
    super.connectedCallback();
  }
  constructor() {
    super();
    this.tree = new Tree() as Tree;
    this.tree.loadTree(testFile);
    this.template = this.tree.template;
  }

  render() {
    return html`${this.template}`;
  }
}
