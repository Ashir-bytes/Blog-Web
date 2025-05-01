const express = require('express');
const router = express.Router();
const db = require('../config/data.js'); // Adjust path to your DB connection

// Get top 3 ranked posts
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY ranked DESC LIMIT 3';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
