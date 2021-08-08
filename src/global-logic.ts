import { state } from './util/primitives/store';
import { TOCProperties } from './components/toc/TableOfContentsProperties.enum';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

fromEvent(window, 'load')
  .pipe(take(1))
  .subscribe((ev) => {
    state
      .filteredStream([TOCProperties.OPEN])
      .subscribe(({ open }: Record<string, boolean>) => {
        if (open != undefined) {
          document
            .getElementById('app')
            .classList.toggle('has-open-menu', open);
        }
      });

    document
      .getElementById('show-hide-details')
      .addEventListener('click', function (this: HTMLElement, ev: MouseEvent) {
        let isChecked = this.getAttribute('aria-checked') === 'true';
        this.setAttribute('aria-checked', isChecked ? 'false' : 'true');
        this.toggleAttribute('data-toggled', !isChecked);
        state.update({ 'show-resume-entries': isChecked });
        this.innerText = isChecked ? 'Hide Details' : 'Show Details';

        let tags;
        tags.forEach((el) => el.toggleAttribute('data-collapsed', isChecked));
        console.log(tags);
      });
  });
