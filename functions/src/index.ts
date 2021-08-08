'use strict';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import cors from 'cors';
import express from 'express';
import crypto from 'crypto';
import { entries } from './resume-data.encrypted.json';
const app = express();
app.use(cors);
//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;
const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
admin.initializeApp();
const decrypt = (pass: string, text: string) => {
  try {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift() as string, 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(pass),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return { hasError: false, error: '', result: decrypted.toString() };
  } catch (err) {
    return { hasError: true, result: '', error: err.toString() };
  }
};
/*const passError = new functions.https.HttpsError(
  'invalid-argument',
  'The recruiter key provided does not match our records. Perhaps David messed something up. '
);
*/
exports.submit = functions.https.onRequest((req, res) => {
  console.log('started');
  const mailOptions = {
    from: 'davidhicks980@gmail.com',
    to: 'davidhicks980@gmail.com',
    subject: '[DAVIDHICKS.DEV]',
    html: 'howdy',
  };
  console.log('about to send');

  return mailTransport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.send('Message not sent :(');
    }
    return res.send('Message sent');
  });
});
exports.unlockResume = functions.https.onCall((data, context) => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    );
  }

  // Your function logic follows.
  const decrypted = decrypt(data, entries);
  if (decrypted?.hasError) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      JSON.stringify(decrypted)
    );
  } else if (!decrypted) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'decrypt did not return anything'
    );
  } else {
    return decrypted;
  }
});
