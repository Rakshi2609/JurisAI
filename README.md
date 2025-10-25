# JurisAI — Legal Q&A Chatbot (Full‑stack project)

Concise elevator pitch
----------------------

JurisAI is a full‑stack web application that helps users explore legal concepts with a friendly chatbot UI backed by a searchable knowledge base. It demonstrates end‑to‑end product skills: React (Vite) frontend, Express + Mongoose backend, email workflows (nodemailer), developer-friendly dev scripts, and a production deployment pipeline (Vercel). This repo is optimized to show practical engineering tradeoffs, testing hooks, and a clean developer experience — everything recruiters typically look for.

Highlights recruiters care about
--------------------------------

- Role & contributions: Designed and implemented the UI/UX for signup/login/verification flows, built the protected JurisBot experience, implemented backend APIs (auth, verification, contact), and integrated email delivery for onboarding and contact forms.
- Tech breadth: React (modern hooks), Vite, Node.js/Express, Mongoose, Fuse.js search, Nodemailer for transactional email, Vercel deployment.
- Production readiness: Environment-driven configuration, serverless-compatible Express entrypoint, dev scripts, and a clear `vercel.json` for monorepo deployment.
- Security awareness: Clear TODOs for password hashing, env-based secrets, and input sanitization.

Key features (what to demo)
---------------------------

- Signup / Login with a verification flow (email code) and protected JurisBot route.
- JurisBot: queryable knowledge base using Fuse.js; responses show referenced laws and scenarios.
- Transactional emails: welcome email + verification code and contact form forwarding (admin ack).
- Dev ergonomics: run locally with Vite + simple server bootstrap, or run everything via `vercel dev`.

Tech stack (short)
------------------

- Frontend: React 19, Vite 6, React Router, Bootstrap 5
- Backend: Node.js, Express 4, Mongoose 8
- Search: Fuse.js
- Email: Nodemailer
- Deploy: Vercel (monorepo)

Repository layout
-----------------

- `client/` — React app (Vite)
  - `public/legalDataset.json` — knowledge base
  - `src/assets/components/` — pages and UI components (Signup, Login, Verify, JurisBot, Contact)
- `server/` — Express API, Mongoose models, utils (mailer, templates)
  - `utils/mailer.js` — Nodemailer wrapper and templates
  - `routes/auth.route.js` — auth, verification, contact, welcome endpoints
- `vercel.json` — monorepo routing & build config

Quick, recruiter-friendly demo (local)
------------------------------------

I recommend the Vercel developer flow for the simplest demo. The following commands run on Windows PowerShell.

1) Install dependencies

```powershell
cd client; npm install; cd ..
cd server; npm install; cd ..
```

2a) Fast: run with Vercel Dev (single command)

```powershell
# install globally if you don't have it
npm i -g vercel

# from repo root
vercel dev
```

2b) Or run client + server locally (recommended for debugging)

```powershell
# start server (example dev bootstrap)
cd server
# create a .env with MONGODB_URI and SMTP_* vars (see below)
node dev.js

# in another terminal
cd client
npm run dev
```

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

- Run the app locally via `vercel dev` or `node server/dev.js` + `npm run dev` in `client`.
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

- 404s on `/api/*` when running the client alone — use `vercel dev` or set the Vite dev proxy.
- SMTP errors — verify SMTP_* env vars and that the provider allows programmatic login (Gmail requires an app password).
- MongoDB connection: ensure IP allowlist and correct `MONGODB_URI`.

License
-------

Add a license file if you plan to open-source this. MIT is a common, permissive choice.

---
This README focuses on the points technical recruiters and hiring managers care about: clear demo steps, responsibilities, architecture, and next steps. If you want, I can also generate a short one‑page PDF resume entry summarizing this project for your CV.
