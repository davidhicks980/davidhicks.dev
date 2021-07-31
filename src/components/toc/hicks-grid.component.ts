import {
  LitElement,
  html,
  css,
  CSSResultGroup,
  TemplateResult,
  ComplexAttributeConverter,
} from 'lit';
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';

@customElement('hicks-grid')
export class HicksGrid extends LitElement {
  @queryAssignedNodes()
  gridItems;
  breakpointControl: BreakpointController;
  @property({ type: Boolean, attribute: 'autofill-row' })
  autofillRow: boolean;
  @property({ type: Boolean, attribute: 'autofill-column' })
  autofillColumn: boolean;
  @property({ type: Number })
  columns: number;
  @property({ type: Number })
  rows: number;
  @property({ attribute: 'column-gap' })
  columnGap: string;
  @property({ attribute: 'row-gap' })
  rowGap: string;
  @property({ attribute: 'cell-width' })
  cellWidth: string;
  @property({ attribute: 'cell-height' })
  cellHeight: string;

  @state()
  mobile: boolean;
  childGridObserver: MutationObserver;

  constructor() {
    super();
    this.columns = 1;
    this.rows = 1;
    this.cellWidth = '1fr';
    this.cellHeight = '1fr';
  }
  firstUpdated(_changedProperties) {
    this.breakpointControl = new BreakpointController(this);
    this.breakpointControl
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
  }
  render(): TemplateResult {
    const gridStyle = {
      display: 'grid',
      columnGap: this.columnGap,
      rowGap: this.rowGap,

      gridTemplateColumns: `repeat(${
        this.autofillColumn ? 'auto-fill' : this.columns
      }, ${
        this.cellWidth.match(/,/) ? `minmax(${this.cellWidth})` : this.cellWidth
      })`,
      gridTemplateRows: `repeat(${
        this.autofillRow ? 'auto-fill' : this.rows
      }, ${
        this.cellHeight.match(/,/)
          ? `minmax(${this.cellHeight})`
          : this.cellHeight
      })`,
    };
    //const colorClass = classMap({ color: this.color });
    return html`<div style=${styleMap(gridStyle)}>
      <slot></slot>
    </div> `;
  }
  static get styles(): CSSResultGroup[] {
    return [css``];
  }
}
