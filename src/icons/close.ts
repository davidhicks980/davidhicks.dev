import { html } from 'lit';
export const close = (primary: string, secondary: string) =>
    html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <style>
            .primary {
                fill: var(${primary});
            }
        </style>
        <title>Close</title>
        <path
            class="primary"
            d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
        />
    </svg>`;
