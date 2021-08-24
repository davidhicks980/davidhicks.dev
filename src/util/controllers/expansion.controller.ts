import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { debounce } from '../functions/debounce';
import { ResizeObserver } from '@juggle/resize-observer';
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
  panelHeight: number = 0;
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
      this._beginToggleAnimation(target, this.collapsed);
    } else {
      throw defineElementError;
    }
  }
  collapse() {
    this.collapsed = true;
    this._displaceElement();
  }
  expand() {
    this.collapsed = false;
    this._displaceElement();
  }
  private _beginToggleAnimation(element, currentlyCollapsed: boolean) {
    const listener = this.elementListeners.get(element);
    if (listener) {
      listener
        .pipe(
          filter((ev) => this.handleAnimationEvents(ev)),
          take(1)
        )
        .subscribe(() => {
          this._displaceElement();
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
  updateOffset(): number {
    window.requestAnimationFrame(() => {
      let height = this.collapsingPanel.offsetHeight;
      if (height > 0) {
        this.panelHeight = height;
        this.watchElement(this.collapsingPanel);
        this._displaceElement();
        return this.panelHeight;
      } else {
        console.info('Panel height is zero: no expansion animation will occur');
      }
    });
    return this.panelHeight;
  }
  private _displaceElement() {
    this.host.toggleAttribute('collapsed', this.collapsed);
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
        resize: new ResizeObserver(debounce(50, this.updateOffset.bind(this))),
      };
      this.observers.resize.observe(this.collapsingPanel);
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
    this.collapsed = true;
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.observers.resize.disconnect();
  }
}
