import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const POSTS_PER_PAGE = 5;  // adjust as needed

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all posts
  const fetchPosts = () => {
    axios.get("http://localhost:3000/api/admin/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error fetching posts:", err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:3000/api/admin/posts/${id}`)
        .then(() => {
          fetchPosts();
          if (activeId === id) setActiveId(null);
        })
        .catch(err => console.error("Delete error:", err));
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    setActiveId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-dashboard">
      <h1>📝 Blog Admin Panel</h1>

      <div className="admin-actions">
        <Link to="/admin/add" className="add-post-btn">+ Add New Post</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.length > 0 ? paginatedPosts.map(post => (
            <tr
              key={post.id}
              className={post.id === activeId ? "active-row" : ""}
              onClick={() => setActiveId(post.id)}
            >
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
              <td>{post.likes}</td>
              <td className="action-buttons">
                <Link to={`/admin/edit/${post.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5">No posts found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "active-page" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
