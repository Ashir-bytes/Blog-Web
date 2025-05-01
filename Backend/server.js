const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/data.js');
const rankedRouter = require('./Routers/ranked.js');
const commentsRouter = require('./Routers/comments.js');
const userRoutes = require('./Routers/users.js');
require('dotenv').config();


const app = express();
// Allow only your frontend URL
const corsOptions = {
    origin: 'http://localhost:3001',  // Change this to match your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow necessary methods
    credentials: true,  // If you are using cookies or sessions, enable credentials
};
app.use(cors(corsOptions));
app.use(express.json());
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
//  User authentication routes
app.use('/api/users', userRoutes);
// Middleware to parse JSON bodies

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
