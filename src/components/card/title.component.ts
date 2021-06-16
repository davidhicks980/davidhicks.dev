import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('title-component')
export class TitleComponent extends LitElement {
  @property({ type: Boolean })
  hidden: boolean = true;
  @property()
  color: string = 'black';
  render(): TemplateResult {
    //  const colorStyle = styleMap({ color: this.color });
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 558.4 78.4"
    >
      <defs>
        <symbol id="i" data-name="i" viewBox="0 0 15.3 77">
          <path d="M14.1 77h-13V21h7a6 6 0 016 6z" />
          <circle cx="7.7" cy="7.7" r="7.7" />
        </symbol>
      </defs>
      <g>
        <g>
          <path
            d="M0 77.3V1.5h28q15.4 0 24.8 11t9.4 27q0 16.1-9.7 27T25 77.3zM14 66h11.4A20.4 20.4 0 0041 59.2q6.4-6.9 6.4-20.5 0-11.1-5.6-18.8A17.4 17.4 0 0027 12.2H14zM122.1 77.3h-12a45.8 45.8 0 01-2-11.4q-5 12.5-19 12.5-8.4 0-13.4-4.9a16.5 16.5 0 01-5.1-12.3q0-19.4 33.9-19.4h3.6v-4.1q0-8.8-11.9-8.8-11.5 0-13 8.8L72.2 36a16.4 16.4 0 017.3-11.5Q85.9 20 97.9 20a42.3 42.3 0 0110.6 1 16.2 16.2 0 017 3.8 14 14 0 013.9 5.6q1 3 1 10.2v25.3a41.1 41.1 0 001.7 11.3zm-14-28.6q-24.5 0-24.5 11.7a8.1 8.1 0 002.4 6q2.5 2.5 7.5 2.5 7.2 0 11-4.6A16.2 16.2 0 00108 54zM176.4 21.2l-19 56H147l-19.5-56h13.2l13.1 38 12.8-38z"
          />
          <path
            d="M197.3 14.6h-12.6V1.5h12.7zm0 62.7h-12.6V21.1h12.7z"
            class="logo-transparent"
          />
          <path
            d="M258.6 77.3h-11.8V65.8q-4.9 12.5-16.5 12.5a17.7 17.7 0 01-15.9-8.6q-5.4-8.6-5.4-21.4a37.3 37.3 0 015.7-20.7A18.3 18.3 0 01231 19q10.8 0 15 9.9V1.5h12.7zM246 44.1q0-6.9-3.3-10.7a10.6 10.6 0 00-8.4-3.8 10 10 0 00-8.7 5q-3.2 4.8-3.2 14.5 0 18.8 11.8 18.8a10.8 10.8 0 008.2-4 14.9 14.9 0 003.6-10.4zM359.2 77.3h-13.6v-33h-29v33H303V1.5h13.7v31.1h28.9V1.5h13.7z"
          />
          <path
            d="M387.8 14.6H375V1.5h12.7zm0 62.7H375V21.1h12.7z"
            class="logo-transparent"
          />
          <path
            d="M435.3 56.6l11 1.2Q444 68.3 438 73.4a22 22 0 01-14.6 5q-11.7 0-17.9-8.5t-6.2-20.7q0-12.7 6.8-21t18.2-8.2q18.3 0 21.8 19.3l-10.9 1.5q-1.4-10.4-10.2-10.4a9.8 9.8 0 00-9.4 5.6 29.5 29.5 0 00-2.9 13.6q0 8.5 3 13.1a9.6 9.6 0 008.5 4.6q8.3 0 11-10.6zM508.7 77.3h-13.3L481 48.5l-12.4 14v14.8h-12.1V1.5h12.1v47c1-1.5 2-2.5 2.6-3.2L493.4 21H507l-17 18.6zM510.2 64.4l11.9-2.3q2.7 6.8 12 6.8 11.8 0 11.8-7a4.5 4.5 0 00-1.9-3.6 10.2 10.2 0 00-4.3-2l-10.3-2q-17-3.2-17-16.5a16.9 16.9 0 015.4-12.6q5.4-5.3 16-5.3 17.8 0 21.7 13l-11.2 2.3q-1.7-6.2-10-6.2-10.2 0-10.2 6.3 0 4.4 8.2 6l12 2.6q14 2.9 14 16 0 9.4-7.2 14a31.4 31.4 0 01-17.1 4.5 32.3 32.3 0 01-15.2-3.4 16.6 16.6 0 01-8.6-10.6z"
          />
          <use
            width="15.3"
            height="77"
            transform="translate(183.4 .1)"
            xlink:href="#i"
          />
          <use
            width="15.3"
            height="77"
            transform="translate(373.7)"
            xlink:href="#i"
          />
        </g>
      </g>
    </svg>`;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        .logo-transparent {
          fill: none;
        }
      `,
    ];
  }
}
