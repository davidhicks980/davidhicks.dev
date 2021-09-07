import { state } from './util/functions/store';
import { combineLatest, fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { documentBreakpoints } from './util/functions/breakpoint-emitter.component';
import { ToggleProperties } from './components/toggle/menu.toggle.properties';
import { TableOfContents } from './components/toc/toc.component';
import { isElement } from './util/functions/is-html-element';
import { PlotEngine } from './components/plot/plot.component';
import { Tree } from './components/content/content.component';
import { render, Template, TemplateResult } from 'lit';
import { RESUME_UNLOCK_TEMPLATE_STATE } from './components/resume/unlock-form/unlock-resume.component';
import { removeAllChildNodes } from './util/functions/remove-children';

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
    state
      .filteredChanges([RESUME_UNLOCK_TEMPLATE_STATE])
      .pipe(take(1))
      .subscribe((result: Record<string, TemplateResult<1>[]>) => {
        console.log(result);
        let resume = elementById('resume-section'),
          renderBefore = elementById('contact-section'),
          content = elementById('content');
        resume.remove();
        render(Object.values(result), content, { renderBefore });
      });
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

        const headers = Array.from(
          document.querySelector('.content')?.querySelectorAll('h2[id], h3[id]')
        );

        while (headers.length) {
          let next = (headers.pop() as HTMLElement) || undefined;
          next.classList.add('resume-header');
          if (isElement(next) && next.id === 'resume') {
            next.id === 'resume';
            break;
          }
        }
      });
  });
