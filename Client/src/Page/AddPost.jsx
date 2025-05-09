import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("");
  const [type, setType] = useState("General");
  const [hashtags, setHashtags] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !author || !image || !readTime || !type || !hashtags) {
      setError("Please fill in all fields.");
      return;
    }

    const newPost = {
      title,
      excerpt,
      content,
      author,
      image,
      readTime,
      type,
      hashtags: hashtags.split(",").map(tag => tag.trim()),
      likes,
      dislikes,
      comments,
      date: new Date().toISOString(),
    };

    axios.post("http://localhost:3000/api/admin/posts", newPost)
      .then(() => {
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Error adding post:", err);
        setError("Failed to add post.");
      });
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="add-post">
      <h1>Add New Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} required name="title"/>

        <label>Excerpt</label>
        <input type="text" value={excerpt} onChange={(e) => handleChange(e, setExcerpt)} required name="excerpt"/>

        <label>Content</label>
        <textarea value={content} onChange={(e) => handleChange(e, setContent)} rows="10" required name="content"/>

        <label>Author</label>
        <input type="text" value={author} onChange={(e) => handleChange(e, setAuthor)} required name="author"/>

        <label>Image URL</label>
        <input type="text" value={image} onChange={(e) => handleChange(e, setImage)} required name="image"/>

        <label>Read Time (e.g. 5 min)</label>
        <input type="text" value={readTime} onChange={(e) => handleChange(e, setReadTime)} required  name="readTime"/>

        <label>Type (e.g. Tutorial, News)</label>
        <input type="text" value={type} onChange={(e) => handleChange(e, setType)}  name="type" />

        <label>Hashtags (comma separated)</label>
        <input type="text" value={hashtags} onChange={(e) => handleChange(e, setHashtags)} required  name="hashtags"/>

        <label>Likes</label>
        <input type="number" value={likes} onChange={(e) => handleChange(e, setLikes)} min="0" name="likes"/>

        <label>Dislikes</label>
        <input type="number" value={dislikes} onChange={(e) => handleChange(e, setDislikes)} min="0"  name="dislikes"/>

        <label>Comments</label>
        <input type="number" value={comments} onChange={(e) => handleChange(e, setComments)} min="0"  name="comments"/>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
