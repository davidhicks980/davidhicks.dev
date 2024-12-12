import { state } from './util/functions/store';
import { combineLatest, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { documentBreakpoints } from './util/functions/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu.toggle.properties';
import { TableOfContents } from './components/toc/toc.component';
import { isElement } from './util/functions/is-html-element';
import { PlotEngine } from './components/plot/plot.component';
import { render, TemplateResult } from 'lit';
import { UnlockResumeProperties } from './components/resume/unlock-form/unlock-resume.properties';

const elementById = (id) => document.getElementById(id) as HTMLElement;
fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    const app = elementById('app'),
      toggle = elementById('menu-toggle'),
      menuIcon = document.querySelector('.menu-icon'),
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
    fromEvent(document, 'toggle')
      .pipe(take(1))
      .subscribe((e: Event) => {
        document.getElementById('plot-engine-anchor').append(new PlotEngine());
      });

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
          window.requestAnimationFrame(() => {
            menuIcon?.classList.add('animate-close');
          });
          app.classList.add('hide-overflow');
        } else {
          app.classList.remove('hide-overflow');
          toggle.slot = 'navigation-toggle';
          header.appendChild(toggle);
          menuIcon?.classList.remove('animate-close');
          app.classList.remove('has-open-menu');
        }
      }
    );
    //When the resume section is loaded, replace the unlock resume section with the loaded resume section
    state
      .filteredChanges([UnlockResumeProperties.RESUME_TEMPLATE])
      .pipe(take(1))
      .subscribe((result: Record<string, TemplateResult<1>[]>) => {
        let resume = elementById('resume-section'),
          renderBefore = elementById('contact-section'),
          content = elementById('content');
        resume.remove();
        render(Object.values(result), content, { renderBefore });
      });

    //On resume load, add expansion and CV buttons, add classes to resume headers, and initiate the resume section with CV entries hidden and resume entries expanded
    fromEvent(document, 'resumeload')
      .pipe(take(1))
      .subscribe(() => {
        const showDetailsToggle = elementById('show-hide-details'),
          resumeToggle = elementById('view-resume-cv'),
          { SHOW_CV, EXPAND_STATE } = GlobalResumeProperties;
        if (showDetailsToggle) {
          fromEvent(showDetailsToggle, 'pressed').subscribe(
            (ev: CustomEvent) => {
              state.update({ [EXPAND_STATE]: !ev.detail });
            }
          );
        } else {
          throw Error('ThrowDetailsToggle is not defined');
        }
        if (resumeToggle) {
          fromEvent(resumeToggle, 'pressed').subscribe((ev: CustomEvent) => {
            state.update({ [SHOW_CV]: ev.detail });
          });
        } else {
          throw Error('CVToggle is not defined');
        }
        //Initially hide CV entries, but expand resume entries
        window.requestAnimationFrame(() =>
          state.update({ [SHOW_CV]: false, [EXPAND_STATE]: true })
        );

        const headers = Array.from(
          document.querySelector('.content')?.querySelectorAll('h2[id], h3[id]')
        );

        //Add the resume-header class to any section headers after the resume section. This class hides content underneath the header, so that expanding the header does not reveal any visual artifacts.
        let resumeHeader;
        while (headers.length) {
          resumeHeader = headers.pop() as HTMLElement;
          resumeHeader.classList.add('resume-header');
          if (isElement(resumeHeader) && resumeHeader.id === 'resume') {
            break;
          }
        }
      });
  });
