const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, newPassword) => {
  const subject = 'Reset password';
  const text = `Dear user,
Your new password is: ${newPassword}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendVerificationEmail = async (to) => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const subject = 'Verify email';
  const text = `Dear user,
  Your verification code is: ${code}
  If you did not request any verification codes, then ignore this email.`;
  await sendEmail(to, subject, text);
  return code;
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
