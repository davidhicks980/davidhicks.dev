import {
  prefixProperties,
  propertyArray,
} from '../../util/primitives/property-prefixer';

let InternalTOCProperties = {
  ACTIVE_SECTION: 'activeSection',
  OPEN: 'open',
};
export const prefix = 'toc';
export const TOCProperties = prefixProperties(prefix, InternalTOCProperties);
export const observedProperties = propertyArray(InternalTOCProperties);
