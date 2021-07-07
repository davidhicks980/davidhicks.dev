import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { BreakpointController } from '../controllers/breakpoint.controller';
import { styleMap } from 'lit/directives/style-map.js';
import { MediaQueryCallback } from '../../MediaQueryCallback';
import { StyleAdjustments } from '../../types/StyleAdjustments';

type Constructor<T = {}> = new (...args: any[]) => T;

export const styleResponsively = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  const mixin = (adjustments: StyleAdjustments[]) => {
    class ResponsiveStyleMixin extends superClass {
      breakpointControl = new BreakpointController(this);
      @property({ type: Number })
      styleIndex: number = 0;

      responsiveStyles = [];

      // ...and a helper render method:
      styleComponent(template: (styles: {}) => TemplateResult<1>) {
        if (this.styleIndex != 0) {
          const styles = this.responsiveStyles[this.styleIndex];
          return template(styleMap(styles));
        } else return template('');
      }
      constructor(...args: any[]) {
        super();
      }
      firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        adjustments.forEach(({ query, styles, props }, i) => {
          this.responsiveStyles[i + 1] = styles;

          const action: MediaQueryCallback = (e: MediaQueryListEvent) => {
            if (e.matches) {
              if (props && props.length > 0) {
                props.forEach((prop) => {
                  if (this[prop]) {
                    this[prop] = e.matches;
                  }
                });
              }
              this.styleIndex = i + 1;
            } else {
              this.styleIndex = 0;
            }
          };
          this.breakpointControl.observeBreakpoint(query, action);
        });
      }
    }
    return ResponsiveStyleMixin as Constructor<ResponsiveStyleMixin> & T;
  };
  return mixin;
};
