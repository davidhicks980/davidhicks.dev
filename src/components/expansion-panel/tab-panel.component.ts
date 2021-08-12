import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
type TabContent = {
  name: string;
  content: string;
};

@customElement('tab-panel-component')
export class TabPanelComponent extends LitElement {
  @property({ type: String, reflect: true }) parent: string;
  @property({ type: String, reflect: true }) selected: string;
  @property({ attribute: 'selected-index', type: Number, reflect: true })
  focusIndex: number;

  @queryAll("[role='tab']")
  tabs: NodeListOf<HTMLButtonElement>;
  @property({
    type: Array,
    hasChanged(value, oldValue) {
      return true;
    },
    attribute: 'content',
  })
  tabContent: TabContent[] = [
    {
      name: '',
      content: '',
    },
  ];
  @property({
    type: Array,
    hasChanged(value, oldValue) {
      return true;
    },
    attribute: 'content',
  })
  template: TemplateResult<1>[] = [];
  firstUpdated(_changedProperties) {
    this.addEventListener('keydown', this.handleKeydown);
  }
  toggleTab(name: string) {
    this.selected = name;
  }

  handleKeydown(e: KeyboardEvent) {
    const focusTab = (index: number) => this.tabs[index].focus();
    let lastTab = this.tabs.length - 1;
    switch (e.key) {
      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        this.focusIndex = this.focusIndex === 0 ? lastTab : this.focusIndex + 1;
        break;
      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        this.focusIndex = this.focusIndex === lastTab ? 0 : this.focusIndex + 1;
        break;
      case 'Enter':
      case '':
        break;
    }
    focusTab(this.focusIndex);
  }

  render(): TemplateResult {
    return html` <div class="tabs">
      <div role="tablist" aria-label="Tools used to build ${this.parent}">
        ${this.tabContent.reduce((template, { name, content }, i) => {
          let isSelected = this.selected === name,
            tabIndex = isSelected ? 0 : -1,
            tab = html`<button
              role="tab"
              @click="${this.toggleTab}"
              aria-selected="${isSelected}"
              aria-controls="${name}-panel"
              id="${name}-tab"
              tabindex="${tabIndex}"
            >
              ${name}
            </button>`,
            panel = html` <div
              id="${name}-panel"
              role="tabpanel"
              tabindex="0"
              aria-labelledby="${name}-tab"
              ?hidden="${!isSelected}"
            >
              <p>${content}</p>
            </div>`;

          template.splice(i, 0, tab);
          template.push(panel);
          return template;
        }, [])}
      </div>
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        .tabs {
          width: 20em;
          font-family: 'lucida grande', sans-serif;
        }

        [role='tablist'] {
          margin: 0 0 -0.1em;
          overflow: visible;
        }

        [role='tab'] {
          position: relative;
          margin: 0;
          padding: 0.3em 0.5em 0.4em;
          border: 1px solid hsl(219, 1%, 72%);
          border-radius: 0.2em 0.2em 0 0;
          box-shadow: 0 0 0.2em hsl(219, 1%, 72%);
          overflow: visible;
          font-family: inherit;
          font-size: inherit;
          background: hsl(220, 20%, 94%);
        }

        [role='tab']:hover::before,
        [role='tab']:focus::before,
        [role='tab'][aria-selected='true']::before {
          position: absolute;
          bottom: 100%;
          right: -1px;
          left: -1px;
          border-radius: 0.2em 0.2em 0 0;
          border-top: 3px solid hsl(20, 96%, 48%);
          content: '';
        }

        [role='tab'][aria-selected='true'] {
          border-radius: 0;
          background: hsl(220, 43%, 99%);
          outline: 0;
        }

        [role='tab'][aria-selected='true']:not(:focus):not(:hover)::before {
          border-top: 5px solid hsl(218, 96%, 48%);
        }

        [role='tab'][aria-selected='true']::after {
          position: absolute;
          z-index: 3;
          bottom: -1px;
          right: 0;
          left: 0;
          height: 0.3em;
          background: hsl(220, 43%, 99%);
          box-shadow: none;
          content: '';
        }

        [role='tab']:hover,
        [role='tab']:focus,
        [role='tab']:active {
          outline: 0;
          border-radius: 0;
          color: inherit;
        }

        [role='tab']:hover::before,
        [role='tab']:focus::before {
          border-color: hsl(20, 96%, 48%);
        }

        [role='tabpanel'] {
          position: relative;
          z-index: 2;
          padding: 0.5em 0.5em 0.7em;
          border: 1px solid hsl(219, 1%, 72%);
          border-radius: 0 0.2em 0.2em 0.2em;
          box-shadow: 0 0 0.2em hsl(219, 1%, 72%);
          background: hsl(220, 43%, 99%);
        }

        [role='tabpanel']:focus {
          border-color: hsl(20, 96%, 48%);
          box-shadow: 0 0 0.2em hsl(20, 96%, 48%);
          outline: 0;
        }

        [role='tabpanel']:focus::after {
          position: absolute;
          bottom: 0;
          right: -1px;
          left: -1px;
          border-bottom: 3px solid hsl(20, 96%, 48%);
          border-radius: 0 0 0.2em 0.2em;
          content: '';
        }

        [role='tabpanel'] p {
          margin: 0;
        }

        [role='tabpanel'] * + p {
          margin-top: 1em;
        }
      `,
    ];
  }
}
