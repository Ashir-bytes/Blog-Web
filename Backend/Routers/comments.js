const express = require('express');
const router = express.Router();
const db = require('../config/data.js');

// Like a post
router.post('/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id]);
    res.json({ message: 'Post liked!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dislike a post
router.post('/:id/dislike', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?', [id]);
    res.json({ message: 'Post disliked!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC',
      [id]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment
router.post('/api/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    await db.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [id, content]);
    res.json({ message: 'Comment added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
