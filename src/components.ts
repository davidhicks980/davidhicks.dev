import './onload';
import './state-fns';

import { ContentComponent } from './content.component';
import { TableOfContents } from './toc/toc';
import './typing-effect-element';
import { NavComponent, NavItemComponent } from './nav.component';
import { BackgroundAnimation } from './header.component';
import './onload';
import { state } from './store';
import { AddressComponent } from './test';
ContentComponent;
TableOfContents;
NavItemComponent;
NavComponent;
TableOfContents;
BackgroundAnimation;
AddressComponent;
/*
c
let plot = document.querySelector("plot-engine");
query(document, ".plots__radio-selector", HTMLFieldSetElement).addEventListener(
  "input",
  (e) => {
    plot["plotType"] = (
      query(
        document,
        "[name=active-plot]:checked",
        HTMLInputElement
      ) as HTMLInputElement
    ).value;
  }
);
*/
