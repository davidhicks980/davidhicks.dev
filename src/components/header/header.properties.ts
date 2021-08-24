import {
  propertyArray,
  prefixProperties,
} from '../../util/functions/property-prefixer';
const InternalHeaderProperties = {
  CURVED: 'isCurved',
};
export const prefix = 'header';
export const HeaderProperties = prefixProperties(
  prefix,
  InternalHeaderProperties
);
export const observedProperties = propertyArray(InternalHeaderProperties);
