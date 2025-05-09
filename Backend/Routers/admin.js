// backend/routes/adminRoutes.js
const express = require('express');
const db = require('../config/data');   // now promise‐based pool
const slugify = require('slugify'); // You can install slugify via npm
const shortid = require('shortid');
const router = express.Router();

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


// GET specific post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM posts WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch post' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(results[0]);
  });
});



// Add new post
router.post('/posts', async (req, res) => {
  // Get current date if not provided
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');  // Fixing the date format
  
  const {
    title,
    excerpt,
    content,
    author,
    image,
    type,
    hashtags,
    likes,
    dislikes,
    comments,
  } = req.body;

  // Ensure comments is a valid JSON, default to empty array if not provided
  const commentsJson = comments ? JSON.stringify(comments) : '[]';

  // Generate a slug from the title
  const slug = slugify(title, { lower: true });

  // Shorten the image URL (just an example, you need a real URL shortening logic)
  const longImageUrl = image; // Assuming image is a long URL
  const shortUrl = shortid.generate();  // Generating a short ID (you might want to integrate a real URL shortener service)

  // Basic validation for required fields
  if (!title || !excerpt || !content || !author || !formattedDate || !slug) {
    return res.status(400).json({
      message: 'Title, excerpt, content, author, date, and slug are required fields.',
    });
  }

  const sql = `
    INSERT INTO posts (title, excerpt, content, author, date, image, shortUrl, type, hashtags, likes, dislikes, comments, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(sql, [
      title,
      excerpt,
      content,
      author,
      formattedDate,
      longImageUrl,  // Store the original image URL
      shortUrl,      // Store the short URL for the image (or other use)
      type || 'general',
      hashtags || '',
      likes || 0,
      dislikes || 0,
      commentsJson,  // Pass the comments as JSON string
      slug,          // Insert the generated slug here
    ]);

    res.status(201).json({
      message: 'Post added successfully',
      postId: result.insertId,
    });
  } catch (err) {
    console.error('Error inserting post:', err);

    res.status(500).json({
      message: 'Failed to add post',
      error: err.message,
      stack: err.stack,
    });
  }
});




// PUT (update) a specific post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, content, image, likes } = req.body;

  if (!title || !author || !content || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE posts SET title = ?, author = ?, content = ?, image = ?, likes = ? WHERE id = ?';

  db.query(sql, [title, author, content, image, likes, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update post' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  });
});


// DELETE a specific post
router.delete('/:id', (req, res) => {
  const postId = req.params.id;

  // SQL query to delete post by ID
  const query = 'DELETE FROM posts WHERE id = ?';

  db.query(query, [postId], (err, result) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ error: 'Failed to delete post' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  });
});

module.exports = router;
