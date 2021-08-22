import { state } from './util/primitives/store';
import { combineLatest, fromEvent } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { documentBreakpoints } from './util/primitives/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu.toggle.properties';
import { HicksHeader } from './components/header/header.component';
import { TableOfContents } from './components/toc/toc.component';
import { HeaderProperties } from './components/header/header.properties';

const elementById = (id) => document.getElementById(id);
fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    //Start with only resume entries showing.
    state.update({ resumeentries$showcv: false });
    //Expand resume entries on init
    state.update({ resumeentries$expand: true });

    const app = elementById('app'),
      toggle = elementById('menu-toggle'),
      header = elementById('header'),
      toc = elementById('table-of-contents');
    const TOGGLED = ToggleProperties.TOGGLED,
      toggled$ = state.filteredChanges([TOGGLED]);

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

    //Focusing on a button in the header will scroll to that button's position, which will make the button visible
    fromEvent(elementById('header'), 'focusin')
      .pipe(withLatestFrom(state.filteredStore([HeaderProperties.CURVED])))
      .subscribe(
        ([e, toolbarCurved]: [FocusEvent, Record<string, boolean>]) => {
          let target = e.target as HTMLElement;
          let isInToolbar =
            target.classList.contains('toolbar-item') ||
            target.classList.contains('menu-toggle');
          if (isInToolbar) {
            if (toolbarCurved[HeaderProperties.CURVED]) {
              console.log('ran');
              window.scroll({
                top: 500,
                left: 0,
              });
            }
          }
        }
      );

    fromEvent(document, 'resumeload')
      .pipe(take(1))
      .subscribe(() => {
        const showDetailsToggle = elementById('show-hide-details');
        const resumeToggle = elementById('view-resume-cv');
        if (showDetailsToggle) {
          fromEvent(showDetailsToggle, 'pressed').subscribe(function (
            this: HTMLElement,
            ev: CustomEvent
          ) {
            state.update({ app$expand: !ev.detail });
          });
        } else {
          throw Error('ThrowDetailsToggle is not defined');
        }
        if (resumeToggle) {
          fromEvent(resumeToggle, 'pressed').subscribe(function (
            this: HTMLElement,
            ev: CustomEvent
          ) {
            state.update({ app$showcv: ev.detail });
          });
        } else {
          throw Error('CVToggle is not defined');
        }
      });
  });
