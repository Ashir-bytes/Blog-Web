import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState({ title: '', author: '', content: '', image: '', likes: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.author || !post.content || !post.image) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/admin/${id}`, post);
      navigate(`/posts/${id}`); // Redirect to the post detail page
    } catch (err) {
      setError('Failed to update post');
      console.error(err.message);
    }
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <label>Author</label>
        <input
          type="text"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />

        <label>Content</label>
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows={15}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={post.image}
          onChange={(e) => setPost({ ...post, image: e.target.value })}
        />

        {post.image && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={post.image} alt="Preview" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          </div>
        )}

        <label>Likes</label>
        <input
          type="number"
          value={post.likes}
          onChange={(e) => setPost({ ...post, likes: Number(e.target.value) })}
        />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
