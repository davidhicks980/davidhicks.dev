import { interval, timer } from 'rxjs';
import { filter, take, takeWhile } from 'rxjs/operators';

const scrollbarVisible = (element) => {
  return element.scrollHeight > element.clientHeight;
};
export const awaitVisibleScrollbar = (element) => {
  return new Promise((resolve) => {
    interval(100)
      .pipe(
        take(20),
        filter(() => scrollbarVisible(element))
      )
      .subscribe(() => {
        resolve(true);
      });
  });
};
