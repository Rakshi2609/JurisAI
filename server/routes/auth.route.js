import express from 'express';
import User from '../models/ourmap.js';
import { generateVerificationCode } from '../utils/verification.js';
import { sendWelcomeEmail, sendVerificationCodeEmail } from '../utils/mailer.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        // Return message and user data as an object (include avatar fields)
        res.json({
          message: "Successful",
          user: {
            name: user.name,
            email: user.email,
            verified: Boolean(user.verified),
            avatar: user.avatar || null, // stored as filename on server
            avatarIndex: typeof user.avatarIndex === 'number' ? user.avatarIndex : null
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
      user: { name: user.name, email: user.email, avatar: user.avatar || null, avatarIndex: user.avatarIndex || null }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Generate a 6-digit verification code
router.post('/verification', async (req, res) => {
  try {
    const { email, verificationToken } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const code = generateVerificationCode();
    console.log(`Sending verification code ${code} to ${email}`);
    await User.updateOne({ email }, { verificationToken: code });
    if (!verificationToken || verificationToken !== code) {
      return res.status(400).json({ error: 'Invalid verification code.' });
    }
    if (verificationToken === code) {
      await User.updateOne({ email }, { verified: true });
    } else {
      return res.status(400).json({ error: 'The code is incorrect.' });
    }
    return res.status(200).json({ message: 'Verification code generated', email, code });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Send verification code email (separate from verification check)
router.post('/verification/send', async (req, res) => {
  try {
    const { email, name } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'No user exists with this email.' });

    const code = generateVerificationCode();
    // Persist the code on user document (no expiry field yet)
    await User.updateOne({ email }, { verificationToken: code, verified: false });

    await sendVerificationCodeEmail({ to: email, name: name || user.name || 'there', code });

    const payload = { message: 'Verification code email sent' };
    if (process.env.NODE_ENV !== 'production') payload.code = code; // helpful for dev/testing
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Confirm verification code
router.post('/verification/confirm', async (req, res) => {
  try {
    const { email, code } = req.body || {};
    if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'No user exists with this email.' });

    if (!user.verificationToken) {
      return res.status(400).json({ error: 'No verification code found. Please request a new code.' });
    }

    if (String(user.verificationToken) !== String(code)) {
      return res.status(400).json({ error: 'Invalid verification code.' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Send welcome email
router.post('/send-welcome', async (req, res) => {
  try {
    const { email, name } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required.' });
    await sendWelcomeEmail({ to: email, name: name || 'there' });
    return res.status(200).json({ message: 'Welcome email sent' });
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

// Update user profile (name/avatar)
// Accepts { email, name, avatar, avatarIndex }
router.patch('/user', async (req, res) => {
  try {
    const { email, name, avatar, avatarIndex } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required to update profile.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'No user found with this email.' });

    const updates = {};
    if (typeof name === 'string') updates.name = name;
    if (typeof avatar === 'string') updates.avatar = avatar;
    if (typeof avatarIndex === 'number') updates.avatarIndex = avatarIndex;

    // Only update if there's something to change
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update.' });
    }

    await User.updateOne({ email }, { $set: updates });
    const updated = await User.findOne({ email }).lean();

    // Return sanitized user object
    const payload = {
      name: updated.name,
      email: updated.email,
      verified: Boolean(updated.verified),
      avatar: updated.avatar || null,
      avatarIndex: typeof updated.avatarIndex === 'number' ? updated.avatarIndex : null
    };
    return res.status(200).json({ message: 'Profile updated', user: payload });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
