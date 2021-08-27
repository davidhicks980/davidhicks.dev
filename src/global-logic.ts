import { state } from './util/functions/store';
import { combineLatest, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { documentBreakpoints } from './util/functions/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu.toggle.properties';
import { TableOfContents } from './components/toc/toc.component';

const elementById = (id) => document.getElementById(id) as HTMLElement;
fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    const app = elementById('app'),
      toggle = elementById('menu-toggle'),
      header = elementById('header'),
      toc = elementById('table-of-contents'),
      navigation = elementById('toolbar-navigation');
    const scrollToToolbar = (e: Event) => {
      e.preventDefault();
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        window.scroll({
          top: scrollY < 510 ? 500 : scrollY,
        });
      });
    };
    fromEvent(navigation, 'focusin').subscribe((e: Event) =>
      scrollToToolbar(e)
    );
    fromEvent(toggle, 'focusin').subscribe((e: Event) => scrollToToolbar(e));

    const TOGGLED = ToggleProperties.TOGGLED,
      toggled$ = state.filteredChanges([TOGGLED]);

    combineLatest([toggled$, documentBreakpoints.observeAllMatches$]).subscribe(
      ([menuToggle, breakpoint]) => {
        const open = menuToggle[TOGGLED] || false;
        const smallScreen =
          breakpoint.get('mobile') || breakpoint.get('tablet');
        if (smallScreen && open) {
          app.classList.add('has-open-menu');
          toggle.slot = TableOfContents.prototype.slotNames.toggle;
          toc.appendChild(toggle);
        } else {
          app.classList.remove('has-open-menu');
          toggle.slot = 'navigation-toggle';
          header.appendChild(toggle);
        }
      }
    );

    fromEvent(document, 'resumeload')
      .pipe(take(1))
      .subscribe(() => {
        const showDetailsToggle = elementById('show-hide-details');
        const resumeToggle = elementById('view-resume-cv');
        if (showDetailsToggle) {
          fromEvent(showDetailsToggle, 'pressed').subscribe(
            (ev: CustomEvent) => {
              state.update({ app$expand: !ev.detail });
            }
          );
        } else {
          throw Error('ThrowDetailsToggle is not defined');
        }
        if (resumeToggle) {
          fromEvent(resumeToggle, 'pressed').subscribe((ev: CustomEvent) => {
            state.update({ app$showcv: ev.detail });
          });
        } else {
          throw Error('CVToggle is not defined');
        }

        setTimeout(
          //Start with only resume entries showing.
          () => state.update({ app$showcv: false }),
          200
        );
        //Expand resume entries on init
        state.update({ app$expand: true });
      });
  });
