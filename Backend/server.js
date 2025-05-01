const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/data.js');
const rankedRouter  = require('./Routers/ranked.js');
const commentsRouter = require('./Routers/comments.js');


const app = express();
app.use(cors());
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Example API endpoint returning JSON
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  

  app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [postId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Post not found' });
      res.json(results[0]);
    });
  });
  

// Use the ranked router for fetching ranked posts
app.use('/api/posts/ranked', rankedRouter);
// Use the comments router for handling comments
app.use('/api/posts', commentsRouter);

// Middleware to parse JSON bodies

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
