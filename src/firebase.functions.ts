import { initializeApp } from '../node_modules/firebase/app';
import {
  getFunctions,
  httpsCallable,
} from '../node_modules/firebase/functions';
import 'firebase/app-check';
import { Resume } from './sections/resume.section';
const APP_CHECK_PUBLIC_KEY = '6LfNxeMbAAAAAPB86Zh6IGT_n0XJNcDsyDVHAWM3';

import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
interface HTTPSUnlockResumeResponse {
  data: {
    hasError: false;
    error: '';
    result: string;
  };
}
const firebaseConfig = {
  apiKey: 'AIzaSyAndeR8HLJfiFdW7qXR5y-C5_lN2Z-HMus',
  authDomain: 'davidhicks-dev.firebaseapp.com',
  databaseURL: 'https://davidhicks-dev-default-rtdb.firebaseio.com',
  projectId: 'davidhicks-dev',
  storageBucket: 'davidhicks-dev.appspot.com',
  messagingSenderId: '563180792904',
  appId: '1:563180792904:web:54a581f9bacc810ccf3c7d',
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(APP_CHECK_PUBLIC_KEY),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export class FormHandler {
  constructor() {}
  unlockResume(resumeKey: string) {
    const unlockResume = httpsCallable(functions, 'unlockResume');
    return unlockResume(resumeKey)
      .then((res: HTTPSUnlockResumeResponse) => {
        let { hasError, result } = res.data;
        if (hasError) {
          return false;
        } else {
          const entries = JSON.parse(result);
          return new Resume(entries.resumeEntries).template;
        }
      })
      .catch((error) => {
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error(
          'There was an error when calling the Cloud Function',
          error
        );
        window.alert(
          'There was an error when calling the Cloud Function:\n\nError Code: ' +
            code +
            '\nError Message:' +
            message +
            '\nError Details:' +
            details
        );
      });
  }
}
