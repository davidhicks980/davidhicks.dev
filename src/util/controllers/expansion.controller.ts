import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { ExpansionHandler } from '../primitives/expand-handler';

const handlers = new Map() as Map<string, ExpansionHandler>;
type Controller<T> = ReactiveControllerHost & T;
type CollapsingElement = {
  toggle: (force?: boolean) => boolean;
};
type CollapsingController = Controller<HTMLElement> & CollapsingElement;

type AnimationEvent = {
  key: any;
  state: 'STARTED' | 'FINISHED';
  collapsed: boolean;
};

export class CollapseController implements ReactiveController {
  host: CollapsingController;

  elementsInViewport = [];
  subscription: this;
  _handlerKey: string;
  inProgress: boolean;
  elementListeners = new WeakMap() as WeakMap<
    Element,
    Observable<AnimationEvent>
  >;
  private _root: HTMLElement;

  get handler(): ExpansionHandler {
    return handlers.get(this._handlerKey);
  }

  expansionCallback(this: CollapseController, anime: AnimationEvent) {
    const { collapsed, state } = anime;
    this.host.toggle(collapsed);
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
    }
    return true;
  }
  toggle(element: HTMLElement, collapsed: boolean) {
    this.elementListeners
      .get(element)
      .pipe(
        filter((ev) => this.expansionCallback(ev)),
        take(1)
      )
      .subscribe();
    this.handler.toggle(element, this.host, collapsed);
  }

  watchElement(element: HTMLElement, height: number) {
    const listener = this.handler.addAnimation(element, this.host, height);
    this.elementListeners.set(element, listener);
  }
  constructor(
    host: CollapsingController,
    handlerKey: string,
    root: HTMLElement
  ) {
    (this.host = host).addController(this);
    this._handlerKey = handlerKey;
    this._root = root;
    if (!handlers.has(this._handlerKey)) {
      handlers.set(this._handlerKey, new ExpansionHandler(this._root));
    }
  }
  hostConnected() {
    this.host.requestUpdate();
  }
}
