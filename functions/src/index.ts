'use strict';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import cors from 'cors';
import express from 'express';

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
