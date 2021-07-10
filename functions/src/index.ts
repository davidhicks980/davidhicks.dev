'use strict';

import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;

admin.initializeApp();

function handleSuccess(email = '', name = '', message = '') {
  console.log(email, message, name);
}
function handleError(email = '', name = '', message = '') {
  console.error(email, message, name, 'ERROR');
}
//creating function for sending emails
const forwardFormSubmission = function (
  message: {
    senderEmail: string;
    name: string;
    perferredGreeting: string;
    shouldRespond: boolean;
    message: string;
  },
  handleError: Function,
  handleSuccess: Function
) {
  //transporter is a way to send your emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  // setup email data with unicode symbols
  //this is how your email are going to look like
  const mailOptions = {
    from: gmailEmail, // sender address
    to: 'davidhicks980@gmail.com', // list of receivers
    subject: `[DAVIDHICKS.DEV][${message.name}]`, // Subject line
    text: '!' + JSON.stringify(message), // plain text body
    html: '!' + JSON.stringify(message), // html body
  };

  //this is callback function to return status to firebase console
  const getDeliveryStatus = function (
    err: Error | null,
    info: SMTPTransport.SentMessageInfo
  ) {
    if (err) {
      return handleError();
    }
    if (message.perferredGreeting?.length > 0) {
      handleSuccess(message.senderEmail, message.perferredGreeting);
    } else {
      handleSuccess(message.senderEmail, message.name);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };

  //call of this function send an email, and return status
  transporter.sendMail(mailOptions, getDeliveryStatus);
};

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database
  .ref('/emails/{sessionId}')
  .onCreate(function (snap, context) {
    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    const text = createdData.mail;

    //here we send new data using function for sending emails
    forwardFormSubmission(text, handleError, handleSuccess);
  });
