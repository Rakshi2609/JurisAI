# Client — JurisAI (React/Vite)

This folder contains the frontend single-page application for JurisAI, built with Vite and React.

What this contains
- `src/` — React source files. Key pages/components:
  - `src/assets/components/Signup.jsx` — Signup form
  - `src/assets/components/Login.jsx` — Login form
  - `src/assets/components/VerifyEmail.jsx` — Email verification UI
  - `src/assets/components/JurisBot.jsx` — Protected chatbot route
  - `src/assets/components/Contact.jsx` — Contact form (wired to `/api/contact`)
- `public/legalDataset.json` — knowledge base used by JurisBot

Quick local run (PowerShell)
1) Install dependencies
```powershell
cd client
npm install
```

2) Start dev server
```powershell
npm run dev
```

Notes
- The frontend talks to `/api/*` endpoints. During development the app sets axios.defaults.baseURL to `http://localhost:5000`.
- If you prefer a Vite dev proxy instead, edit `client/vite.config.js` to forward `/api` to `http://localhost:5000`.
- Build for production
```powershell
npm run build
# preview the production build
npm run preview
```

Testing & lint
- ESLint is configured in the repo root. Run the linter from the client folder if a script exists:
```powershell
npm run lint
```

Where to look for interview talking points
- `src/assets/components/VerifyEmail.jsx` — shows the end-to-end verification flow and how the client uses the `/api/verification` endpoints.
- `src/assets/components/Contact.jsx` — contact form that POSTs to `/api/contact` and displays success/error state.

Tips
- For a quick demo, sign up, then log in. Unverified users are redirected to `/verify` and can request a code. After confirming the code the protected `/JurisBot` becomes accessible.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
