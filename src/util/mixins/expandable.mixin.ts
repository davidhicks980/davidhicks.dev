import { LitProto } from '../../types/LitProto';
import { property, query } from 'lit/decorators.js';
import { CollapseController as CollapseController } from '../controllers/expansion.controller';
export declare class ExpandibleElementInterface {
  highlight: boolean;
  protected renderHighlight(): unknown;
}
export const ExpandMixin = <T extends LitProto>(superClass: T) => {
  // ✅ Defining a class in a function body, and then returning it
  class Collapsible extends superClass {
    collapseController: CollapseController;
    @property({ type: Boolean, reflect: true })
    collapsed: boolean = false;
    @property({ type: Number })
    panelHeight: number = 0;
    collapsingPanel: HTMLElement;
    controllers: { expansion: CollapseController };
    updateOffset() {
      window.requestAnimationFrame(() => {
        this.panelHeight = this.collapsingPanel.offsetHeight;
        if (this.panelHeight > 0)
          this.controllers.expansion.watchElement(
            this.collapsingPanel,
            this.panelHeight
          );
      });
    }
    makeCollapsible(entryId: string, root: HTMLElement) {
      return new CollapseController(this, entryId, root);
    }
    updatePanel(selector: string) {
      this.collapsingPanel = this.shadowRoot.querySelector(selector);
      if (this.collapsingPanel) {
        this.updateOffset();
      } else {
        throw Error('Collapsing panel selector returns null');
      }
    }
    handleToggle() {
      this.controllers.expansion.toggle(this.collapsingPanel, this.collapsed);
    }
    toggle(force: boolean) {
      this.collapsed = force ?? !this.collapsed;
      this.style.marginBottom = this.collapsed
        ? -1 * this.panelHeight + 'px'
        : '0px';
      return this.collapsed;
    }
  }
  return Collapsible;
};
