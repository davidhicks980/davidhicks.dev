import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './grid.css';
import { styleMap } from 'lit/directives/style-map.js';
//import { classMap } from 'lit/directives/class-map.js'

@customElement('hicks-grid')
export class TitleGridComponent extends LitElement {
  private _area: string = '.';
  lastMedia: string;
  //@property({ type: Array }) propArray: any[]
  @property({ type: String })
  public get area(): string {
    return this._area;
  }
  public set area(value: string) {
    const oldArea = this._area;
    this._area = value.replace(/\s/g, '');
    this.style.backgroundColor = value;
    this.requestUpdate('area', oldVal);
  }

  @property({ type: Number })
  xs: number = 599.99;
  @property({ type: Number })
  sm: number = 600;
  @property({ type: Number })
  med: number = 900;
  @property({ type: Number })
  lrg: number = 1200;
  @property({ type: Number })
  xlrg: number = 1800;

  @property({ type: String })
  gap: string = '1rem';
  //@property({ type: Boolean }) propBoolean: boolean
  //@property({ type: Object }) propObject: object
  //@property({ type: Number }) propNumber: number
  //@property() color: string = 'black'
  queryMap = new Map() as Map<
    string,
    {
      matcher: MediaQueryList;
      listener: (evt: MediaQueryListEvent) => void;
    }
  >;

  bp = {
    extraSmall: 'xs',
    small: 'sm',
    medium: 'med',
    large: 'lrg',
    extraLarge: 'xlrg',
  };
  beginListening() {
    Object.values(this.bp).forEach((val, i, arr) => {
      let mediaQuery = '';
      this.addBpListener(val, arr[i + 1]);
    });
  }
  private addBpListener(bpName: string, proceedingBP?: string) {
    let temp = (comparator, width) => `and (${comparator}-width: ${width}px)`;
    let startVal = val === this.bp.extraSmall ? 'min' : 'max';
    let start = temp(startVal, this[arr[i]]);
    if (val != this.bp.extraLarge) {
      mediaQuery = start + temp('max', this[arr[i + 1]]);
    }
    let queryList = window.matchMedia(media);
    const listener = this.queryResponse(this[bpName], queryList);
    queryList.addEventListener('change', listener);
    this.queryMap.set(bpName, {
      matcher: queryList,
      listener,
    });
  }

  updateListener(name: string) {
    let { matcher, listener } = this.queryMap.get(name);
    matcher.removeEventListener('change', listener, false);
    this.addBpListener(name);
  }
  queryResponse(bpName: string, queryList: MediaQueryList) {
    return (evt: MediaQueryListEvent) => {
      this.updateLayout(bpName);
    };
  }
  updateLayout(bpName: string) {
    this.gridMap = styleMap();
  }

  updated(changedProperties) {
    for (let key of Object.keys(this.bp)) {
      if (changedProperties.has(key)) {
        window.matchMedia(query);
      }
    }
  }
  constructor() {
    super();
  }
  queries() {}
  render(): TemplateResult {
    //const colorClass = classMap({ color: this.color });
    return html`<div class="grid">
      <slot style="display: contents"></slot>
    </div>`;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
