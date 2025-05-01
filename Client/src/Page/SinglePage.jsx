import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePage.css';

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  // Date formatting options
  const dateOpts = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  // Move fetchPost function to top-level inside SinglePage component
  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/posts/${id}`);
      if (!res.ok) throw new Error('Post not found');
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="error-message">Post not found</div>;

  // Format dates
  const created = new Date(post.date).toLocaleString('en-US', dateOpts);
  const updated = new Date(post.updatedAt).toLocaleString('en-US', dateOpts);

  const handleLike = async () => {
    await fetch(`http://localhost:3000/api/posts/${id}/like`, { method: 'POST' });
    setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
  };


  const handleDislike = async () => {
    await fetch(`http://localhost:3000/api/posts/${id}/dislike`, { method: 'POST' });
    setPost(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
  };

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const handleAddComment = async () => {
    await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: commentInput })
    });
    setCommentInput('');
    fetchComments();
  };


  // Run once when component mounts / id changes
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);
 




  return (
    <div className="single-post-page">
      <div className="post-header">
        <img src={post.image} alt={post.title} className="post-image" />
        <h1>{post.title}</h1>
        <p className="post-meta">
          <span className="author">{post.author}</span> | {created} | Updated on {updated}
        </p>
        <p className="overview">{post.overview}</p>
      </div>

      <div className="like-dislike-buttons">
        <button onClick={handleLike}>👍 {post.likes}</button>
        <button onClick={handleDislike}>👎 {post.dislikes}</button>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>

        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment…"
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default SinglePage;