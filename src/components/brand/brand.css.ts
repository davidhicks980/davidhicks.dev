import { css } from 'lit';

 export const style = css`:host {
  --grid-width: clamp(360px, 40vw, 460px);
  --subtitle-font: "DM Mono", monospace;
  --brand--font-color: #232b33;
  --brand--logo-color: navy;
}

.brand-grid {
  width: var(--grid-width);
  height: calc(var(--grid-width) * 0.16);
}`;
