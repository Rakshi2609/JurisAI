// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // Import fs module for reading files
const path = require('path'); // Import path module for file paths
const Fuse = require('fuse.js'); // Import Fuse.js
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/ourmap')

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
const mongoURI = 'mongodb+srv://rakshithganjimut:oKyTPHX4BZrr8oaB@cluster0.bv5tnus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Load legal dataset and initialize Fuse.js
let legalDataset = { questions: [] };
let fuse = null;

try {
    const legalDatasetPath = path.join(__dirname, '..', 'client', 'public', 'legalDataset.json');
    const rawData = fs.readFileSync(legalDatasetPath);
    legalDataset = JSON.parse(rawData);

    const options = {
        keys: ["question", "scenarios"],
        includeScore: true,
        threshold: 0.4,
    };
    fuse = new Fuse(legalDataset.questions, options);
    console.log('✅ Legal dataset loaded and Fuse.js initialized');
} catch (error) {
    console.error('❌ Failed to load legal dataset or initialize Fuse.js:', error);
}


app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        // Return message and user data as an object
        res.json({
          message: "Successful",
          user: {
            name: user.name,
            email: user.email
          }
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "No user exists" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
module.exports = app;