import { html, LitElement, Template, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { HicksExpansionPanel } from './expansion-panel/expansion-panel.component';
import { elderDrugIcon } from './icons/elder-drug.icon';
import { pkCardIcon } from './icons/pk-card.dataurl';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
HicksExpansionPanel;

type PageSection = {
  title: string;
  content?: TemplateResult;
  subcontent?: PageSection[];
};

const testFile = {
  title: 'header',
  subcontent: [
    {
      title: '1',
      content: html`
        <hicks-expansion imageuri="${pkCardIcon}">
          <h4 slot="title">Pharmacokinetics Components</h4>
          <p slot="description">
            Built for students at the Eshelman School of Pharmacy, the
            pharmacokinetics component project was aimed at creating interactive
            learning tools to visualize how changes in drug dosing parameters
            affect the net amount of drug found in a patient's serum
          </p>
          <div slot="content"><plot-engine> </plot-engine></div>
        </hicks-expansion>

        <hicks-expansion imageuri="${elderDrugIcon}">
          <h4 slot="title">Elder Drug</h4>
          <p slot="description">
            ElderDrug.com is an Angular project aimed at making Beers Criteria
            -- a list of Beers Criteria. Additionally, Elder Drug expands index
            terms to include brands and generics for all entries, even those
            that only specify a class or therapeutic category (e.g.
            'Antipsychotics' would include 'aripiprazole' and 'Abilify'). Many
            drugs in this database have been determined by querying
            Class/Therapeutic Category members (e.g. Cyclooxygenase Inhibitors),
            and using the resulting generic RxCUIs to query brand names.
          </p>
          <div slot="content"><plot-engine> </plot-engine></div>
        </hicks-expansion>
      `,
    },
    {
      title: '2',
      subcontent: [
        {
          title: '2.1',
          content: html`
            <main class="layout__list">
              <h3>
                I want to create software that my mom would
                <i><b>enjoy</b></i> using.
              </h3>
              Doing so means designing software with the following in mind:
              <hicks-card-container>
                ${[
                  {
                    title: 'Accessibility',
                    body: ' A11y is more than aria-roles and roving tabindex. Accessible sites need to be enjoyable in any context.',
                  },
                  {
                    title: 'Reliability',
                    body: ' Javascript in a world where null is an object and NaN a number. Creating great products means creating a consistent experience out of unintuitive parts.',
                  },
                  { title: 'Speed', body: 'Who has time?' },
                  {
                    title: 'Simplicity',
                    body: 'We use apps to do tasks or find information. Elegant designs not only look great, but also do not overshadow their primary uses.',
                  },
                ].map(
                  (card) => html`<hicks-card
                    fontColor="white"
                    color="var(--primary-9)"
                    hue="90"
                  >
                    <h4 slot="title">${card.title}</h4>
                    <p slot="body">${card.body}</p>
                  </hicks-card>`
                )}</hicks-card-container
              >
            </main>
          `,
          subcontent: [
            {
              title: '2.1.1',
              content: html` test1 `,
            },
            {
              title: '2.1.2',
              content: html` test1 `,
            },
            {
              title: '2.1.3',
              content: html` test2 `,
            },
            {
              title: '2.1.4',
              content: html` test1 `,
            },
            {
              title: '2.1.5',
              content: html` test2 `,
              subcontent: [
                {
                  title: '2.1.5.1',
                  content: html` test2 `,
                },
                {
                  title: '2.1.5.2',
                  content: html` test2 `,
                },
                {
                  title: '2.1.5.3',
                  content: html` test2 `,
                },
              ],
            },
          ],
        },
        {
          title: '2.2',
          content: html`
            <main class="layout__list">
              <h3>
                I want to create software that my mom would
                <i><b>enjoy</b></i> using.
              </h3>
              Doing so means designing software with the following in mind:
              <hicks-card-container>
                ${[
                  {
                    title: 'Accessibility',
                    body: ' A11y is more than aria-roles and roving tabindex. Accessible sites need to be enjoyable in any context.',
                  },
                  {
                    title: 'Reliability',
                    body: ' Javascript in a world where null is an object and NaN a number. Creating great products means creating a consistent experience out of unintuitive parts.',
                  },
                  { title: 'Speed', body: 'Who has time?' },
                  {
                    title: 'Simplicity',
                    body: 'We use apps to do tasks or find information. Elegant designs not only look great, but also do not overshadow their primary uses.',
                  },
                ].map(
                  (card) => html`<hicks-card
                    fontColor="white"
                    color="var(--primary-9)"
                    hue="90"
                  >
                    <h4 slot="title">${card.title}</h4>
                    <p slot="body">${card.body}</p>
                  </hicks-card>`
                )}</hicks-card-container
              >
            </main>
          `,
        },
      ],
    },
  ],
} as PageSection;
/*
class TreeNode {
  private _value: number[] = [0];
  private _template = html``;
  private _title: string;
  get serialized() {
    return this._value.join('.').toString();
  }
  get title() {
    return this._title;
  }
  set title(title: string) {
    if (typeof title === 'string') this._title = title;
  }
  get location() {
    return this._value;
  }
  get nodeIndex() {
    return this._value[this.layer];
  }
  get layer() {
    return this._calcNodeLayer();
  }
  get root() {
    return this._value[0];
  }
  get template() {
    return this._template;
  }

  set template(template: TemplateResult<1>) {
    this._template = template;
  }
  constructor(
    coords: number[] | string,
    template: TemplateResult<1>,
    title: string
  ) {
    this.setLocation(coords);
    this._template = template;
    this._title = title;
  }

  makeParentOf(location: number[]) {
    //shallow clone and remove last value
    let copy = location.map((x) => x);
    copy.pop();
    this.setLocation(copy);
  }
  makeSiblingOf(location: number[], position: number) {
    //shallow clone and add position;
    let copy = location.map((x) => x);
    copy.push(position);
    this.setLocation(copy);
  }

  moveUp() {
    if (this.nodeIndex > 0) {
      this._value[this.layer]--;
    }
    return this;
  }
  moveDown(maxValue = Number.MAX_SAFE_INTEGER) {
    if (this.nodeIndex < maxValue) {
      this._value[this.layer]++;
    }

    return this;
  }
  moveTo(location: number[]) {
    this.setLocation(location);
    return this;
  }

  attachToRoot(root, atPos = 0) {
    this._value.length = 0;
    this._value[0] = root;
    this._value[1] = atPos;
    return this;
  }
  setLocation(coords: number[] | string) {
    if (typeof coords === 'string') {
      coords = coords.split('.').map(Number);
    }
    if (Array.isArray(coords) && coords.every(Number)) {
      this._value = coords;
    }
    return this;
  }
  _calcNodeLayer() {
    return this._value.length - 1;
  }
}*/

class Tree {
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
  template: { template: TemplateResult<any>; key: string }[];

  _compose(header: TemplateResult, content: TemplateResult, position: string) {
    return html`<section data-toc-index="${position}">
      ${header} ${content}
    </section>`;
  }
  /**
   *Runs a recursive function over a given object to flatten into a key-value map;
   *
   * @param {PageSection} tree
   * @memberof Tree
   */
  loadTree(tree: PageSection) {
    this.template = this.construct([tree]);
  }

  construct(section: PageSection[], root = [0]) {
    //variables
    let contentTree = [];
    let index = 0;

    for (let sub of section) {
      const { title, content, subcontent } = sub;
      if (!title) {
        throw TypeError(
          '[content.component.tree]Content title cannot be undefined.'
        );
      }
      index++;
      const location = [...root, index];
      const locationStr = location.join('.');
      const hasChildren = Array.isArray(subcontent) && subcontent.length;
      const depth = location.length;

      let children = html``;

      if (hasChildren) {
        const childArray = this.construct(subcontent, location);
        const compareKey = (template) => template.key;
        const getTemplate = (template) => html`${template.template}`;
        //repeat used because it allows key tracking, which may be more performant for large objects
        children = html`<div class="children">
          ${repeat(childArray, compareKey, getTemplate)}
        </div> `;
      }

      const link = this._getHeaderLink(title, locationStr);
      const heading = this._getHeader(depth)(html`${title + link}`);
      const template = this._compose(heading, content ?? html``, locationStr);

      contentTree.push({
        template: template,
        key: location.join('.') + sub.title,
      });
    }
    return contentTree as {
      template: TemplateResult<any>;
      key: string;
    }[];
  }

  _getHeaderLink(title: string, location: string) {
    const sectionHref = (title.toLowerCase().trim() + location).replace(
      /[^\w\d.]/g,
      '_'
    );
    return html`<a href="#${sectionHref}" class="content__header__link"
      >${this._linkIcon}</a
    >`;
  }
  _getHeader(level) {
    const headings = (content) => ({
      h1: html`<h1>${content}</h1>`,
      h2: html`<h2>${content}</h2>`,
      h3: html`<h3>${content}</h3>`,
      h4: html`<h4>${content}</h4>`,
      h5: html`<h5>${content}</h5>`,
      h6: html`<h6>${content}</h6>`,
    });
    if (level > 1 && level < 7) {
      return headings['h' + level];
    } else {
      throw Error(
        '[content.component.tree] Only content nested up to 6 levels is allowed'
      );
    }
  }
}

const sectionHTML = (
  title: string,
  link: string,
  level: number,
  href: string,
  content: TemplateResult<any>
) => {
  const anchor = `${title}${link}`;
  const tag = typeof level === 'number' ? level : 6;
  let unescapedTag = (inner) => `<h${tag} id="${href}">${inner}</h${tag}>`;
  const header = unsafeHTML(unescapedTag(anchor));

  return html`<section>${header} ${content}</section>`;
};

@customElement('content-component')
export class ContentComponent extends LitElement {
  @property()
  file: string = '';

  @state()
  tree: Object;
  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  @property({ type: String })
  title: string = 'home';

  content = [] as TemplateResult[];

  parseFile(
    node: { title: string; content?: TemplateResult; subcontent: any[] },
    level = 1
  ) {
    if (typeof level != 'number' || level < 1 || level > 7)
      throw new Error('[err: too many headers]');
    const { section, subcontent } = node;
    if (section) {
      let href = (section.toLowerCase().trim() + level).replace(
        /[^\w\d]/g,
        '_'
      );
      let link = `<a href="#${href}" class="toc__content__link-icon"
        >${linkIcon}</a
      >`;
      let template = node.content || html``;

      //if there is no more subcontent, stop parsing
      if (!Array.isArray(node.subcontent) || !node.subcontent.length) {
        return this.content;
      } else {
        //else, parse next layer.
        subcontent.forEach((item) => {
          this.parseFile(item, level + 1);
        });
      }
      this.content.push(sectionHTML(section, link, level, href, template));
    }

    return this.content;
  }

  addNode(to: string, child: PageSection[]) {}

  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`<div>${this.parseFile(testFile)}</div>`;
  }
}
