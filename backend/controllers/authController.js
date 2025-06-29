const User = require('../models/User'); // or '../models/User' based on actual file name
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt'); // ✅ Make sure this file exists

// Signup handler (already working)
const signup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const newUser = await User.create(email, password);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// ✅ New: Login handler
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ token });
};

module.exports = { signup, login };
