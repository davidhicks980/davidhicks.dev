import {
  propertyArray,
  prefixProperties,
} from '../../../util/functions/property-prefixer';
const InternalResumeProperties = {
  RESUME_TEMPLATE: 'resumeTemplate',
};
export const prefix = 'unlockresume';
export const UnlockResumeProperties = prefixProperties(
  prefix,
  InternalResumeProperties
);
export const observedProperties = propertyArray(InternalResumeProperties);
