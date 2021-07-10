import { ReplaySubject } from 'rxjs';
import { QueryEntry } from '../../types/QueryEntry';
import { breakpoints } from './breakpoints';
export class BreakpointEmitter {
  private queries: QueryEntry[];
  private _queryEmitter: ReplaySubject<[string, boolean]> = new ReplaySubject(
    1
  );

  addQueries(queries: QueryEntry[]) {
    this.queries = [...this._dedupeQueries(this.queries, queries), ...queries];
  }
  removeQueries(queryNames: string[]) {
    this.queries.filter((query) => queryNames.includes(query.id));
  }

  get ids() {
    return this.queries.map((query) => query.id);
  }

  private _updateListeners() {
    this.queries.forEach(({ id, query }) => {
      const breakpoint = window.matchMedia(query);
      this._queryEmitter.next([id, breakpoint.matches]);
      breakpoint.addEventListener(
        'change',
        this._getQueryListener(id, this._queryEmitter)
      );
    });
  }
  private _dedupeQueries(newQueries: QueryEntry[], oldQueries: QueryEntry[]) {
    const newIds = newQueries.map((query) => query.id);

    return oldQueries.filter(({ id }) => {
      if (!newIds.includes(id)) {
        return true;
      } else {
        console.warn(
          `[BreakpointEmitter] ${id} collides with ${JSON.stringify(
            newIds
          )} and will be overwritten`
        );
      }
    });
  }
  constructor(queries: QueryEntry[]) {
    this.queries = queries;
    this._updateListeners();
  }
  get observer() {
    return this._queryEmitter.asObservable();
  }

  private _getQueryListener(
    id: string,
    emitter: ReplaySubject<[string, boolean]>
  ) {
    return function (this: MediaQueryList, ev: MediaQueryListEvent) {
      emitter.next([id, ev.matches]);
    };
  }
}

export const documentBreakpoints = new BreakpointEmitter(breakpoints);
