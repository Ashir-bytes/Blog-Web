const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/data');
const verifyToken = require('../Middleware/authMiddleware');
require('dotenv').config();  // To load the secret key from .env



const router = express.Router();



router.use(express.json());

// Middleware to parse JSON bodies
// Middleware to handle CORS
// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserSql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(insertUserSql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error creating user' });
            }

            // Create a JWT token for the user
            const payload = { id: result.insertId, username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            // Respond with the token
            res.status(201).json({ message: 'User registered successfully!', token });
        });
    });
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Query to find user by email
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.promise().query(sql, [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = results[0];

        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Send the token and user data (without password) as response
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            token: token
        };

        res.json({ message: 'Login successful', user: userResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



// Route to fetch user profile using JWT token
router.get('/me', verifyToken, async (req, res) => {
    console.log('Decoded token payload:', req.user); // 👈 check this
  
    try {
      const sql = 'SELECT id, username, email, createdAt FROM users WHERE id = ?';
      const [results] = await db.promise().query(sql, [req.user.id]);
  
      if (results.length === 0)
        return res.status(404).json({ message: 'User not found' });
  
      const profileData = {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
        createdAt: results[0].createdAt,
      };
  
      res.json(profileData);
    } catch (err) {
      console.error('Error in /me route:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


module.exports = router;
