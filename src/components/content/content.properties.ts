import {
  prefixProperties,
  propertyArray,
} from '../../util/functions/property-prefixer';
const InternalContentProperties = {
  TEMPLATE: 'template',
};

export const prefix = 'prefix';
export const ContentProperties = prefixProperties(
  prefix,
  InternalContentProperties
);

export const observedProperties = propertyArray(InternalContentProperties);
