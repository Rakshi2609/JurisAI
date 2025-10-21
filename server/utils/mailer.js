// utils/mailer.js (ESM)
import nodemailer from 'nodemailer';
import 'dotenv/config';
import welcomeTemplate from './templates/welcome.js';

// Expected env vars:
// SMTP_HOST, SMTP_PORT, SMTP_SECURE (true/false), SMTP_USER, SMTP_PASS, MAIL_FROM

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP config. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === 'true', // true for 465, false otherwise
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendMail({ to, subject, html, text }) {
  const t = getTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const info = await t.sendMail({ from, to, subject, html, text });
  return info;
}

export async function sendWelcomeEmail({ to, name }) {
  const html = welcomeTemplate({ name });
  const subject = 'Welcome to JurisAI';
  return sendMail({ to, subject, html });
}

export { welcomeTemplate };
export default { sendMail, sendWelcomeEmail };
