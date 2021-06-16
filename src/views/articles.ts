import { html } from 'lit';
let articles = html`<div class="layout__content">
    <content-component class="main__content"></content-component>
  </div>
  <div>
    <hicks-toc class="layout__table-of-contents" opened></hicks-toc>
  </div>
  <div class="layout__footer">
    <footer>Footer</footer>
  </div>`;
