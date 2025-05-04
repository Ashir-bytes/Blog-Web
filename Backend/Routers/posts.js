const express = require("express");
const db = require("../config/data");

const router = express.Router();


// Search route
router.get("/search", (req, res) => {
  const searchTerm = req.query.query;  // Getting search term from query params
  
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  // SQL query to search for posts by title or content
  const sql = `
    SELECT * FROM posts
    WHERE title LIKE ? OR content LIKE ?
    ORDER BY created_at DESC
    LIMIT 20
  `;
  
  const likeTerm = `%${searchTerm}%`;  // Adding % for partial matching

  db.query(sql, [likeTerm, likeTerm], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Send the results as JSON
    res.status(200).json(results);
  });
});

module.exports = router;
