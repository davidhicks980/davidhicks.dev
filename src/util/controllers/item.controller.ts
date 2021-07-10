import { ReactiveController } from 'lit';
import { HicksListItem } from '../../components/toc/toc-item.component';

export class ListItemController implements ReactiveController {
  host: HicksListItem;
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

  constructor(host: HicksListItem) {
    (this.host = host).addController(this);
  }

  makeUpdate(item: string, update: string) {}

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {}
}
