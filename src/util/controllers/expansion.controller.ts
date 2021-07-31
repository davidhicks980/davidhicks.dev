import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IntersectionController } from './intersection.controller';
import { HicksResumeEntry } from '../../components/resume/resume-entry.component';

const observers = new Map() as Map<string, IntersectionController>;

type IntersectionObserverRecord = {
  id: string;
  entries: IntersectionObserverEntry[];
};

export class ExpansionController extends IntersectionController {
  host: ReactiveControllerHost;
  elementsInViewport = [];

  hostConnected() {
    this.host.requestUpdate();
    this.initiate('expansion', null, [0, 1])
      .on('entry')
      .subscribe((entries: IntersectionObserverEntry[]) => {
        const notIntersecting = entries.map((entry) => !entry.isIntersecting);
        this.elementsInViewport = [
          ...entries.map((entry) => entry.isIntersecting),
          ...this.elementsInViewport.filter((el) =>
            notIntersecting.includes(el)
          ),
        ];
        this.elementsInViewport.sort((el: HicksResumeEntry) => el.index);
      });
  }
}
