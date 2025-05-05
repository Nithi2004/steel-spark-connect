import express, { Request, Response, NextFunction, Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

// Register user
router.post('/register', async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !password || !mobile) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Type assertion for error handling
    const error = err as Error;
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' });
  }
});

// Login user
router.post('/login', async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || 'your_secret_key', 
      { expiresIn: '1h' }
    );

    // Send response with token and user details
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (err) {
    // Type assertion for error handling
    const error = err as Error;
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' });
  }
});

export default router;