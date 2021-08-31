import { ReactiveControllerHost } from 'lit';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const isParent = (parent: HTMLElement, child: HTMLElement) =>
  parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY;
const isAfter = (before: HTMLElement, after: HTMLElement) =>
  before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_PRECEDING;

export class ExpansionHandler {
  private _parentEl: HTMLElement;

  _walkChildren(
    children: HTMLElement[],
    host: HTMLElement,
    offset: number
  ): HTMLElement[] {
    let child: HTMLElement;
    let proceeding = [] as HTMLElement[];
    while (children.length) {
      child = children.pop() as HTMLElement;
      if (child.clientTop > offset) {
        break;
      }
      if (isParent(child, host)) {
        const nodeChildren = Array.from(child.children) as HTMLElement[];
        proceeding = proceeding.concat(
          this._walkChildren(nodeChildren, host, offset)
        );
      } else if (isAfter(child, host)) {
        proceeding.push(child);
      } else continue;
    }
    return proceeding;
  }

  _getElementsFollowing(host: HTMLElement) {
    const children = Array.from(this._parentEl.children) as HTMLElement[];
    return this._walkChildren(children, host, 500);
  }

  buildKeyframes(
    host: HTMLElement,
    offset: number,
    expanding: boolean,
    options: KeyframeEffectOptions = {
      duration: 350,
      easing: 'ease-out',
      iterations: 1,
    }
  ) {
    let start = '0';
    let end = (expanding ? 1 : -1) * offset;

    const keyframes = [
      { transform: `translateY(${start}px)` },
      { transform: `translateY(${end}px)` },
    ];
    const proceeding = this._getElementsFollowing(host) as HTMLElement[];
    return proceeding.map((el: HTMLElement) => {
      return new Animation(
        new KeyframeEffect(el, keyframes, options),
        document.timeline
      );
    });
  }

  toggle(
    host: HTMLElement,
    offset: number,
    isCollapsed: boolean
  ): Promise<boolean> {
    const animations = this.buildKeyframes(host, offset, isCollapsed);

    return new Promise((resolve, reject) => {
      animations.forEach((a: Animation) => {
        a.onfinish = () => {
          isCollapsed = !isCollapsed;
          resolve(isCollapsed);
        };
        a.play();
      });
    });
  }

  destroy() {}

  constructor(root: HTMLElement) {
    this._parentEl = root;
  }
}
