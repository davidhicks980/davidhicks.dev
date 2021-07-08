import { ContentTree } from './components/content/content.component';
import { TableOfContents } from './components/toc/toc.component';
import { NavComponent } from './components/navigation/nav.component';
import { HicksHeader } from './components/header/header.component';
import { HicksCardContainer } from './components/card/card-container.component';
import { HicksCard } from './components/card/card.component';
import { PlotEngine } from './components/plot/plot.component';
import { BrandComponent } from './components/brand/brand.component';
import { LogoComponent } from './components/brand/logo/logo.component';
import { ResponsiveLogo } from './components/brand/logo/responsive-logo.component';
import { state } from './store';
import { stateEmitterMixin } from './util/mixins/state-emitter.mixin';
import { mix } from './util/mixins/mix.with';
import { NavItemComponent } from './components/navigation/nav-item.component';
import { IconComponent } from './icons/icon.component';
import { HicksIconToggleButton } from './components/icon-button/icon-button';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ObserveStateMixin } from './util/mixins/state-observer.mixin';
import { Observable } from 'rxjs';
import { ObservedStateAction } from './util/mixins/state-observer.mixin';
import { ObservePropertiesMixin } from './util/mixins/observe-bp.mixin';
import { HicksItemComponent } from './components/toc/toc-item.component';

customElements.define('hicks-list-item', HicksItemComponent);
//Table of contents
const tocStateEmitter = {
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
const tocStateObserver = {
  stream: state.filteredStream(['toggled']) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      prop: 'toggled',
      componentHandler(propValue) {
        (this as TableOfContents).open = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const toc = mix(TableOfContents).with(
  stateEmitterMixin(tocStateEmitter),
  ObservePropertiesMixin(tocBreakpointAdapter),
  ObserveStateMixin(tocStateObserver)
);
customElements.define('hicks-toc', toc);

//Table of contents
const iconButtonHandler = {
  propertyChangeHandler: state.getStateEmitted(),
  observedProperties: ['toggled'],
};
const iconButton = mix(HicksIconToggleButton).with(
  stateEmitterMixin(iconButtonHandler)
);
customElements.define('hicks-icon-toggle-button', iconButton);

const drawerStateObserver = {
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
  ObserveStateMixin(drawerStateObserver),
  ObservePropertiesMixin(drawerBreakpointAdapter)
);
customElements.define('hicks-drawer', drawer);
const headerBreakpointAdapter = [
  {
    query: '(max-width: 599.99px)',
    action: function (matches) {
      (this as HicksHeader).mobile = matches;
    },
  },
  {
    query: '(min-width: 600px) and (max-width: 899.99px)',
    action: function (matches) {
      (this as HicksHeader).tablet = matches;
    },
  },
];
const header = mix(HicksHeader).with(
  ObservePropertiesMixin(headerBreakpointAdapter)
);
customElements.define('hicks-header', header);

ContentTree;
TableOfContents;
NavItemComponent;
NavComponent;
TableOfContents;
HicksHeader;
HicksCardContainer;
HicksCard;
PlotEngine;
LogoComponent;
BrandComponent;
ResponsiveLogo;
IconComponent;
HicksIconToggleButton;
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
