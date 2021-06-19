import { ContentComponent } from './content.component';
import { TableOfContents } from './toc/toc';
import { NavComponent, NavItemComponent } from './nav.component';
import { BackgroundAnimation } from './header.component';
import { HicksCardContainer } from './components/card/card-container.component';
import { HicksCard } from './components/card/card.component';
import { PlotEngine } from './plot/plot.component';
import { BrandComponent } from './components/card/brand.component';
import { LogoComponent } from './components/card/logo.component';
ContentComponent;
TableOfContents;
NavItemComponent;
NavComponent;
TableOfContents;
BackgroundAnimation;
HicksCardContainer;
HicksCard;
PlotEngine;
LogoComponent;
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
