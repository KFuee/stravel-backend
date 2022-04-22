const nodemailer = require('nodemailer');

const config = require('../config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
transport
  .verify()
  .then(() => logger.info('Conectado al servidor SMTP'))
  .catch(() => logger.warn('No se pudo conectar al servidor SMTP'));

const sendEmail = async (to, subject, content) => {
  const msg = { from: config.email.from, to, subject, html: content };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Resetear contraseña';
  const url = `${config.client.url}/reset-password?token=${token}`;
  const content = `
    <p>Hola,</p>
    <p>Para resetear tu contraseña, haz click en el siguiente enlace:</p>
    <p><a href="${url}">${url}</a></p>
    <p>Si no has solicitado este cambio, ignora este correo.</p>
  `;

  await sendEmail(to, subject, content);
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
};
