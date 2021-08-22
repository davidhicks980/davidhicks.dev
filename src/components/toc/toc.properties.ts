import {
  prefixProperties,
  propertyArray,
} from '../../util/primitives/property-prefixer';

let InternalTOCProperties = {
  ACTIVE_HASH: 'activeLink',
  OPEN: 'open',
};
export const prefix = 'toc';
export const TOCProperties = prefixProperties(prefix, InternalTOCProperties);
export const observedProperties = propertyArray(InternalTOCProperties);
