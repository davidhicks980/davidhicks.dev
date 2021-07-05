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
import { IconComponent } from './icons/icon.component';
import { HicksIconButton } from './components/icon-button/icon-button';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ObserveStateMixin } from './util/mixins/observe-state.mixin';
import { Observable } from 'rxjs';
import { ObservedStateAction } from './util/mixins/observe-state.mixin';
import { ObservePropertiesMixin } from './util/mixins/observe-bp.mixin';
//Table of contents
const tocStateAdapter = {
  propertyChangeHandler: state.getStateEmitted(),
  observedProperties: ['activeLinkId'],
};
const tocBreakpointAdapter = [
  {
    query: '(max-width: 599.99px)',
    action: function (matches) {
      (this as TableOfContents).mobile = matches;
    },
  },
];
const toc = mix(TableOfContents).with(
  HookPropertiesMixin(tocStateAdapter),
  ObservePropertiesMixin(tocBreakpointAdapter)
);
customElements.define('hicks-toc', toc);

//Table of contents
const iconButtonHandler = {
  propertyChangeHandler: state.getStateEmitted(),
  observedProperties: ['toggled'],
};
const iconButton = mix(HicksIconButton).with(
  HookPropertiesMixin(iconButtonHandler)
);
customElements.define('hicks-icon-button', iconButton);

const drawerStateAdapter = {
  stream: state.filteredStream(['toggled']) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      prop: 'toggled',
      componentHandler(propValue) {
        (this as DrawerComponent).opened = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const drawerBreakpointAdapter = [
  {
    query: '(max-width: 599.99px)',
    action: function (matches) {
      (this as DrawerComponent).mobile = matches;
    },
  },
];
const drawer = mix(DrawerComponent).with(
  ObserveStateMixin(drawerStateAdapter),
  ObservePropertiesMixin(drawerBreakpointAdapter)
);
customElements.define('hicks-drawer', drawer);

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
