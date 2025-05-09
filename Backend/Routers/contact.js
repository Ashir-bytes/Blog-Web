const express = require('express');
const router = express.Router();
const db = require('../config/data');

// POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact message error:', err);
    res.status(500).json({ message: 'Failed to save message' });
  }
});

module.exports = router;
