/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**Stole this from Google */
export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const focusableEls = [].slice.call(
    root.querySelectorAll(
      '[autofocus], [tabindex], a, input, textarea, select, button'
    )
  ) as HTMLElement[];
  return focusableEls.filter((el) => {
    const isDisabledOrHidden =
      el.getAttribute('aria-disabled') === 'true' ||
      el.getAttribute('disabled') != null ||
      el.getAttribute('hidden') != null ||
      el.getAttribute('aria-hidden') === 'true';
    const isTabbableAndVisible =
      el.tabIndex >= 0 &&
      el.getBoundingClientRect().width > 0 &&
      !isDisabledOrHidden;

    let isProgrammaticallyHidden = false;
    if (isTabbableAndVisible) {
      const style = getComputedStyle(el);
      isProgrammaticallyHidden =
        style.display === 'none' || style.visibility === 'hidden';
    }
    return isTabbableAndVisible && !isProgrammaticallyHidden;
  });
}
