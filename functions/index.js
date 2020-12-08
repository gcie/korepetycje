const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const { firestore } = require('firebase');

dotenv.config();
admin.initializeApp();

const db = admin.firestore();

let gmailEmail, gmailPassword;
if (functions.config().gmail) {
  gmailEmail = functions.config().gmail.email;
  gmailPassword = functions.config().gmail.password;
} else {
  gmailEmail = process.env.email;
  gmailPassword = process.env.password;
}

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.pupilOnCreate = functions.firestore.document('pupils/{pupil}').onCreate(async (snapshot, context) => {
  // SEND EMAIL NOTIFICATION
  const config = (await db.doc('admin/newPupilNotifications').get()).data();

  if (!config.enabled) return true;

  const mailOptions = {
    from: config.fromString,
    to: config.toEmail,
    subject: config.subject,
  };

  text = config.content;
  for (let prop of ['name', 'contactEmail', 'class']) {
    text = text.replace(`{${prop}}`, snapshot.data()[prop]);
  }

  mailOptions.text = text.replace('{newline}', '\n');

  return await mailTransport.sendMail(mailOptions);
});

exports.tutorOnCreate = functions.firestore.document('tutors/{tutor}').onCreate(async (snapshot, context) => {
  // SEND EMAIL NOTIFICATION
  const config = (await db.doc('admin/newTutorNotifications').get()).data();

  if (!config.enabled) return true;

  const mailOptions = {
    from: config.fromString,
    to: config.toEmail,
    subject: config.subject,
  };

  text = config.content;
  for (let prop of ['name', 'contactEmail', 'class']) {
    text = text.replace(`{${prop}}`, snapshot.data()[prop]);
  }

  mailOptions.text = text.replace('{newline}', '\n');

  return await mailTransport.sendMail(mailOptions);
});

exports.formatTutorOnCreate = functions.firestore.document('tutors/{tutorId}').onCreate(async (snapshot, context) => {
  snapshot.ref.update({
    _id: context.params.tutorId,
  });
});

exports.formatPupilOnCreate = functions.firestore.document('pupils/{pupilId}').onCreate(async (snapshot, context) => {
  snapshot.ref.update({
    _id: context.params.pupilId,
  });
});