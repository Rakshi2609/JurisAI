// scripts/sendWelcome.js
import 'dotenv/config';
import { sendWelcomeEmail } from '../utils/mailer.js';

const to = process.argv[2];
const name = process.argv[3] || 'there';

if (!to) {
  console.error('Usage: node scripts/sendWelcome.js <email> [name]');
  process.exit(1);
}

sendWelcomeEmail({ to, name })
  .then(() => {
    console.log(`Welcome email sent to ${to}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to send email:', err);
    process.exit(1);
  });
