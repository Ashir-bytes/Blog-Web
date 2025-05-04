import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();  // ← replaced useHistory

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !content || !image) {
      setError("Please fill in all fields.");
      return;
    }

    const newPost = {
      title,
      author,
      content,
      image,
      likes,
      date: new Date().toISOString(),
    };

    axios
      .post("http://localhost:3000/api/admin/posts", newPost)
      .then(() => {
        navigate("/admin");  // ← useNavigate for redirect
      })
      .catch((err) => {
        console.error("Error adding post:", err);
        setError("Failed to add post.");
      });
  };

  return (
    <div className="add-post">
      <h1>Add New Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Likes</label>
        <input
          type="number"
          value={likes}
          onChange={(e) => setLikes(Number(e.target.value))}
        />

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
