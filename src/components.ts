import { ContentTree } from './components/content/content.component';
import { TableOfContents } from './components/toc/toc.component';
import { NavComponent } from './components/navigation/nav.component';
import { FoliageHeader } from './components/header/header.component';
import { HicksCardContainer } from './components/card/card-container.component';
import { HicksCard } from './components/card/card.component';
import { PlotEngine } from './components/plot/plot.component';
import { BrandComponent } from './components/brand/brand.component';
import { LogoComponent } from './components/brand/logo/logo.component';
import { ResponsiveLogo } from './components/brand/logo/responsive-logo.component';
import { state } from './store';
import { HookPropertiesMixin } from './util/mixins/state.mixin';
import { mix } from './util/mixins/mix.with';
import { NavItemComponent } from './components/navigation/nav-item.component';
import { html, render } from 'lit';
import { IconComponent } from './icons/icon.component';
import { HicksIconButton } from './components/icon-button/icon-button';
import { DrawerComponent } from './components/drawer/drawer.component';
//Table of contents
const handler = {
  propertyChangeHandler: state.getStateFn(),
  observedProperties: ['activeLinkId'],
};
const toc = mix(TableOfContents).with(HookPropertiesMixin(handler));
customElements.define('hicks-toc', toc);

ContentTree;
TableOfContents;
NavItemComponent;
NavComponent;
TableOfContents;
FoliageHeader;
HicksCardContainer;
HicksCard;
PlotEngine;
LogoComponent;
BrandComponent;
ResponsiveLogo;
IconComponent;
HicksIconButton;
DrawerComponent;
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
