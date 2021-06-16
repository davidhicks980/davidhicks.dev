import './onload';
import './state-fns';

import { ContentComponent } from './content.component';
import { TableOfContents } from './toc/toc';
import './typing-effect-element';
import { NavComponent, NavItemComponent } from './nav.component';
import { BackgroundAnimation } from './header.component';
import './onload';
import { AddressComponent } from './test';
import { HicksCardContainer } from './components/card/card-container.component';
import { HicksCard } from './components/card/card.component';
import { PlotEngine } from './plot/plot.component';
import { BrandComponent } from './components/card/brand.component';
ContentComponent;
TableOfContents;
NavItemComponent;
NavComponent;
TableOfContents;
BackgroundAnimation;
AddressComponent;
HicksCardContainer;
HicksCard;
PlotEngine;
BrandComponent;
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
