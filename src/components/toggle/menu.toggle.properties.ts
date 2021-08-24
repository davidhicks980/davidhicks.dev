import {
  propertyArray as propertyArray,
  prefixProperties,
} from '../../util/functions/property-prefixer';
const InternalToggleProperties = {
  TOGGLED: 'toggled',
};
export const prefix = 'menu_toggle';
export const ToggleProperties = prefixProperties(
  prefix,
  InternalToggleProperties
);
export const observedProperties = propertyArray(InternalToggleProperties);
