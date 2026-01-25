# Server — JurisAI (Express + Mongoose)

This folder contains the Express API for JurisAI. It includes authentication, verification, contact forwarding, and email utilities.

## 🚀 Quick Start

### 1️⃣ Install Dependencies
```bash
cd server
npm install
```

### 2️⃣ Configure Environment Variables

Copy the example file and edit with your settings:
```bash
cp .env.example .env
```

Required configuration in `.env`:
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
1. Enable 2-factor authentication
2. Visit: https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"
4. Use in `SMTP_PASS`

### 3️⃣ Start the Server

Development mode (with nodemon):
```bash
npm start
```

Or directly:
```bash
node dev.js
```

Server will run on http://localhost:5000

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/register` | Create new user | `{ name, email, password }` |
| POST | `/api/login` | User login | `{ email, password }` |

### Email Verification
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/verification/send` | Send verification code | `{ email, name }` |
| POST | `/api/verification/confirm` | Verify code | `{ email, code }` |
| POST | `/api/verification` | Legacy endpoint | `{ email, verificationToken? }` |

### User Management
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| PATCH | `/api/user` | Update profile | `{ email, name?, avatar?, avatarIndex? }` |

### Communication
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/send-welcome` | Send welcome email | `{ email, name }` |
| POST | `/api/contact` | Submit contact form | `{ name, email, subject, message }` |

### Chatbot
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/chatbot` | Query legal knowledge base | `{ message }` |

## 📁 Project Structure

```
server/
├── models/
│   └── ourmap.js           # User schema
├── routes/
│   └── auth.route.js       # All API routes
├── utils/
│   ├── mailer.js           # Email sending utilities
│   ├── verification.js     # Code generation
│   └── templates/          # Email HTML templates
│       ├── welcome.js
│       ├── verificationCode.js
│       └── contactAck.js
├── scripts/
│   └── sendWelcome.js      # Manual email script
├── .env.example            # Environment template
├── .env                    # Your config (gitignored)
├── dev.js                  # Development entry
├── index.js                # Main server file
└── package.json
```

## 🔑 Important Files

- **`index.js`** — Main Express server, MongoDB connection, Fuse.js setup
- **`routes/auth.route.js`** — All API endpoints (auth, verification, contact, user management)
- **`models/ourmap.js`** — Mongoose User schema
- **`utils/mailer.js`** — Nodemailer configuration and email sending functions
- **`utils/templates/`** — HTML email templates

## 🧪 Testing Emails

Use the included script to test email sending:
```bash
node scripts/sendWelcome.js user@example.com "User Name"
```

## ⚠️ Security Notes & TODOs

- ⚠️ **Passwords are stored in plaintext** — Implement bcrypt hashing
- ⚠️ Add JWT token authentication
- ⚠️ Implement verification code expiry (currently no timeout)
- ⚠️ Add rate limiting for sensitive endpoints
- ⚠️ Sanitize user inputs to prevent XSS/injection
- ⚠️ Add request validation with Joi or Zod
- ✅ Environment variables properly isolated
- ✅ CORS enabled for cross-origin requests

## 🐛 Common Issues

**SMTP Errors:**
- Ensure Gmail 2FA is enabled and you're using an app password
- Check `SMTP_HOST`, `SMTP_PORT`, and `SMTP_SECURE` settings
- For Gmail, use port 465 with `SMTP_SECURE=true`

**MongoDB Connection:**
- Verify `MONGODB_URI` is correct
- Ensure MongoDB is running (local) or accessible (Atlas)
- Check network connectivity and firewall settings

**Missing Environment Variables:**
- Copy `.env.example` to `.env`
- Fill in all required values
- Restart the server after changes

## 📚 Dependencies

- **express** — Web framework
- **mongoose** — MongoDB ODM
- **dotenv** — Environment configuration
- **cors** — Cross-origin resource sharing
- **nodemailer** — Email sending
- **fuse.js** — Fuzzy search for legal Q&A
- **nodemon** — Development auto-restart

## 🔄 Development Workflow

1. Make changes to code
2. Server auto-restarts (nodemon)
3. Test with Postman or frontend
4. Check console logs for errors
5. Iterate

## 📝 Next Steps

- [ ] Implement password hashing with bcrypt
- [ ] Add JWT authentication
- [ ] Create verification code expiry mechanism
- [ ] Add input validation middleware
- [ ] Implement rate limiting
- [ ] Add comprehensive error handling
- [ ] Write unit tests
- [ ] Add API documentation (Swagger)
- [ ] Implement logging system (Winston/Morgan)
- [ ] Add database indexing for performance
