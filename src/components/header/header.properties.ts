import {
  propertyArray,
  prefixProperties,
} from '../../util/primitives/property-prefixer';
const InternalHeaderProperties = {
  CURVED: 'curved',
};
export const prefix = 'header';
export const HeaderProperties = prefixProperties(
  prefix,
  InternalHeaderProperties
);
export const observedProperties = propertyArray(InternalHeaderProperties);
