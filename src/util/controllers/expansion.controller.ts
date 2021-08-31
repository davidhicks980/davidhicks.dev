import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { debounce } from '../functions/debounce';
import { ExpansionHandler as CollapseHandler } from '../functions/expand-handler';

const handlers = new Map() as Map<string, CollapseHandler>;
type Controller<T> = ReactiveControllerHost & T;

type AnimationEvent = {
  key: any;
  state: 'STARTED' | 'FINISHED';
  collapsed: boolean;
};

const defineListenerError = Error(
  'Collapsible element does not have a defined listener. Use watchElement() on the element you are attempting to toggle'
);
const defineElementError = Error('No collapsible element defined');

export class CollapseController implements ReactiveController {
  host: Controller<HTMLElement>;
  _handlerKey: string;
  elementListeners = new WeakMap() as WeakMap<
    Element,
    Observable<AnimationEvent>
  >;
  collapsingPanel!: HTMLElement;
  panelHeight = 0;
  collapsed: boolean;
  observers!: {
    resize: ResizeObserver;
  };

  private _root: HTMLElement;
  inProgress: boolean;
  /**
   * The element that contains any elements that are expected to be affected by the expanding panel
   *
   * @type {HTMLElement}
   * @memberof CollapseController
   */
  get root(): HTMLElement {
    return this._root;
  }
  set root(value: HTMLElement) {
    this._root = value;
  }

  get handler(): CollapseHandler | undefined {
    return handlers.get(this._handlerKey);
  }

  startAnimation(isCollapsed: boolean) {
    if (isCollapsed) {
      this.host.classList.add('is-expanding');
    } else {
      this.host.classList.add('is-collapsing');
    }
    return false;
  }
  endAnimation(isCollapsed: boolean) {
    if (isCollapsed) {
      this.host.classList.remove('is-collapsing');
    } else {
      this.host.classList.remove('is-expanding');
    }
    this.collapsed = isCollapsed;
    return true;
  }
  toggle() {
    if (this.collapsingPanel) {
      this._beginToggleAnimation(this.collapsed);
    } else {
      throw defineElementError;
    }
  }
  collapse() {
    this.collapsed = true;
    this.updateElement(this.collapsed);
  }
  expand() {
    this.collapsed = false;
    this.updateElement(this.collapsed);
  }
  private _beginToggleAnimation(currentlyCollapsed: boolean): void {
    if (!this.inProgress) {
      this.inProgress = true;

      let offset = 0;
      let parentHeight = this.host.offsetHeight;
      if (currentlyCollapsed) {
        offset = this.collapsingPanel.scrollHeight;
        this.setOffsetRatio(this.collapsingPanel, parentHeight, offset);
        this.collapsingPanel.style.height = 'auto';
        this.collapsingPanel.style.marginBottom = '-' + offset + 'px';
        this.collapsingPanel.style.visibility = 'visible';
      } else {
        offset = this.collapsingPanel.scrollHeight;
        this.setOffsetRatio(this.collapsingPanel, parentHeight, offset);
        this.collapsingPanel.style.visibility = 'visible';
      }
      this.startAnimation(currentlyCollapsed);
      this.handler
        ?.toggle(this.host, offset, currentlyCollapsed)
        .then((collapsed) => {
          this.endAnimation(collapsed);
          this.updateElement(collapsed);
          this.inProgress = false;
        });
    } else return;
  }

  private updateElement(collapsed: boolean) {
    this.collapsingPanel.style.marginBottom = '0px';
    this.collapsingPanel.style.height = collapsed ? '0px' : 'auto';
    this.collapsingPanel.style.visibility = collapsed ? 'hidden' : 'visible';
    this.host.toggleAttribute('collapsed', collapsed);
  }

  /**
   * Set the ratio of the unexpanded parent's height to the total height. This is used for scaling purposes (e.g. scaling a border).
   *
   * @private
   * @param {HTMLElement} element
   * @param {number} parentHeight
   * @param {number} offset
   * @memberof CollapseController
   */
  private setOffsetRatio(
    element: HTMLElement,
    parentHeight: number,
    offset: number
  ): void {
    element.style.setProperty(
      '--offset-ratio',
      String((parentHeight + offset) / parentHeight) + 'px'
    );
  }

  updatePanel(panel: HTMLElement) {
    this.collapsingPanel = panel;
  }

  constructor(
    host: Controller<HTMLElement>,
    handlerKey: string,
    root: HTMLElement,
    collapsingPanel?: HTMLElement
  ) {
    (this.host = host).addController(this);
    if (handlerKey && root) {
      this._handlerKey = handlerKey;
      this._root = root;
      if (!handlers.has(this._handlerKey)) {
        handlers.set(this._handlerKey, new CollapseHandler(this._root));
      }
      if (collapsingPanel) {
        this.collapsingPanel = collapsingPanel;
      }
      this.collapsed = true;
    } else {
      throw new TypeError(
        'You must specify the root viewport and the key of your expansion controller'
      );
    }
  }
  hostConnected() {
    this.host.requestUpdate();
  }
}
