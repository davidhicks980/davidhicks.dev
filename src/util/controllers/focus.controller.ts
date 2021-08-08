import { ReactiveController, LitElement } from 'lit';

const FOCUS_SENTINEL_CLASS = 'focus-sentinel';
/**Simpler implementation of Google's MDC focus trap. Because I know the start and the end of my elements, I can skip some unnecessary functions  */
export class FocusController implements ReactiveController {
  host: LitElement;
  elFocusedBeforeTrapFocus: HTMLElement;
  root: HTMLElement;
  initialEl: HTMLElement;
  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  private createSentinel() {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('tabindex', '0');
    // Don't announce in screen readers.
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.classList.add(FOCUS_SENTINEL_CLASS);
    return sentinel;
  }

  /**
   * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
   * otherwises sets initial focus to the first focusable child element.
   */
  trapFocus(root: HTMLElement, intitiallyFocusedEl: HTMLElement) {
    this.elFocusedBeforeTrapFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.wrapTabFocus(root);
    this.root = root;

    this.initialEl = intitiallyFocusedEl;
    this.initialEl.focus();
  }
  /**
   * Releases focus from `root`. Also restores focus to the previously focused
   * element.
   */
  releaseFocus() {
    Array.from(this.root.querySelectorAll(`.${FOCUS_SENTINEL_CLASS}`)).forEach(
      (sentinels: HTMLElement) => {
        sentinels.parentElement!.removeChild(sentinels);
      }
    );
    if (this.elFocusedBeforeTrapFocus) {
      this.elFocusedBeforeTrapFocus.focus();
    }
  }

  wrapTabFocus(el: HTMLElement) {
    const sentinelStart = this.createSentinel();
    const sentinelEnd = this.createSentinel();
    const getElements = () =>
      this.host.shadowRoot.querySelectorAll(
        '[tabindex="0"]:not([aria-hidden])'
      );

    sentinelStart.addEventListener('focus', (e) => {
      const els = getElements();
      if (sentinelStart.isSameNode(e.target as HTMLElement) && els.length > 0) {
        (els[els.length - 1] as HTMLElement).focus();
      }
    });
    sentinelEnd.addEventListener('focus', (e) => {
      if (sentinelEnd.isSameNode(e.target as HTMLElement)) {
        const els = getElements();
        (els.item(0) as HTMLElement).focus();
      }
    });

    el.insertAdjacentElement('afterbegin', sentinelStart);
    el.insertAdjacentElement('beforeend', sentinelEnd);
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.releaseFocus();
  }
}
