# JurisAI — Legal Q&A Chatbot (Full‑stack project)

## 🎯 Elevator Pitch

JurisAI is a full‑stack web application that helps users explore legal concepts with a friendly chatbot UI backed by a searchable knowledge base. It demonstrates end‑to‑end product skills: React (Vite) frontend, Express + Mongoose backend, email workflows (nodemailer), developer-friendly dev scripts, and a production deployment pipeline (Vercel). This repo is optimized to show practical engineering tradeoffs, testing hooks, and a clean developer experience — everything recruiters typically look for.

## ✨ Highlights Recruiters Care About

- **Role & contributions**: Designed and implemented the UI/UX for signup/login/verification flows, built the protected JurisBot experience, implemented backend APIs (auth, verification, contact), and integrated email delivery for onboarding and contact forms.
- **Tech breadth**: React (modern hooks), Vite, Node.js/Express, Mongoose, Fuse.js search, Nodemailer for transactional email, Vercel deployment.
- **Production readiness**: Environment-driven configuration, serverless-compatible Express entrypoint, dev scripts, and a clear `vercel.json` for monorepo deployment.
- **Security awareness**: Clear TODOs for password hashing, env-based secrets, and input sanitization.

## 🚀 Key Features

- ✅ Signup / Login with email verification flow (6-digit code)
- 🤖 JurisBot: Intelligent legal Q&A using Fuse.js search
- 📧 Transactional emails: Welcome messages, verification codes, contact form acknowledgments
- 🔒 Protected routes requiring email verification
- 👤 User profiles with customizable avatars
- 📱 Responsive UI with Bootstrap 5
- ⚡ Fast development with Vite HMR

## 🛠 Tech Stack

**Frontend**
- React 19 + Vite 6
- React Router v7
- Axios for API calls
- Bootstrap 5
- React TSParticles

**Backend**
- Node.js + Express 4
- MongoDB + Mongoose 8
- Fuse.js for fuzzy search
- Nodemailer for emails
- dotenv for configuration

**Deployment**
- Vercel (monorepo)

## 📁 Repository Layout

```
JurisAI/
├── client/               # React frontend
│   ├── public/
│   │   └── legalDataset.json    # Legal knowledge base
│   ├── src/
│   │   ├── assets/components/   # All React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example      # Client env template
│   └── package.json
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Email utilities & templates
│   ├── .env.example      # Server env template
│   ├── .env              # Your local config (gitignored)
│   ├── dev.js            # Development entry point
│   └── package.json
└── vercel.json           # Deployment configuration
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Gmail account (for SMTP) or other email service

### 1️⃣ Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2️⃣ Configure Environment Variables

**Server Configuration** (Required)

Copy the example file and configure:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your settings:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/jurisai
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jurisai

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
MAIL_FROM="JurisAI <your-email@gmail.com>"

# Contact Form Admin Email
MAIL_TO=admin@yourdomain.com
```

**📧 Getting Gmail App Password:**
1. Enable 2-factor authentication on your Google account
2. Visit: https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail"
4. Use this password in `SMTP_PASS`

**Client Configuration** (Optional)

The client doesn't require environment variables for local development. For production:
```bash
cd client
cp .env.example .env
# Edit .env if needed (usually not required)
```

