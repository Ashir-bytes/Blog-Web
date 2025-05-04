const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');

const db = require('./config/data.js');
const rankedRouter = require('./Routers/ranked.js');
const commentsRouter = require('./Routers/comments.js');
const userRoutes = require('./Routers/users.js');
const contact = require('./Routers/contact.js');
const posts = require('./Routers/posts.js');
const admin = require('./Routers/admin.js');
require('dotenv').config();


const app = express();
// Allow only your frontend URL
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

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
// use the contact router for handling contact form submissions
app.use('/api', contact);
// Use the posts router for handling posts
app.use("/api/posts", posts);
// Use the admin router for handling admin actions
app.use('/api/admin', admin);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
