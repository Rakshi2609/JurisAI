import express from 'express';
import User from '../models/ourmap.js';
import { generateVerificationCode } from '../utils/verification.js';

const router = express.Router();

router.post('/login', async (req, res) => {
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

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const user = await User.create({ name, email, password });
    // Keep status 200 to match current frontend expectation
    return res.status(200).json({
      message: 'Signup successful',
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Generate a 6-digit verification code
router.post('/verification', async (req, res) => {
  try {
    const { email, verificationToken} = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const code = generateVerificationCode();
    console.log(`Sending verification code ${code} to ${email}`);
    await User.updateOne({ email }, { verificationToken: code });
    if (!verificationToken || verificationToken !== code) {
      return res.status(400).json({ error: 'Invalid verification code.' });
    }
    if(verificationToken === code){
      await User.updateOne({ email }, { verified: true });
    }else{
        return res.status(400).json({ error: 'The code is incorrect.' });
    }
    return res.status(200).json({ message: 'Verification code generated', email, code });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// router.post('/verification',async(req, res)=>{
//    const { email } = req.body;

//    if (!email) {
//        return res.status(400).json({ error: 'Email is required.' });
//    }

//    const verificationCode = generateVerificationCode();
//    console.log(`Sending verification code ${verificationCode} to ${email}`);

//    return res.status(200).json({ message: 'Verification email sent successfully.' });
// });
export default router;
