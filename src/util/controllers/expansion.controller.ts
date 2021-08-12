import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { ExpansionHandler as CollapseHandler } from '../primitives/expand-handler';

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
  elementsInViewport = [];
  _handlerKey: string;
  inProgress: boolean;
  elementListeners = new WeakMap() as WeakMap<
    Element,
    Observable<AnimationEvent>
  >;

  private _root: HTMLElement;
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
  collapsingPanel: HTMLElement;
  panelHeight: number;
  collapsed: boolean;
  observers: {
    resize: ResizeObserver;
  };

  get handler(): CollapseHandler {
    return handlers.get(this._handlerKey);
  }

  handleAnimationEvents(anime: AnimationEvent) {
    const { collapsed, state } = anime;
    if (state === 'STARTED') {
      if (collapsed) {
        this.host.classList.add('is-expanding');
      } else {
        this.host.classList.add('is-collapsing');
      }
      return false;
    } else if (state === 'FINISHED') {
      if (collapsed) {
        this.host.classList.remove('is-collapsing');
      } else {
        this.host.classList.remove('is-expanding');
      }
      this.collapsed = collapsed;
      return true;
    }
    return true;
  }
  toggle(element?: HTMLElement) {
    const target = element ?? this.collapsingPanel;
    if (target) {
      this._initToggle(target, this.collapsed);
    } else {
      defineElementError;
    }
  }
  private _initToggle(element, currentlyCollapsed: boolean) {
    const listener = this.elementListeners.get(element);
    if (listener) {
      listener
        .pipe(
          filter((ev) => this.handleAnimationEvents(ev)),
          take(1)
        )
        .subscribe(() => {
          this.host.toggleAttribute('collapsed', this.collapsed);
          this._displaceElement(this.collapsed);
        });
      this.handler.toggle(element, currentlyCollapsed);
    } else {
      throw defineListenerError;
    }
  }

  updatePanel(panel: HTMLElement) {
    this.collapsingPanel = panel;
    if (this.collapsingPanel) {
      this.updateOffset();
    } else {
      throw defineElementError;
    }
  }
  updateOffset() {
    window.requestAnimationFrame(() => {
      let height = this.collapsingPanel.offsetHeight;
      if (height > 0) {
        this.panelHeight = height;
        this.watchElement(this.collapsingPanel);
      } else {
        throw Error('Panel height is zero: no expansion animation will occur');
      }
    });
  }
  private _displaceElement(force: boolean) {
    this.host.style.marginBottom = this.collapsed
      ? -1 * this.panelHeight + 'px'
      : '0px';
  }
  watchElement(element: HTMLElement) {
    this.panelHeight = element.offsetHeight;
    const listener = this.handler.addAnimation(
      element,
      this.host,
      this.panelHeight
    );
    this.elementListeners.set(element, listener);
    if (!this.observers?.resize) {
      this.observers = {
        resize: new ResizeObserver(() => this.updateOffset()),
      };
      this.observers.resize.observe(this.host);
    }
  }
  constructor(
    host: Controller<HTMLElement>,
    handlerKey: string,
    root: HTMLElement,
    collapsingPanel?: HTMLElement
  ) {
    (this.host = host).addController(this);
    this._handlerKey = handlerKey;
    this._root = root;
    if (!handlers.has(this._handlerKey)) {
      handlers.set(this._handlerKey, new CollapseHandler(this._root));
    }
    this.collapsingPanel = collapsingPanel;
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.observers.resize.disconnect();
  }
}
