// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/ourmap')

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
const mongoURI = 'mongodb+srv://rakshithganjimut:oKyTPHX4BZrr8oaB@cluster0.bv5tnus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
// app.post('/register',(req,res) => {
//     User.create(req.body)
//     .then(e=> res.json(e))
//     .catch(err => res.json(err))
// })
// app.post('/login',(req,res) => {
//     const {email,password} = req.body;
//     User.findOne({email:email})
//     .then(user => {
//         if(user){
//             if(user.password === password){
//                 res.json("Successful")
//             }else{
//                 res.json("the password is incorrect")
//             }
//         }else{
//             res.json("No user exits")
//         }
//     })
// })
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



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

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