import { state } from './util/primitives/store';
import { combineLatest, fromEvent, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { documentBreakpoints } from './util/primitives/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu-toggle.properties';

fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    let app = document.getElementById('app');
    let toggleBtn = document.getElementById('menu-toggle');
    let headerAnchor = () => document.querySelector('.header__toggle-anchor');
    let tocAnchor = () => document.querySelector('.toc__toggle-anchor');
    let TOGGLED = ToggleProperties.TOGGLED;
    let toggled$ = state.filteredStore([TOGGLED]);
    combineLatest([toggled$, documentBreakpoints.observeAllMatches$]).subscribe(
      ([menuToggle, breakpoint]) => {
        let open = menuToggle[TOGGLED] || false;
        let smallScreen = breakpoint.get('mobile') || breakpoint.get('tablet');
        if (smallScreen && open) {
          app.classList.add('has-open-menu');
          tocAnchor().appendChild(toggleBtn);
        } else {
          app.classList.remove('has-open-menu');
          headerAnchor().appendChild(toggleBtn);
        }
      }
    );
    fromEvent(document, 'resumeload')
      .pipe(take(1))
      .subscribe(() => {
        const showDetailsToggle = document.getElementById('show-hide-details');
        const resumeToggle = document.getElementById('view-resume-cv');
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
