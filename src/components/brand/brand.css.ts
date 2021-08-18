import { css } from 'lit';

 export const style = css`:host {
  --brand--width: clamp(360px, 40vw, 460px);
}

.brand-grid {
  width: var(--brand--width);
  height: calc(var(--brand--width) * 0.16);
}`;
