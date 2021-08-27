import {
  prefixProperties,
  propertyArray,
} from '../../util/functions/property-prefixer';

const InternalTOCProperties = {
  ACTIVE_HASH: 'activeLink',
  OPEN: 'open',
};
export const prefix = 'toc';
export const TOCProperties = prefixProperties(prefix, InternalTOCProperties);
export const observedProperties = propertyArray(InternalTOCProperties);
