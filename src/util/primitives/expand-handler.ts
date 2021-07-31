export class ExpansionHandler {
  private _elementsInViewport: HTMLElement[] = [];
  private observers: {
    intersection: IntersectionObserver;
    mutation: MutationObserver;
    resize?: ResizeObserver;
  };
  transition: string;
  private _animationMap: WeakMap<HTMLElement, Animation[]>;
  addVisibleElements(elements: HTMLElement[]) {
    this._elementsInViewport.push(...elements);
  }
  /**
   *  Starts observing elements in the specified observers. If the type of observers are not specified, all observers will start observing the specified elements
   *
   * @param {HTMLElement[]} elements
   * @param {string} [types=['mutation', 'intersection', 'resize']]
   * @memberof ExpansionHandler
   */
  observeElements(
    elements: HTMLElement[],
    types = ['mutation', 'intersection', 'resize']
  ) {
    elements.forEach((element: HTMLElement) => {
      types.forEach((type) => this.observers[type].observe(element));
    });
  }
  getElementIds(elements: HTMLElement[]) {
    return elements.map((el: HTMLElement) => el.id);
  }
  removeHiddenElements(elements: HTMLElement[]) {
    const filter = (el: HTMLElement) =>
      !this.getElementIds(elements).includes(el.id);
    this._elementsInViewport = this._elementsInViewport.filter(filter);
  }
  getElementsAfter(elem: HTMLElement) {
    let after = false;
    this._elementsInViewport.filter((el) => {
      if (el.isSameNode(elem)) {
        after = true;
        return false;
      }
      return after;
    });
  }
  addElementAnimation(
    el: HTMLElement,
    offset: number,
    proceedingElements: HTMLElement[]
  ) {
    let keyframes = [
      { transform: `translateY(-${offset}px)` },
      { transform: 'translateY(0px)' },
    ];
    let timings = {
      duration: 1000,
    };

    let frames = proceedingElements.map(
      (el: HTMLElement) =>
        new Animation(
          new KeyframeEffect(el, keyframes, timings),
          document.timeline
        )
    );
    this._animationMap.set(el, frames);
  }
  elementClicked(el: HTMLElement) {
    let animations = this._animationMap.get(el);
    animations.forEach((anime) => {
      let playState = anime.playState;
      switch (playState) {
        case 'running':
          anime.reverse();
          break;
        case 'finished':
          anime.reverse();
          anime.play();
          break;
      }
    });
  }

  /**
   *  Stops observing elements in the specified observers. If the type of observers are not specified, all will stop observing the specified elements
   *
   * @param {HTMLElement[]} elements
   * @param {string} [types=['mutation', 'intersection', 'resize']]
   * @memberof ExpansionHandler
   */
  unobserveElements(
    elements: HTMLElement[],
    types = ['mutation', 'intersection', 'resize']
  ) {
    elements.forEach((element: HTMLElement) => {
      for (let type of types) {
        this.observers[type].unobserve(element);
      }
    });
  }
  destroy() {
    Object.values(this.observers).forEach((obs) => obs.disconnect());
  }
  initIntersectionObserver() {
    return new IntersectionObserver(
      function (this: ExpansionHandler, entries: IntersectionObserverEntry[]) {
        let entered = [],
          left = [];
        let inView = (e) => e.isIntersection;
        entries.forEach((e) => (inView(e) ? entered.push(e) : left.push(e)));
        this.addVisibleElements(entered);
        this.removeHiddenElements(left);

        // If intersectionRatio is 0, the target is out of view
        // and we do not need to do anything.
      },
      {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [0, 1],
      }
    );
  }
  initMutationObserver() {
    const mutationCallback = (mutationList: MutationRecord[]): void => {
      mutationList
        .filter((mutation) => mutation.type === 'childList')
        .map((mutation) => [...Object.values(mutation.removedNodes)]);
    };
    // start observing
    return new MutationObserver(mutationCallback);
  }

  constructor(elements: HTMLElement[]) {
    this.observers = {
      mutation: this.initMutationObserver(),
      intersection: this.initIntersectionObserver(),
    };
    this.observeElements(elements, ['mutation', 'intersection']);
  }
  /**
   * Watch for element resize whenever elements enter into the viewport.
   *
   * @returns {*}  {*}
   * @memberof ExpansionHandler
   */
  initResizeObserver(): any {
    return new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
        } else {
        }
      }

      console.log('Size changed');
    });
  }
}