### 3️⃣ Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Client will run on http://localhost:5173
```

### 4️⃣ Access the Application

Open your browser to: **http://localhost:5173**

## 🎬 Demo Flow

1. **Sign Up**: Create a new account at `/signup`
2. **Verify Email**: Check your email for the 6-digit verification code
3. **Login**: Sign in with your credentials
4. **JurisBot**: Ask legal questions and get intelligent answers
5. **Profile**: Customize your avatar and profile information
6. **Contact**: Send messages through the contact form

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create new user account |
| POST | `/api/login` | Authenticate user |
| POST | `/api/verification/send` | Send verification code via email |
| POST | `/api/verification/confirm` | Verify email with code |
| POST | `/api/send-welcome` | Send welcome email |
| POST | `/api/contact` | Submit contact form |
| PATCH | `/api/user` | Update user profile |
| POST | `/api/chatbot` | Query legal knowledge base |

## 📦 Build for Production

**Frontend:**
```bash
cd client
npm run build
npm run preview  # Test production build locally
```

**Backend:**
```bash
cd server
NODE_ENV=production node index.js
```

## 🔒 Security Notes

- ⚠️ **Passwords are currently stored in plaintext** - Implement bcrypt before production
- ⚠️ Add rate limiting for API endpoints
- ⚠️ Implement JWT tokens for authentication
- ⚠️ Add verification code expiry timestamps
- ⚠️ Sanitize user inputs to prevent XSS
- ✅ Environment variables are gitignored
- ✅ CORS enabled for development

## 📝 Next Steps / TODOs

- [ ] Implement bcrypt for password hashing
- [ ] Add JWT authentication tokens
- [ ] Implement verification code expiry
- [ ] Add rate limiting middleware
- [ ] Implement password reset flow
- [ ] Add unit and integration tests
- [ ] Improve error handling and logging
- [ ] Add API request validation with Joi/Zod
- [ ] Implement session management
- [ ] Add database connection pooling

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

[Your License Here]

## 👨‍💻 Author

[Your Name]

---

**Built with ❤️ for demonstrating full-stack development skills**


Notes for local development
---------------------------

- The frontend calls `/api/*`. Use the Vite proxy (in `client/vite.config.js`) or set axios.baseURL to `http://localhost:5000` in development (`client/src/main.jsx` already handles this).
- Example env vars (server `.env` — do NOT commit):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster/mydb
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@example.com
SMTP_PASS=<app-password>
MAIL_FROM=JurisAI <no-reply@example.com>
MAIL_TO=team@example.com
```

Core API endpoints (what to check in an interview)
--------------------------------------------------

- `POST /api/register` — create account
- `POST /api/login` — login; returns `{ user: { name, email, verified } }`
- `POST /api/verification/send` — generates and emails a 6-digit code
- `POST /api/verification/confirm` — confirm code and set `verified: true`
- `POST /api/contact` — forwards contact form to admin and sends acknowledgement

Design notes / tradeoffs
------------------------

- Passwords: intentionally stored in plaintext for the demo to keep code focused. Production must use bcrypt + salted hashes (TODO present in README).
- Verification codes: stored on the user document for simplicity; an expiry and rate-limiting layer is recommended next.
- Email templates: built with inline, compatible HTML (welcome + verification). Nodemailer handles delivery.

How I’d evaluate this project in an interview
--------------------------------------------

- Run the app locally via `node server/dev.js` (starts the API) and `npm run dev` in `client`.
- Walk through the signup->login->verify flow. Show the `server/utils/templates/verificationCode.js` and `mailer.js` to discuss email delivery and templates.
- Discuss next steps: hashing passwords, adding rate limits and code expiry, input validation, integration tests, and monitoring (Sentry/Loggly).

Testing & QA
------------

- No unit tests included yet. Quick wins: add Jest tests for `utils/verification.js` and simple integration tests for `/api/contact` using Supertest.
- Manual test checklist is included in this README's Troubleshooting section.

Deployment
----------

- This repo is configured for Vercel. `vercel.json` maps `/api/*` to the server and serves the client static build for frontend routes. Use `vercel --prod` to publish.

Security and next priorities (short list)
---------------------------------------

1. Hash passwords (bcrypt) and migrate user store.
2. Add verification code expiry and request rate-limits.
3. Harden input validation and sanitize HTML before sending to the client.
4. Add unit and integration tests for critical paths.

Contact / where to look in this repo
------------------------------------

- Start in `client/src/assets/components/` for the UI flows (Signup, Login, Verify, Contact, JurisBot).
- See `server/routes/auth.route.js` for API logic and `server/utils/mailer.js` for email sending.

Appendix: Troubleshooting (quick)
--------------------------------

- 404s on `/api/*` when running the client alone — set the Vite dev proxy so `/api` requests are forwarded to the local server (see `client/vite.config.js`) or configure axios baseURL to `http://localhost:5000` in development.
- SMTP errors — verify SMTP_* env vars and that the provider allows programmatic login (Gmail requires an app password).
- MongoDB connection: ensure IP allowlist and correct `MONGODB_URI`.

License
-------

This project is released under the MIT License. See the included `LICENSE` file for the full text.

Key points (summary):

- Copyright (c) 2025 Rakshith Ganjimut
- Permission is granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
- The software is provided "AS IS", without warranty of any kind. The full license text is in `LICENSE`.

---
This README focuses on the points technical recruiters and hiring managers care about: clear demo steps, responsibilities, architecture, and next steps. If you want, I can also generate a short one‑page PDF resume entry summarizing this project for your CV.
