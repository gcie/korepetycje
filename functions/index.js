const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

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

  var text = config.content;
  var subject = config.subject;
  var pupil = snapshot.data();

  for (let prop of ['name', 'contactEmail', 'class', 'phone', 'mainNeeds']) {
    text = text.replace(`{${prop}}`, pupil[prop] ? pupil[prop] : 'brak');
    subject = subject.replace(`{${prop}}`, pupil[prop] ? pupil[prop] : 'brak');
  }

  if (pupil.needs) {
    text = text.replace('{needs}', pupil.needs.join(', '));
    subject = subject.replace('{needs}', pupil.needs.join(', '));
  }

  const mailOptions = {
    from: config.fromString,
    to: config.toEmail,
    subject: subject,
    text: text,
  };

  return await mailTransport.sendMail(mailOptions);
});

exports.tutorOnCreate = functions.firestore.document('tutors/{tutor}').onCreate(async (snapshot, context) => {
  // SEND EMAIL NOTIFICATION
  const config = (await db.doc('admin/newTutorNotifications').get()).data();

  if (!config.enabled) return true;

  var text = config.content;
  var subject = config.subject;
  var tutor = snapshot.data();

  for (let prop of ['name', 'email', 'phone']) {
    text = text.replace(`{${prop}}`, tutor[prop] ? tutor[prop] : 'brak');
    subject = subject.replace(`{${prop}}`, tutor[prop] ? tutor[prop] : 'brak');
  }

  if (tutor.teaches) {
    const teaches = Object.keys(tutor.teaches)
      .map((subject) => {
        if (tutor.teaches[subject].sp && tutor.teaches[subject].lo && tutor.teaches[subject].matura) return subject;
        else {
          let modes = Object.keys(tutor.teaches[subject]).filter((key) => tutor.teaches[subject][key]);
          return `${subject} (${modes.join('+')})`;
        }
      })
      .join(', ');

    text = text.replace(`{teaches}`, teaches);
    subject = subject.replace(`{teaches}`, teaches);
  }

  const mailOptions = {
    from: config.fromString,
    to: config.toEmail,
    subject: subject,
    text: text,
  };

  return await mailTransport.sendMail(mailOptions);
});

exports.formatTutorOnCreate = functions.firestore.document('tutors/{tutorId}').onCreate(async (snapshot, context) => {
  snapshot.ref.update({
    _id: context.params.tutorId,
    submittedDate: new Date(),
  });
});

exports.formatPupilOnCreate = functions.firestore.document('pupils/{pupilId}').onCreate(async (snapshot, context) => {
  snapshot.ref.update({
    _id: context.params.pupilId,
    submittedDate: new Date(),
  });
});
