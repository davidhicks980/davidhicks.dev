import { ReactiveControllerHost } from 'lit';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
type Controller<T> = ReactiveControllerHost & T;

const isParent = (parent: HTMLElement, child: HTMLElement) =>
  parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY;
const isAfter = (before: HTMLElement, after: HTMLElement) =>
  before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_PRECEDING;
export class ExpansionHandler {
  private _inViewport: WeakSet<HTMLElement>;

  private observers: {
    intersection: IntersectionObserver;
  };
  private _animations: Map<
    Symbol,
    {
      key: Symbol;
      element: HTMLElement;
      host: HTMLElement;
      frames: {
        element: HTMLElement;
        animations: { expand: Animation; collapse: Animation };
      }[];
      offset: number;
      proceeding: HTMLElement[];
      startTime: number;
      endTime: number;
      observer: Observable<{
        key: Symbol;
        state: 'STARTED' | 'FINISHED';
        collapsed: boolean;
      }>;
    }
  >;

  private _parentEl: HTMLElement;
  private _elementKeys: WeakMap<object, any>;
  animating: boolean;

  /**
   *  Starts observing elements in the specified observers. If the type of observers are not specified, all observers will start observing the specified elements
   *
   * @param {HTMLElement[]} elements
   * @param {string} [types=['mutation', 'intersection', 'resize']]
   * @memberof ExpansionHandler
   */
  _observe(elements: HTMLElement[], types = ['intersection']) {
    elements.forEach((element: HTMLElement) => {
      types.forEach((type) => this.observers[type].observe(element));
    });
  }

  _walkChildren(children: HTMLElement[], host) {
    let el: HTMLElement;
    let proceeding = [];
    while (children.length) {
      el = children.pop() as HTMLElement;
      if (isParent(el, host)) {
        const nodeChildren = Array.from(el.children) as HTMLElement[];
        proceeding = proceeding.concat(this._walkChildren(nodeChildren, host));
      } else if (isAfter(el, host)) {
        proceeding.push(el);
      } else continue;
    }
    return proceeding;
  }

  _getElementsFollowing(host: HTMLElement) {
    const children = Array.from(this._parentEl.children) as HTMLElement[];
    return this._walkChildren(children, host);
  }
  _updateObservedChildren() {
    return Array.from(this._animations)
      .map(([_, { host, proceeding }]) => [host, proceeding])
      .flat(3) as HTMLElement[];
  }
  addAnimation(
    element: HTMLElement,
    expandAfterHost: HTMLElement,
    offset: number,
    options = { duration: 250, easing: 'ease-in-out' }
  ) {
    const expandKeyframes = [
      { transform: `translateY(0px)` },
      { transform: `translateY(${offset}px)` },
    ];
    const collapseKeyframes = [
      { transform: `translateY(0px)` },
      { transform: `translateY(-${offset}px)` },
    ];

    const proceeding = this._getElementsFollowing(
      expandAfterHost
    ) as HTMLElement[];
    const frames = proceeding.map((el: HTMLElement) => {
      const expandEffect = new KeyframeEffect(el, expandKeyframes, options);
      const collapseEffect = new KeyframeEffect(el, collapseKeyframes, options);
      return {
        element: el,
        animations: {
          expand: new Animation(expandEffect, document.timeline),
          collapse: new Animation(collapseEffect, document.timeline),
        },
      };
    });
    const key = this._accessKey(element);
    const observer = this._animationSubject
      .asObservable()
      .pipe(filter((animation) => animation.key === key));
    this._animations.set(key, {
      key,
      host: expandAfterHost,
      observer,
      element,
      frames,
      offset,
      proceeding,
      startTime: 0,
      endTime: 0,
    });
    this._observe(this._updateObservedChildren());
    return observer;
  }
  _animationSubject = new Subject() as Subject<{
    key: Symbol;
    state: 'STARTED' | 'FINISHED';
    collapsed: boolean;
  }>;

  _accessKey(element: HTMLElement) {
    if (!this._elementKeys.has(element)) {
      this._elementKeys.set(element, Symbol('expanding-element'));
    }
    return this._elementKeys.get(element);
  }
  _getAnimation(element: HTMLElement) {
    return this._animations.get(this._accessKey(element));
  }

  toggle(element: HTMLElement, isCollapsed: boolean) {
    const { frames, key } = this._getAnimation(element);
    let animations = frames
      .filter((frame) => this._inViewport.has(frame.element))
      .map(({ animations }) =>
        isCollapsed ? animations.expand : animations.collapse
      );

    if (animations.length === 0) {
      animations = frames
        .filter((el) => el.element.clientTop < 3000)
        .map(({ animations }) =>
          isCollapsed ? animations.expand : animations.collapse
        );
    }
    let state = 'STARTED' as 'STARTED' | 'FINISHED';
    this._animationSubject.next({ key, state, collapsed: isCollapsed });

    animations.forEach((a) => {
      a.onfinish = () => {
        state = 'FINISHED';
        isCollapsed = !isCollapsed;
        this._animationSubject.next({
          key,
          state,
          collapsed: isCollapsed,
        });
      };

      a.play();
    });
  }

  /**
   *  Stops observing elements in the specified observers. If the type of observers are not specified, all will stop observing the specified elements
   *
   * @param {HTMLElement[]} elements
   * @param {string} [types=['mutation', 'intersection', 'resize']]
   * @memberof ExpansionHandler
   */
  unobserve(
    element: HTMLElement,
    types = ['mutation', 'intersection', 'resize']
  ) {}
  destroy() {
    Object.values(this.observers).forEach((obs) => obs.disconnect());
  }
  getIntersectionObserver() {
    const callback = function (
      this: ExpansionHandler,
      entries: IntersectionObserverEntry[]
    ) {
      const inView = (e: IntersectionObserverEntry) => e.isIntersecting;
      entries.forEach((e) => {
        const tar = e.target as HTMLElement;
        window.requestAnimationFrame(() => {
          if (inView(e)) {
            this._inViewport.add(tar);
            tar.style.willChange = 'transform';
          } else {
            this._inViewport.delete(tar);
            tar.style.willChange = 'unset';
          }
        });
      });
    };
    const props = {
      root: null,
      rootMargin: '0px 0px 600px 0px',
      threshold: [0, 0.5],
    };
    return new IntersectionObserver(callback.bind(this), props);
  }

  constructor(root: HTMLElement) {
    this.observers = { intersection: this.getIntersectionObserver() };
    this._animations = new Map();
    this._parentEl = root;
    this._inViewport = new WeakSet();
    this._elementKeys = new WeakMap();
  }
}
