import { ReactiveController, ReactiveControllerHost } from 'lit';
import { ObservableSet } from '../primitives/observable-set';
import { BehaviorSubject } from 'rxjs';
import { combineLatestWith } from 'rxjs/operators';

const emitters = new Map() as Map<
  string,
  {
    expansion: ObservableSet;
    active: BehaviorSubject<string>;
    paths: Set<string>;
  }
>;
export class ListItemController implements ReactiveController {
  host: ReactiveControllerHost;
  _handler: string;
  _paths: Set<string>;
  lock = false;
  createHandler(name: string) {
    if (emitters.has(name)) {
      throw new Error(
        `[${ListItemController.name}.${this.createHandler.name}] Observer already exists`
      );
    } else {
      emitters.set(name, {
        expansion: new ObservableSet([]),
        active: new BehaviorSubject(''),
        paths: new Set(''),
      });
      this._handler = name;
    }
    return this;
  }
  get emitters() {
    if (this._handler) {
      return emitters.get(this._handler);
    } else {
      throw new Error(
        `[${ListItemController.name}.emitters] Observer already exists`
      );
    }
  }

  expandAll() {
    this.expand('*');
    this.lock = true;
  }
  collapseAll() {
    this.collapse('*');
    this.lock = false;
  }
  expand(paths: string | string[]) {
    this.emitters.expansion.add(paths);
    return this;
  }
  collapse(paths: string | string[]) {
    this.emitters.expansion.delete(paths);
    return this;
  }
  activate(path: string) {
    this.emitters.active.next(path);
    this._expandAncestors(path);
    return this;
  }
  _expandAncestors(path: string) {
    let ancestors = path.split('.');
    const ancestorPaths = [];
    while (ancestors.length) {
      ancestorPaths.push(ancestors.join('.'));
      ancestors.pop();
    }
    this.expand(ancestorPaths);
  }
  observe = {
    all: () =>
      this.emitters.expansion.observer.pipe(
        combineLatestWith(this.emitters.active.asObservable())
      ),
    expansion: () => this.emitters.expansion.observer,
    active: () => this.emitters.active.asObservable(),
  };
  constructor(host: ReactiveControllerHost, handler?: string, path?: string) {
    (this.host = host).addController(this);
    if (handler) {
      this._handler = handler;
    }
  }

  hostConnected() {
    this.host.requestUpdate();
  }
}
