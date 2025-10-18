# JurisAI

A full‑stack web app that helps users understand legal topics through a friendly chatbot experience. The frontend is a React (Vite) SPA with multiple pages and a protected JurisBot chat route. The backend is an Express + Mongoose API. Search is powered by Fuse.js over a curated dataset.

## Tech stack

- Frontend: React 19, Vite 6, React Router, Bootstrap 5
- Backend: Node.js, Express 4, Mongoose 8
- Search: Fuse.js 7
- Deployment: Vercel (monorepo with `vercel.json` routing)

## Monorepo layout

- `client/` — React app (Vite)
  - `public/legalDataset.json` — knowledge base used by JurisBot
  - `src/assets/components/` — UI components and pages
- `server/` — Express API and Mongoose models
  - `index.js` — Express app (exported for serverless)
  - `models/ourmap.js` — User model (name, email, password)
- `vercel.json` — Vercel configuration for API and static site

## Features

- User registration and login (stored in MongoDB via Mongoose)
- Protected JurisBot route (`/JurisBot`) gated by localStorage login
- JurisBot answers fetched from `legalDataset.json` with law references and scenarios
- Optional backend chatbot endpoint (`POST /api/chatbot`) using Fuse.js

## Prerequisites

- Node.js 18+ (recommended 18.17 or newer)
- npm (or pnpm/yarn if you prefer)

## Quick start (recommended: Vercel Dev)

Vercel Dev respects `vercel.json`, wiring the API (`/api/*`) to the server and serving the client in one command.

1) Install dependencies

```powershell
# From repo root
cd client; npm install; cd ..
cd server; npm install; cd ..
```

2) Run with Vercel Dev

```powershell
# If you don't have it yet
npm install -g vercel

# From repo root
vercel dev
```

- Frontend: served at the URL printed by Vercel Dev
- API routes: available under `/api/*` according to `vercel.json`

## Alternative: run client and server locally (notes)

The current `server/index.js` exports an Express app (for Vercel serverless) and does not call `app.listen(...)`. To run the server locally without Vercel, add a tiny bootstrap file that imports the app and starts a listener (development-only):

```js
// server/dev.js (example)
const app = require('./index');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
```

Then:

```powershell
cd server
npm install
node dev.js
```

For the client, start Vite (default port 5173):

```powershell
cd client
npm run dev
```

Because the React app calls relative `/api/...` URLs, set up a Vite dev proxy so those calls go to `http://localhost:5000` during local development. Update `client/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
```

Alternatively, configure Axios with a baseURL in development.

## Environment variables

Move secrets out of source code before deploying.

- `MONGODB_URI` — MongoDB connection string

Example `.env` for the server (do not commit):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

Update `server/index.js` to read `process.env.MONGODB_URI` when you are ready to externalize the secret.

## Scripts

Frontend (`client`):
- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

Backend (`server`):
- `npm start` — runs `nodemon index.js` (works on Vercel Dev; for pure local, use `dev.js` as shown above)

## App routes (client)

- `/` — Landing
- `/home` — Home
- `/register` — Signup
- `/login` — Login
- `/blog`, `/business`, `/about`, `/contact` — Additional pages
- `/JurisBot` — Protected chatbot (requires login)

## API endpoints (server)

- `POST /api/register`
  - Body: `{ name: string, email: string, password: string }`
  - Response: created user JSON or `{ error }`
- `POST /api/login`
  - Body: `{ email: string, password: string }`
  - Response: `{ message: 'Successful', user: { name, email } }` or error
- `POST /api/chatbot`
  - Body: `{ message: string }`
  - Response: `{ response: string }` (HTML content with optional laws and scenarios)
- `GET /` — health/welcome message

Note: The current React `JurisBot` component uses the static `public/legalDataset.json` directly. The `/api/chatbot` endpoint exists for a server-driven approach if you want to switch later.

## Data source

`client/public/legalDataset.json` contains Q&A items with fields:

- `question: string`
- `answer: string`
- `laws?: string[]`
- `scenarios?: string[]`

Both the client and server variants of JurisBot format responses with law references and example scenarios when present.

## Deployment (Vercel)

This repo includes a `vercel.json` that configures:

- Builds
  - `server/index.js` with `@vercel/node`
  - `client` with `@vercel/static-build`
- Routes
  - `/api/(.*)` → `server/index.js`
  - `/(.*)` → `client/$1`

Deploy via the Vercel dashboard or:

```powershell
vercel
# then
vercel --prod
```

## Security notes and TODOs

- Passwords are stored in plaintext right now (demo only). Use bcrypt to hash passwords and add proper auth (sessions/JWT).
- The MongoDB URI is hard-coded in `server/index.js`. Move to `process.env.MONGODB_URI` and use environment variables on Vercel.
- The chatbot response is rendered with `dangerouslySetInnerHTML` in the client. If you ever allow user-generated content, sanitize HTML.
- Add input validation on all API endpoints.

## Troubleshooting

- 404s on `/api/*` when running only the Vite dev server: use Vercel Dev or add the Vite proxy as shown above.
- CORS issues when hitting the API from a different origin: ensure CORS is configured, or use same-origin via proxy.
- MongoDB connection failures: verify `MONGODB_URI`, IP allowlist, and that the database exists.

## License

This project currently does not include a top-level license file. If you intend to open-source it, consider adding one (e.g., MIT/ISC).
