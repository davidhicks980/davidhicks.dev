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
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
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

exports.contact = functions.https.onCall(async (data: string, context) => {
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    );
  }

  if (typeof data != 'string') {
    return null;
  }
  const mailOptions = {
    from: 'davidhicks980@gmail.com',
    to: 'davidhicks980@gmail.com',
    subject: `[DAVIDHICKS.DEV]`, //${///data.get('fullname')}${data.get('email')}`,
    html: data,
  };

  functions.logger.log(mailOptions);
  try {
    const res = await mailTransport.sendMail(mailOptions);
    functions.logger.log(res);
    return res.accepted.includes('davidhicks980@gmail.com');
  } catch (err) {
    functions.logger.log(err);
    return false;
  }
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
  return decrypt(data, entries);
});
