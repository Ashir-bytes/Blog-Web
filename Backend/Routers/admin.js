// backend/routes/adminRoutes.js
const express = require('express');
const db      = require('../config/data');   // now promise‐based pool
const router  = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, title, author, date, likes, dislikes, comments 
       FROM posts 
       ORDER BY date DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching admin posts:", err);
    res.status(500).json({
      message: "Failed to fetch posts",
      error: err.message
    });
  }
});




// Add new post
router.post('/posts', async (req, res) => {
  const { title, author, content, image, likes, date } = req.body;

  const sql = `
    INSERT INTO posts (title, author, content, image, likes, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(sql, [title, author, content, image, likes, date]);
    res.status(201).json({
      message: 'Post added successfully',
      postId: result.insertId
    });
  } catch (err) {
    console.error('Error inserting post:', err);
    res.status(500).json({
      message: 'Failed to add post',
      error: err.message
    });
  }
});

module.exports = router;
