const express = require('express');
const router = express.Router();
const db = require('../config/data.js');

// Like a post
router.post('/:id/like', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post liked!' });
  });
});

// Dislike a post
router.post('/:id/dislike', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post disliked!' });
  });
});

// Get comments for a post
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a comment
router.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const sql = 'INSERT INTO comments (post_id, content) VALUES (?, ?)';
  db.query(sql, [id, content], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Comment added!' });
  });
});

module.exports = router;
