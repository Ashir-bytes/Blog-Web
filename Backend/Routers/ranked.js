const express = require('express');
const router = express.Router();
const db = require('../config/data.js');

// Get top ranked posts (limit configurable via query param)
router.get('/top', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY date ASC LIMIT 3';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });


module.exports = router;
