import { LitElement, css, CSSResultGroup, TemplateResult, svg } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('title-component')
export class TitleComponent extends LitElement {
  render(): TemplateResult {
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" class="title-icon" alt="David Hicks, pharmacist and developer" viewBox="0 0 326.58 80.49">
    
  <defs>
        <filter id="shadow">
          <feDropShadow flood-opacity="0.5"  dx="0.4" stdDeviation="1.3"/>
        </filter>      
  </defs>
      <g id="subtitle">
        <path d="M62.54 60.81H65v2h.12a3.2 3.2 0 011.28-1.66 3.68 3.68 0 012.08-.59A4.18 4.18 0 0172 62.17a7.6 7.6 0 011.24 4.62A7.59 7.59 0 0172 71.4a4.18 4.18 0 01-3.48 1.6 3.61 3.61 0 01-2.08-.6 3.25 3.25 0 01-1.28-1.65H65v6.58h-2.5zm5.22 10.07a2.72 2.72 0 002.09-.88 3.13 3.13 0 00.78-2.22v-2.03a3.13 3.13 0 00-.78-2.22 2.72 2.72 0 00-2.09-.84 3.18 3.18 0 00-1.93.57 1.72 1.72 0 00-.83 1.48v4.09a1.74 1.74 0 00.79 1.49 3.24 3.24 0 001.97.56zM76.08 55.75h2.51v7h.12a4 4 0 011.18-1.61 3.34 3.34 0 012.17-.64 3.56 3.56 0 012.87 1.21 5.17 5.17 0 011 3.44v7.59h-2.49v-7.3c0-1.85-.75-2.78-2.25-2.78a3.52 3.52 0 00-1 .13 2.52 2.52 0 00-.83.38 1.81 1.81 0 00-.59.64 1.77 1.77 0 00-.22.9v8h-2.47zM98.12 72.77a2 2 0 01-1.52-.57 2.46 2.46 0 01-.6-1.44h-.12a3 3 0 01-1.26 1.71 4.19 4.19 0 01-2.24.57 4 4 0 01-2.86-1 3.44 3.44 0 01-1-2.6 3 3 0 011.3-2.69 6.68 6.68 0 013.81-.9h2.16v-1a2.27 2.27 0 00-.6-1.7 2.54 2.54 0 00-1.86-.6 3 3 0 00-1.73.46 3.92 3.92 0 00-1.12 1.17l-1.5-1.36a4.77 4.77 0 011.68-1.66 5.36 5.36 0 012.83-.66A5.24 5.24 0 0197 61.61a3.9 3.9 0 011.24 3.11v6h1.27v2zm-5.06-1.64a3.4 3.4 0 001.94-.51 1.61 1.61 0 00.76-1.4V67.5h-2.13c-1.73 0-2.6.54-2.6 1.61v.41a1.41 1.41 0 00.54 1.21 2.44 2.44 0 001.49.4zM101.91 72.77v-12h2.51v2.3h.11a3.26 3.26 0 011.06-1.61 3.32 3.32 0 012.23-.69h.67v2.41h-1a4.46 4.46 0 00-2.29.48 1.58 1.58 0 00-.79 1.43v7.64zM110.65 72.77v-12h2.51v2h.11a7.16 7.16 0 01.45-.87 2.8 2.8 0 01.65-.72 2.84 2.84 0 01.89-.49 4 4 0 011.21-.17 3.94 3.94 0 012.16.6A3.42 3.42 0 01120 63h.07a3.56 3.56 0 011.24-1.73 3.82 3.82 0 012.37-.71 3.39 3.39 0 012.79 1.21 5.34 5.34 0 011 3.44v7.59H125v-7.3a3.45 3.45 0 00-.53-2.08 2 2 0 00-1.68-.7 3.1 3.1 0 00-.92.13 2.22 2.22 0 00-.77.38 2 2 0 00-.54.64 1.87 1.87 0 00-.21.9v8h-2.55v-7.3c0-1.85-.72-2.78-2.18-2.78a3.13 3.13 0 00-.91.13 2.32 2.32 0 00-.79.38 1.79 1.79 0 00-.55.64 1.87 1.87 0 00-.21.9v8zM139.63 72.77a2 2 0 01-1.52-.57 2.52 2.52 0 01-.64-1.44h-.12a3 3 0 01-1.26 1.71 4.15 4.15 0 01-2.23.57 4 4 0 01-2.86-1 3.45 3.45 0 01-1-2.6 3.05 3.05 0 011.3-2.69 6.7 6.7 0 013.81-.9h2.16v-1a2.27 2.27 0 00-.6-1.7 2.5 2.5 0 00-1.86-.6 2.94 2.94 0 00-1.72.46 4 4 0 00-1.09 1.2l-1.5-1.36a4.77 4.77 0 011.68-1.66 5.39 5.39 0 012.83-.66 5.29 5.29 0 013.57 1.08 3.9 3.9 0 011.24 3.11v6H141v2zm-5.06-1.64a3.38 3.38 0 001.93-.51 1.61 1.61 0 00.76-1.4V67.5h-2.11c-1.74 0-2.6.54-2.6 1.61v.41a1.41 1.41 0 00.54 1.21 2.41 2.41 0 001.48.4zM148.05 73a5.59 5.59 0 01-2.3-.44 4.43 4.43 0 01-1.7-1.25 5.52 5.52 0 01-1.06-2 9.22 9.22 0 010-5.17 5.52 5.52 0 011.06-2 4.54 4.54 0 011.7-1.25 5.75 5.75 0 012.3-.44 5 5 0 012.94.8 4.62 4.62 0 011.68 2.14l-2.07 1a2.6 2.6 0 00-.88-1.32 2.64 2.64 0 00-1.67-.5 2.54 2.54 0 00-2.08.86 3.43 3.43 0 00-.7 2.24v2.13a3.41 3.41 0 00.7 2.24 2.54 2.54 0 002.08.86 2.68 2.68 0 001.76-.54 3.84 3.84 0 001.05-1.36l1.9 1a4.7 4.7 0 01-1.76 2.25 5.16 5.16 0 01-2.95.75zM156.35 58.67a1.56 1.56 0 01-1.14-.37 1.33 1.33 0 01-.35-.94V57a1.34 1.34 0 01.35-.95 1.56 1.56 0 011.14-.37 1.52 1.52 0 011.13.37 1.33 1.33 0 01.34.95v.39a1.33 1.33 0 01-.34.94 1.52 1.52 0 01-1.13.34zm-1.26 2.14h2.5v12h-2.5zM164.91 73a5.76 5.76 0 01-4.85-2.25l1.61-1.47a5.11 5.11 0 001.48 1.25 3.87 3.87 0 001.9.45 2.59 2.59 0 001.64-.43 1.42 1.42 0 00.54-1.18 1.38 1.38 0 00-.38-1 2.14 2.14 0 00-1.32-.52l-1.1-.14a5.63 5.63 0 01-2.89-1.06 3 3 0 01-1-2.5 3.64 3.64 0 01.32-1.55 3.3 3.3 0 01.91-1.15 4.1 4.1 0 011.41-.73 6 6 0 011.8-.25 5.89 5.89 0 012.63.51 5.74 5.74 0 011.83 1.4l-1.54 1.47a3.86 3.86 0 00-1.2-.95 3.56 3.56 0 00-1.72-.41 2.33 2.33 0 00-1.53.42 1.32 1.32 0 00-.49 1.08 1.23 1.23 0 00.43 1 3.21 3.21 0 001.41.51l1.1.14a5.28 5.28 0 012.89 1.16 3.06 3.06 0 01.91 2.31 3.55 3.55 0 01-.34 1.58 3.44 3.44 0 01-.95 1.2 4.55 4.55 0 01-1.5.79 6.57 6.57 0 01-2 .32zM175.56 72.77a2.65 2.65 0 01-2-.68 2.61 2.61 0 01-.67-1.92v-7.32h-1.86v-2h1a1.11 1.11 0 00.86-.28 1.34 1.34 0 00.25-.9v-2.13h2.25v3.27h2.51v2h-2.51v7.87h2.32v2zM195.38 71.13c-.2.2-.44.41-.72.64a7 7 0 01-1 .62 6.29 6.29 0 01-1.29.47 6.8 6.8 0 01-1.64.18 6.54 6.54 0 01-2.21-.34 4.78 4.78 0 01-1.62-1 3.77 3.77 0 01-1-1.41 4.63 4.63 0 01-.33-1.76 4.09 4.09 0 01.26-1.53 4.49 4.49 0 01.71-1.22 5.59 5.59 0 011-1 12.12 12.12 0 011.25-.8 9.19 9.19 0 01-1.29-1.75 4.06 4.06 0 01-.53-2 3.73 3.73 0 01.32-1.52 3.57 3.57 0 01.88-1.23 4.14 4.14 0 011.39-.81 5.25 5.25 0 011.81-.3 5.46 5.46 0 011.7.25 4.5 4.5 0 011.36.71 3.2 3.2 0 01.88 1.12 3.29 3.29 0 01.31 1.46 3.55 3.55 0 01-.27 1.41 4.18 4.18 0 01-.76 1.15 7.1 7.1 0 01-1.12 1c-.42.3-.87.58-1.34.86l3.12 3.38a9.73 9.73 0 00.51-1.74 12.47 12.47 0 00.23-1.85h3.43v2.1h-1.57a11.2 11.2 0 01-1.06 3.1l3.21 3.45h-3.13zM191 70.9a4.13 4.13 0 001.7-.32 3.85 3.85 0 001.29-.9l-3.91-4.21a5.48 5.48 0 00-1.42 1.09 2.32 2.32 0 00-.54 1.63v.3a2.21 2.21 0 00.76 1.76 3.18 3.18 0 002.12.65zm.39-12.46a2.11 2.11 0 00-1.41.49 1.63 1.63 0 00-.57 1.3v.18a2.26 2.26 0 00.38 1.2 10.41 10.41 0 001.13 1.39 8.18 8.18 0 001.66-1.18 2 2 0 00.69-1.51v-.18a1.57 1.57 0 00-.51-1.25 2 2 0 00-1.33-.44zM215 70.79h-.11a3.31 3.31 0 01-1.28 1.65 3.61 3.61 0 01-2.08.6A4.17 4.17 0 01208 71.4a7.52 7.52 0 01-1.24-4.61 7.53 7.53 0 011.24-4.62 4.17 4.17 0 013.52-1.64 3.68 3.68 0 012.08.59 3.25 3.25 0 011.28 1.66h.12v-7h2.51v17H215zm-2.71.09a3.26 3.26 0 001.93-.56 1.76 1.76 0 00.78-1.49v-4.09a1.74 1.74 0 00-.78-1.48 3.2 3.2 0 00-1.93-.57 2.74 2.74 0 00-2.1.84 3.13 3.13 0 00-.78 2.22v2.07a3.13 3.13 0 00.78 2.22 2.74 2.74 0 002.1.84zM225.72 73a5.59 5.59 0 01-2.3-.44 4.69 4.69 0 01-1.73-1.25 5.57 5.57 0 01-1.09-2 9 9 0 010-5.17 5.57 5.57 0 011.09-2 4.81 4.81 0 011.73-1.14 5.75 5.75 0 012.3-.44A5.44 5.44 0 01228 61a4.61 4.61 0 011.67 1.28 5.52 5.52 0 011 1.89 8 8 0 01.33 2.33v.94h-8.21v.39a3.17 3.17 0 00.82 2.25A3 3 0 00226 71a3.44 3.44 0 001.87-.48 4.29 4.29 0 001.28-1.3l1.48 1.45a4.68 4.68 0 01-1.94 1.76 6.25 6.25 0 01-2.97.57zm0-10.55a2.86 2.86 0 00-1.18.23 2.5 2.5 0 00-.92.64 2.72 2.72 0 00-.59 1 3.62 3.62 0 00-.21 1.26v.16h5.57v-.23a3.34 3.34 0 00-.71-2.22 2.44 2.44 0 00-1.96-.8zM236.14 72.77l-4.07-12h2.48l1.82 5.45 1.22 4.18h.14l1.21-4.18 1.87-5.45h2.39l-4.12 12zM249.76 73a5.67 5.67 0 01-2.31-.44 4.74 4.74 0 01-1.72-1.25 5.42 5.42 0 01-1.09-2 9 9 0 010-5.17 5.42 5.42 0 011.09-2 4.86 4.86 0 011.72-1.14 5.84 5.84 0 012.31-.44 5.44 5.44 0 012.31.46 4.58 4.58 0 011.66 1.28 5.35 5.35 0 011 1.89 7.63 7.63 0 01.34 2.33v.94h-8.21v.39a3.2 3.2 0 00.81 2.25 3 3 0 002.33.9 3.43 3.43 0 001.86-.48 4.21 4.21 0 001.29-1.3l1.47 1.45a4.65 4.65 0 01-1.93 1.76 6.28 6.28 0 01-2.93.57zm0-10.55a2.9 2.9 0 00-1.19.23 2.5 2.5 0 00-.92.64 2.87 2.87 0 00-.59 1 3.87 3.87 0 00-.2 1.26v.16h5.56v-.23a3.29 3.29 0 00-.71-2.22 2.43 2.43 0 00-1.95-.8zM260.33 72.77a2.57 2.57 0 01-1.92-.66 2.54 2.54 0 01-.63-1.83V55.75h2.51v15h1.65v2zM269 73a5.61 5.61 0 01-2.27-.44 4.61 4.61 0 01-1.73-1.21 5.61 5.61 0 01-1.11-2 8.76 8.76 0 010-5.17 5.61 5.61 0 011.11-2 4.72 4.72 0 011.69-1.18 5.78 5.78 0 012.27-.44 5.69 5.69 0 012.26.44 4.68 4.68 0 011.78 1.22 5.59 5.59 0 011.1 2 8.55 8.55 0 010 5.17 5.59 5.59 0 01-1.1 2 4.57 4.57 0 01-1.74 1.25A5.52 5.52 0 01269 73zm0-2a2.77 2.77 0 002.07-.79 3.25 3.25 0 00.78-2.37v-2a3.25 3.25 0 00-.78-2.37 3.11 3.11 0 00-4.14 0 3.25 3.25 0 00-.78 2.37v2a3.25 3.25 0 00.78 2.37A2.77 2.77 0 00269 71zM277.17 60.81h2.51v2h.11a3.25 3.25 0 011.28-1.66 3.68 3.68 0 012.08-.59 4.17 4.17 0 013.52 1.64 7.53 7.53 0 011.24 4.62 7.52 7.52 0 01-1.24 4.61 4.17 4.17 0 01-3.52 1.57 3.61 3.61 0 01-2.08-.6 3.31 3.31 0 01-1.28-1.65h-.11v6.58h-2.51zm5.22 10.07a2.72 2.72 0 002.09-.84 3.14 3.14 0 00.79-2.22v-2.07a3.14 3.14 0 00-.79-2.22 2.72 2.72 0 00-2.09-.84 3.18 3.18 0 00-1.93.57 1.74 1.74 0 00-.78 1.48v4.09a1.76 1.76 0 00.78 1.49 3.24 3.24 0 001.93.56zM295.41 73a5.59 5.59 0 01-2.3-.44 4.69 4.69 0 01-1.73-1.25 5.57 5.57 0 01-1.09-2 9 9 0 010-5.17 5.57 5.57 0 011.09-2 4.81 4.81 0 011.73-1.14 5.75 5.75 0 012.3-.44 5.44 5.44 0 012.31.46 4.61 4.61 0 011.67 1.28 5.52 5.52 0 011 1.89 8 8 0 01.33 2.33v.94h-8.21v.39a3.17 3.17 0 00.82 2.25 3 3 0 002.33.88 3.38 3.38 0 001.86-.48 4.21 4.21 0 001.29-1.3l1.48 1.45a4.68 4.68 0 01-1.94 1.76 6.25 6.25 0 01-2.94.59zm0-10.55a2.9 2.9 0 00-1.19.23 2.59 2.59 0 00-.92.64 2.85 2.85 0 00-.58 1 3.62 3.62 0 00-.21 1.26v.16h5.57v-.23a3.29 3.29 0 00-.72-2.22 2.4 2.4 0 00-1.95-.8zM303.44 72.77v-12h2.5v2.3h.12a3.19 3.19 0 011.06-1.61 3.31 3.31 0 012.23-.69h.65v2.41h-1a4.42 4.42 0 00-2.28.48 1.58 1.58 0 00-.8 1.43v7.64z" class="fill-green"/>
      </g>
      <g id="title">
      <path d="M0 3.06h15.78a20.84 20.84 0 017.56 1.32 15.24 15.24 0 015.82 3.93 18 18 0 013.72 6.54A28.75 28.75 0 0134.2 24a28.75 28.75 0 01-1.32 9.15 18 18 0 01-3.72 6.54 15.24 15.24 0 01-5.82 3.93 20.84 20.84 0 01-7.56 1.32H0zm15.78 33.78a8.81 8.81 0 006.42-2.28q2.34-2.28 2.34-7.32v-6.48q0-5-2.34-7.32a8.81 8.81 0 00-6.42-2.28H9.12v25.68zM64.8 44.94a5.59 5.59 0 01-4-1.5 6.9 6.9 0 01-2-4h-.36a7.28 7.28 0 01-3.18 4.65 10.94 10.94 0 01-6.06 1.59q-4.74 0-7.26-2.51a9 9 0 01-2.52-6.64 8.28 8.28 0 013.63-7.39q3.63-2.41 9.87-2.42h5v-2a5.26 5.26 0 00-1.2-3.63q-1.2-1.35-4-1.35a7 7 0 00-4.2 1.14 11.27 11.27 0 00-2.58 2.58l-5.28-4.71a13.83 13.83 0 014.83-4.43 16.4 16.4 0 017.89-1.6q6.72 0 10.08 2.94t3.36 8.58V38h2.94v6.9zm-12.3-5.46a7.33 7.33 0 003.81-.95 3.34 3.34 0 001.59-3.1v-3.69h-4.32q-5.22 0-5.22 3.51v.9a3 3 0 001.08 2.53 5.09 5.09 0 003.06.8zM82 44.94l-10.36-31.5h8.76l3.9 12.72 2.94 11.4h.48l2.94-11.4 3.78-12.72h8.4l-10.32 31.5zM112.14 10.08a5.38 5.38 0 01-3.93-1.23A4.27 4.27 0 01107 5.7V4.38a4.27 4.27 0 011.23-3.15 6.89 6.89 0 017.86 0 4.27 4.27 0 011.23 3.15V5.7a4.27 4.27 0 01-1.23 3.15 5.38 5.38 0 01-3.95 1.23zm-4.44 3.36h8.88v31.5h-8.88zM144.36 39.66h-.3a7.85 7.85 0 01-1.14 2.34 8.2 8.2 0 01-1.92 2 8.75 8.75 0 01-2.52 1.26 9.51 9.51 0 01-2.91.45q-6 0-9.06-4.23t-3.06-12.27q0-8 3.06-12.24t9.06-4.2A9.15 9.15 0 01141 14.4a7.38 7.38 0 013 4.32h.3V.54h8.88v44.4h-8.88zm-5.82-1.2a6.79 6.79 0 004.17-1.23 4 4 0 001.65-3.39v-9.3a4 4 0 00-1.65-3.39 6.79 6.79 0 00-4.17-1.23 5.46 5.46 0 00-4.17 1.77 6.72 6.72 0 00-1.65 4.77v5.46a6.72 6.72 0 001.65 4.77 5.46 5.46 0 004.17 1.77zM201.6 27.78h-16v17.16h-9.12V3.06h9.12v16.62h16V3.06h9.12v41.88h-9.12zM224.1 10.08a5.38 5.38 0 01-3.93-1.23 4.27 4.27 0 01-1.23-3.15V4.38a4.27 4.27 0 011.23-3.15 6.89 6.89 0 017.86 0 4.27 4.27 0 011.23 3.15V5.7A4.27 4.27 0 01228 8.85a5.38 5.38 0 01-3.9 1.23zm-4.44 3.36h8.88v31.5h-8.88zM249.72 45.66a16 16 0 01-6.3-1.17 12.52 12.52 0 01-4.62-3.3A14.27 14.27 0 01236 36a22.79 22.79 0 01-1-6.84 22.5 22.5 0 011-6.81 14.6 14.6 0 012.82-5.19 12.08 12.08 0 014.62-3.3 16.38 16.38 0 016.3-1.14 14 14 0 018 2.16 11.83 11.83 0 014.59 6.06l-7.2 3.12a6 6 0 00-1.75-3.06 5.08 5.08 0 00-3.66-1.26 4.86 4.86 0 00-4.08 1.77 7.56 7.56 0 00-1.38 4.77v5.88a7.43 7.43 0 001.38 4.74 4.89 4.89 0 004.08 1.74 5.43 5.43 0 003.81-1.29A7.55 7.55 0 00255.6 34l6.9 3a12.27 12.27 0 01-4.83 6.6 14.41 14.41 0 01-7.95 2.06zM268.2.54h8.88v26.22h.36l3.9-5.82 6.3-7.5h9.84L287 25.5l11.7 19.44h-10.58L281 31.62l-4 4.44v8.88h-8.8zM313.08 45.66a18 18 0 01-7.68-1.47 17.75 17.75 0 01-5.58-4.19l5.18-5.26a13.56 13.56 0 003.72 2.94 9.72 9.72 0 004.62 1.08A6.09 6.09 0 00317 38a2.65 2.65 0 001-2.19q0-2.22-3.18-2.64l-3.42-.42q-10.56-1.37-10.56-9.75a9.85 9.85 0 01.87-4.17 9.31 9.31 0 012.46-3.24 11.45 11.45 0 013.84-2.1 16 16 0 015.07-.75 25.52 25.52 0 014.35.33 15.14 15.14 0 013.36 1 12.85 12.85 0 012.7 1.56 28.43 28.43 0 012.43 2.07l-5.1 5.22a11.66 11.66 0 00-3.39-2.37 9.16 9.16 0 00-3.87-.87 5.54 5.54 0 00-3.24.72 2.28 2.28 0 00-1 1.92 2.64 2.64 0 00.69 1.95 4.78 4.78 0 002.61 1l3.54.48q10.38 1.38 10.38 9.48a9.39 9.39 0 01-1 4.2 9.88 9.88 0 01-2.73 3.33 13 13 0 01-4.26 2.19 18.52 18.52 0 01-5.47.71z" class="fill-white"
      />
      </g>
      <g id="logo-container">
        <g id="pill-logo">
          <path id="pill" d="M32.89 53.23a6.13 6.13 0 00-8.28 2.62l-8.18 15.63A6.14 6.14 0 0019 79.79a6.09 6.09 0 004.66.4 6.31 6.31 0 003.61-3l4.07-7.76 4.1-7.86a6.14 6.14 0 00-2.52-8.31zm-6.71 22.69a4.93 4.93 0 01-2 2.16 5.55 5.55 0 01-4.4.34A4.85 4.85 0 0118 71.83l3.63-7a17.62 17.62 0 004.18 3 17 17 0 003.84 1.42zM27.62 56a10.22 10.22 0 00-.59.87c-1.11 2-2.65 4.87-3 5.62a1.9 1.9 0 01-.71-.61l2.79-5.51A6.39 6.39 0 0128 54.43a6 6 0 011-.53l.55-.16.49.41A6.18 6.18 0 0027.61 56z" class="fill-green"/>
          <path id="right" d="M48.63 65.08v1.8L38.55 72.4a.34.34 0 01-.07-.22v-1.44a.19.19 0 01.09-.15l8.13-4.45a.17.17 0 00.07-.24.23.23 0 00-.07-.07l-8.13-4.39a.2.2 0 01-.09-.16v-1.4a.18.18 0 01.18-.17h.08z" class="fill-green stroke"/>
          <path id="left" d="M3.23 65.08v1.8l10.09 5.52a.4.4 0 00.06-.22v-1.44a.16.16 0 00-.09-.15l-8.13-4.45a.18.18 0 01-.06-.24s0-.05.06-.07l8.14-4.39a.17.17 0 00.09-.16v-1.4a.18.18 0 00-.17-.17h-.07z" class="fill-green stroke"/>
        </g>
      </g>
      <path fill="none" class="stroke" d="M21.62 64.87l-3.63 7a4.86 4.86 0 001.76 6.6 5.55 5.55 0 004.4-.34 4.93 4.93 0 002-2.16l3.46-6.63a17.55 17.55 0 01-3.84-1.42 17.9 17.9 0 01-4.15-3.05z"/>
</svg>`;
  }
  static get styles(): CSSResultGroup[] {
    return [
      css`
        .title-icon {
          --title-width: clamp(300px, 40vw, 400px);
          display: block;
          width: var(--title-width, 350px);
          height: 100px;
          min-height: 100px;
        }
        .fill-green {
          fill: var(--secondary-4, seagreen);
        }
        .fill-white {
          fill: #fff;
          filter: url(#shadow);
        }
        .stroke {
          stroke: var(--secondary-4, seagreen);
          stroke-miterlimit: 10;
          stroke-width: 0.75px;
        }
      `,
    ];
  }
}
