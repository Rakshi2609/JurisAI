# Client — JurisAI (React + Vite)

This folder contains the frontend single-page application for JurisAI, built with Vite and React.

## 🚀 Quick Start

### 1️⃣ Install Dependencies
```bash
cd client
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

Frontend will run on http://localhost:5173

### 3️⃣ Build for Production
```bash
npm run build        # Creates optimized build in dist/
npm run preview      # Preview production build locally
```

## 📁 Project Structure

```
client/
├── public/
│   └── legalDataset.json       # Legal Q&A knowledge base
├── src/
│   ├── assets/
│   │   ├── components/         # All React components
│   │   │   ├── Landing.jsx     # Landing page
│   │   │   ├── Home.jsx        # Home page
│   │   │   ├── Signup.jsx      # User registration
│   │   │   ├── Login.jsx       # User authentication
│   │   │   ├── VerifyEmail.jsx # Email verification
│   │   │   ├── JurisBot.jsx    # Legal chatbot (protected)
│   │   │   ├── Profile.jsx     # User profile
│   │   │   ├── Contact.jsx     # Contact form
│   │   │   ├── AboutUs.jsx     # About page
│   │   │   ├── Blog.jsx        # Blog page
│   │   │   ├── Business.jsx    # Business info
│   │   │   ├── Navbar.jsx      # Navigation
│   │   │   ├── Footer.jsx      # Footer
│   │   │   └── [component].css # Component styles
│   │   └── icons/
│   │       └── avatars.js      # Avatar options
│   ├── App.jsx                 # Main app & routing
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── .env.example                # Environment template
├── vite.config.js              # Vite configuration
└── package.json
```

## 🎨 Key Components

### Pages
- **`Landing.jsx`** — Homepage with hero section
- **`Home.jsx`** — Main application home
- **`Signup.jsx`** — User registration form
- **`Login.jsx`** — Authentication page
- **`VerifyEmail.jsx`** — Email verification with 6-digit code
- **`JurisBot.jsx`** — Protected chatbot interface with fuzzy search
- **`Profile.jsx`** — User profile with avatar customization
- **`Contact.jsx`** — Contact form with email notification

### Components
- **`Navbar.jsx`** — Responsive navigation with user menu
- **`Footer.jsx`** — Site footer
- **`Particles.jsx`** — Animated background effects
- **`Robot3D.jsx`** — 3D robot visualization

## 🔗 API Integration

The app communicates with the backend via Axios. In development, API calls automatically target `http://localhost:5000`:

```javascript
// main.jsx sets base URL in development
if (import.meta.env.DEV) {
  axios.defaults.baseURL = 'http://localhost:5000';
}
```

### API Calls Used
- `POST /api/register` — User signup
- `POST /api/login` — User login
- `POST /api/verification/send` — Request verification code
- `POST /api/verification/confirm` — Verify email
- `PATCH /api/user` — Update profile
- `POST /api/contact` — Submit contact form
- `GET /legalDataset.json` — Load legal Q&A data

## 🎯 Key Features

- ✨ **Modern React** — Hooks, functional components
- ⚡ **Vite** — Lightning-fast HMR and builds
- 🔐 **Protected Routes** — Email verification required for JurisBot
- 🎨 **Bootstrap 5** — Responsive styling
- 🌊 **Animated Backgrounds** — TSParticles integration
- 👤 **User Profiles** — Avatar selection and customization
- 📱 **Responsive Design** — Mobile-friendly UI
- 🤖 **Fuzzy Search** — Intelligent legal Q&A matching

## 🛠 Development Tools

### Linting
```bash
npm run lint
```

### Vite Dev Server
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Auto-reload on file changes

## 🌐 Environment Variables (Optional)

For production deployments, you can configure:

```env
# .env (optional)
VITE_API_URL=https://your-api-domain.com
```

In development, no `.env` file is needed as the API URL defaults to `http://localhost:5000`.

## 📦 Dependencies

### Core
- **react** — UI library
- **react-dom** — React renderer
- **react-router-dom** — Client-side routing
- **axios** — HTTP client
- **bootstrap** — CSS framework

### Features
- **fuse.js** — Fuzzy search for chatbot
- **react-tsparticles** — Animated backgrounds
- **@splinetool/loader** — 3D model loading

### Dev Tools
- **vite** — Build tool
- **@vitejs/plugin-react** — React plugin for Vite
- **eslint** — Code linting

## 🎬 User Flow

1. **Landing** → User arrives at landing page
2. **Signup** → Creates account with name, email, password
3. **Login** → Authenticates with credentials
4. **Verify** → Receives and enters 6-digit code
5. **JurisBot** → Access granted to legal Q&A chatbot
6. **Profile** → Customize avatar and account details
7. **Contact** → Send messages to admin

## 🔒 Protected Routes

Routes requiring email verification:
- `/JurisBot` — Legal chatbot interface

Users without verified emails are redirected to `/verify`.

## 🎨 Styling

- **Bootstrap 5** for layout and components
- **Custom CSS** for each component
- **Responsive breakpoints** for mobile/tablet/desktop
- **CSS animations** for interactive elements

## 🧪 Testing Locally

1. Ensure backend is running on port 5000
2. Start client dev server: `npm run dev`
3. Open http://localhost:5173
4. Test user flows:
   - Register new account
   - Verify email
   - Login
   - Use JurisBot
   - Update profile
   - Submit contact form

## 🚀 Production Build

```bash
npm run build
```

Optimized files will be in `dist/` directory:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Code splitting for better performance

## 💡 Interview Talking Points

- **`VerifyEmail.jsx`** — Shows end-to-end verification flow and API integration
- **`JurisBot.jsx`** — Demonstrates Fuse.js search and dynamic UI updates
- **`Contact.jsx`** — Form handling, validation, and success/error states
- **`Profile.jsx`** — User data management and avatar customization
- **`App.jsx`** — React Router setup and protected route logic
- **`main.jsx`** — Axios configuration and app initialization

## 📝 Next Steps

- [ ] Add form validation library (React Hook Form)
- [ ] Implement client-side caching
- [ ] Add loading skeletons
- [ ] Implement PWA features
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Optimize bundle size
- [ ] Add error boundaries
- [ ] Implement lazy loading for routes
- [ ] Add accessibility improvements (ARIA labels)

---

**Built with React + Vite for blazing-fast development** ⚡
