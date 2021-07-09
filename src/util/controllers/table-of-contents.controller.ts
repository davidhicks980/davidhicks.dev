import { ReactiveController } from 'lit';
import { BehaviorSubject, from, Subject, Subscription } from 'rxjs';
import { HicksItemComponent } from '../../components/toc/toc-item.component';
import { TableOfContents } from '../../components/toc/toc.component';

const expandedElements = new Subject() as BehaviorSubject<[string, number][]>;

export class ListItemController implements ReactiveController {
  host: HicksItemComponent | TableOfContents;
  /**
   * Compares the supplied path to the
   *
   * @param {string} testPath
   * @memberof ListItemController
   */
  testIfPathComesAfter = (testPath: string, referencePath: string) => {
    if (testPath && referencePath) {
      const rootEnd = testPath.lastIndexOf('.');
      const root = testPath.substr(0, rootEnd);
      if (root !== referencePath && referencePath.includes(root)) {
        const testArray = testPath.split('.').map(Number);
        const refArray = referencePath.split('.').map(Number);
        const sigDigit = testArray.length - 1;
        return refArray[sigDigit] < testArray[sigDigit];
      } else {
        return false;
      }
      /* let shorterArray, longerArray;
        if (testIsLonger) {
          shorterArray = refArray;
          longerArray = testArray;
        } else {
          shorterArray = testArray;
          longerArray = refArray;
        }
        const shortPathIsAhead = shorterArray.some(
          (numb, index) => numb > longerArray[index]
        );
        if (testIsLonger) {
          //If the test element is longer, having the short path ahead means that the test element is not ahead
          return shortPathIsAhead === false;
        } else {
          //If the test element is not longer, having the short path ahead means that the test element is ahead
          return shortPathIsAhead === true;
        }*/
    } else {
      return false;
    }
  };

  path: string;

  getRelativePathLocation: (referencePath: string) => boolean;
  subscriptions: Subscription[];

  setPath(path: string) {
    this.path = path;
    this.observeOffset.bind(this);
  }
  constructor(host: HicksItemComponent | TableOfContents) {
    (this.host = host).addController(this);
  }

  updateItems(update: [string, number][]) {
    expandedElements.next(update);
  }
  observeOffset(
    this: ListItemController,
    parentPath: string,
    updateOffset: (offset: number) => unknown
  ) {
    expandedElements.asObservable().subscribe((paths) => {
      const prev = paths
        .filter(([path, count]) => this.testIfPathComesAfter(parentPath, path))
        .reduce((a, [path, count]) => a + count, 0);
      updateOffset(prev);
    });
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.subscriptions.forEach((obs) => obs.unsubscribe());
  }
}
