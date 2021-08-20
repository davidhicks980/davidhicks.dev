import { svg } from 'lit';

import { svgPaths } from './social-logos';

const _icons = {
  google_logo: svgPaths.google,
  github_logo: svgPaths.github,
  linkedin_logo: svgPaths.linkedIn,
};
export const iconFactory = (name: string, viewbox: string) => {
  const template = (
    paths: { path: string; class?: string }[],
    title,
    viewbox
  ) => svg`<svg xmlns="http://www.w3.org/2000/svg" class="factoy__icon" preserveAspectRatio="none" viewBox="${viewbox}">
<filter></filter>
<title>${title}</title>
    ${paths.map((p) => svg`<path d="${p.path}" class="${p.class}">`)}
</svg>`;

  const keys = Object.keys(_icons);

  if (keys.includes(name)) {
    return template(_icons[name], name.replaceAll('_', ' '), viewbox);
  } else {
    throw new Error('[icons] Provided icon name  is not defined');
  }
};
