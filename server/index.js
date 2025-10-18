// index.js (ESM)
import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path, { dirname } from 'path';
import Fuse from 'fuse.js';
import { fileURLToPath } from 'url';

import User from './models/ourmap.js';
import authRoutes from './routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jurisai';
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Load legal dataset and initialize Fuse.js
let legalDataset = { questions: [] };
let fuse = null;

try {
  // __dirname replacement for ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const legalDatasetPath = path.join(__dirname, '..', 'client', 'public', 'legalDataset.json');
  const rawData = fs.readFileSync(legalDatasetPath, 'utf8');
  legalDataset = JSON.parse(rawData);

  const options = {
    keys: ['question', 'scenarios'],
    includeScore: true,
    threshold: 0.4,
  };
  fuse = new Fuse(legalDataset.questions, options);
  console.log('✅ Legal dataset loaded and Fuse.js initialized');
} catch (error) {
    console.error('❌ Failed to load legal dataset or initialize Fuse.js:', error);
}


app.use('/api', authRoutes);
  

// Chatbot API endpoint
app.post('/api/chatbot', (req, res) => {
    const { message } = req.body;

    if (!fuse) {
        return res.status(500).json({ error: "Chatbot is not ready yet." });
    }

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Invalid message format." });
    }

    const lowerCaseMessage = message.trim().toLowerCase();
    const results = fuse.search(lowerCaseMessage);

    if (results.length === 0) {
        return res.json({ response: "Sorry, I couldn't find an answer to your question." });
    }

    const bestMatch = results[0].item;
    let botReply = bestMatch.answer;

    if (bestMatch.laws?.length) {
        botReply += `<br><strong>Relevant Laws:</strong> ${bestMatch.laws.join(", ")}`;
    }

    if (bestMatch.scenarios?.length) {
        botReply += `<br><strong>Example Cases:</strong><br> - ${bestMatch.scenarios.join("<br> - ")}`;
    }

    res.json({ response: botReply });
});


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Example of a simple user route
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // Here you would typically save the user to the database
  res.status(201).json({ message: 'User created successfully', user: { name, email } });
});
// const PORT = process.env.PORT || 5000;?
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for serverless/Vercel and local bootstrap in dev.js
// export default app;