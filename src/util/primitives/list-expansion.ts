import { BehaviorSubject } from 'rxjs';
export class ObservableSet {
  _emitter: BehaviorSubject<Set<any>>;
  _observedSet: Set<string>;

  constructor(values: any[]) {
    this._observedSet = new Set(values);
    this._emitter = new BehaviorSubject(this._observedSet);
  }

  destroy(values) {
    this._emitter.unsubscribe();
    this._observedSet.clear();
  }
  add(elements: any | any[]) {
    if (Array.isArray(elements)) {
      elements.forEach((path) => this._observedSet.add(path));
    } else {
      this._observedSet.add(elements);
    }
    this.emit();
    return this;
  }
  emit() {
    this._emitter.next(this._observedSet);
  }
  has(element) {
    return this._observedSet.has(element);
  }
  delete(elements: any | any[]) {
    if (Array.isArray(elements)) {
      elements.forEach((path) => this._observedSet.delete(path));
    } else {
      this._observedSet.delete(elements);
    }
    this.emit();
    return this;
  }
  clear() {
    this._observedSet.clear();
  }
  get size() {
    return this._observedSet.size;
  }
  get observer() {
    return this._emitter.asObservable();
  }
}
