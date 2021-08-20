import { state } from './util/primitives/store';
import { combineLatest, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { documentBreakpoints } from './util/primitives/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu-toggle.properties';
import { HicksHeader } from './components/header/header.component';
import { TableOfContents } from './components/toc/toc.component';

const elementById = (id) => document.getElementById(id);
fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    const app = elementById('app'),
      toggle = elementById('menu-toggle'),
      header = elementById('header'),
      toc = elementById('table-of-contents');
    const TOGGLED = ToggleProperties.TOGGLED,
      toggled$ = state.filteredStore([TOGGLED]);
    combineLatest([toggled$, documentBreakpoints.observeAllMatches$]).subscribe(
      ([menuToggle, breakpoint]) => {
        let open = menuToggle[TOGGLED] || false;
        let smallScreen = breakpoint.get('mobile') || breakpoint.get('tablet');
        if (smallScreen && open) {
          app.classList.add('has-open-menu');
          toggle.slot = TableOfContents.prototype.slotNames.toggle;
          toc.appendChild(toggle);
        } else {
          app.classList.remove('has-open-menu');
          toggle.slot = HicksHeader.prototype.slotNames.toggle;
          header.appendChild(toggle);
        }
      }
    );
    fromEvent(window, 'hashchange').subscribe((change) => {
      if (app.classList.contains('has-open-menu')) {
        app.classList.remove('has-open-menu');
        toggle.slot = HicksHeader.prototype.slotNames.toggle;
        header.appendChild(toggle);
        toggle.toggled = false;
      }
    });
    fromEvent(elementById('header'), 'focusin').subscribe((e: FocusEvent) => {
      let target = e.target as HTMLElement;
      let isInToolbar =
        target.classList.contains('toolbar-item') ||
        target.classList.contains('menu-toggle');
      if (isInToolbar) {
        if (window.scrollY < 450)
          window.scroll({
            top: 500,
            left: 0,
          });
      }
    });
    fromEvent(document, 'resumeload')
      .pipe(take(1))
      .subscribe(() => {
        const showDetailsToggle = elementById('show-hide-details');
        const resumeToggle = elementById('view-resume-cv');
        if (showDetailsToggle) {
          fromEvent(showDetailsToggle, 'click').subscribe(function (
            this: HTMLElement,
            ev: MouseEvent
          ) {
            let el = showDetailsToggle;
            let isChecked = el.getAttribute('aria-checked') === 'true';
            el.setAttribute('aria-checked', isChecked ? 'false' : 'true');
            el.toggleAttribute('data-toggled', !isChecked);
            state.update({ 'show-resume-entries': isChecked });
            el.innerText = isChecked ? 'Show Details' : 'Hide Details';
          });
        } else {
          throw Error('ThrowDetailsToggle is not defined');
        }
        if (resumeToggle) {
          fromEvent(resumeToggle, 'click').subscribe(function (
            this: HTMLElement,
            ev: MouseEvent
          ) {
            let isChecked = this.getAttribute('aria-checked') === 'true';
            this.setAttribute('aria-checked', isChecked ? 'true' : 'false');
            this.toggleAttribute('data-toggled', !isChecked);
            state.update({ 'is-resume': isChecked });
            this.innerText = isChecked ? 'Hide Details' : 'Show Details';
          });
        } else {
          throw Error('CVToggle is not defined');
        }
      });
  });
