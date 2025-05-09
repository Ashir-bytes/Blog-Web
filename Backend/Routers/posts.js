const express = require("express");
const db = require("../config/data");

const router = express.Router();

// Search route
router.get("/search", async (req, res) => {
  const searchTerm = req.query.query;

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  const sql = `
    SELECT * FROM posts
    WHERE title LIKE ? OR content LIKE ?
    ORDER BY created_at DESC
    LIMIT 20
  `;
  
  const likeTerm = `%${searchTerm}%`;

  try {
    const [results] = await db.query(sql, [likeTerm, likeTerm]);
    res.status(200).json(results);
  } catch (err) {
    console.error("Search query error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
