const express = require('express');
const router = express.Router();
const db = require('../config/data.js');

// Get top ranked posts (limit configurable via query param)
router.get('/top', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM posts ORDER BY date ASC LIMIT 3');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
