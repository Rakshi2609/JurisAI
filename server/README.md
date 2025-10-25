# Server — JurisAI (Express + Mongoose)

This folder contains the Express API for JurisAI. It includes authentication, verification, contact forwarding, and email utilities.

Quick local run (PowerShell)
1) Install dependencies
```powershell
cd server
npm install
```

2) Prepare environment variables
Create a `server/.env` file with the following (example):
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster/mydb
PORT=5000
# SMTP settings for sending emails
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@example.com
SMTP_PASS=<app-password>
MAIL_FROM="JurisAI <no-reply@example.com>"
MAIL_TO=team@example.com
```

3) Start the API (development)
```powershell
cd server
node dev.js
```

API endpoints (summary)
- `POST /api/register` — create a new user; body `{ name, email, password }`
- `POST /api/login` — login; body `{ email, password }` returns `{ user: { name, email, verified } }`
- `POST /api/verification/send` — generate & email a 6-digit code to the user
- `POST /api/verification/confirm` — confirm a code and mark user as verified
- `POST /api/contact` — forward contact messages to admin and send acknowledgement to sender
- `POST /api/send-welcome` — send a welcome email to a user (used manually / scripts)

Important files
- `routes/auth.route.js` — main API routes (auth, verification, contact, welcome)
- `models/ourmap.js` — Mongoose user model
- `utils/mailer.js` — Nodemailer transport and send helpers
- `utils/templates/` — HTML templates for welcome, verification code, and contact ack

Notes and next steps
- Ensure your SMTP credentials (SMTP_USER/SMTP_PASS) are set before sending emails. Gmail will require an app password.
- Passwords are currently stored in plaintext in the demo — replace with bcrypt before production.
- Consider adding expiry timestamps and rate-limiting for verification codes.
