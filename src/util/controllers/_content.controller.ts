import { ReactiveController, ReactiveControllerHost } from 'lit';
import { DomController } from './dom.controller';

const mutationCallback = function (updateSections: () => HTMLElement[]) {
  return function (mutationList: MutationRecord[]) {
    mutationList
      .filter((mutation) => mutation.type === 'childList')
      .map((mutation) => [
        ...Object.values(mutation.addedNodes),
        ...Object.values(mutation.removedNodes),
      ])
      .some((node) => {
        return 'tagName' in node
          ? node['tagName'].toLowerCase() === 'section'
          : false;
      })
      ? updateSections()
      : null;
  };
};
export class ContentController implements ReactiveController {
  host: ReactiveControllerHost;
  private _contentSelector: string;
  private _sectionSelector: string;
  private _mutationObserver: MutationObserver;
  get sectionSelector(): string {
    return this._sectionSelector;
  }
  set sectionSelector(value: string) {
    this._sectionSelector = value;
    this._observeMutations();
  }
  private _dom: DomController;

  _observeMutations() {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
    const resetSections = function (this: ContentController) {
      this.queries.sections(this.sectionSelector);
    }.bind(this);
    let cb = mutationCallback(resetSections);
    this._mutationObserver = new MutationObserver(cb);
    this._mutationObserver.observe(this.content as Node, {
      childList: true,
    });
  }
  get sections() {
    return this._dom.cache.get(this._sectionSelector);
  }
  get content() {
    return this._dom.cache.get(this._contentSelector);
  }
  get queries() {
    return {
      content: (selector: string) => {
        this._contentSelector = selector;

        return this._dom.query(selector, true);
      },
      sections: (selector: string) => {
        this._sectionSelector = selector;

        return this._dom.queryAll(selector, true);
      },
    };
  }

  constructor(
    host: ReactiveControllerHost,
    contentSelector: string,
    sectionSelector: string
  ) {
    (this.host = host).addController(this);
    this._dom = new DomController(host);
    this.queries.content(contentSelector);
    this.queries.sections(sectionSelector);
    this._observeMutations();
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this._mutationObserver.disconnect();
    this._dom.clear();
  }
}
