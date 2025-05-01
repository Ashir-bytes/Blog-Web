import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePage.css';

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date formatting options
  const dateOpts = {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false
  };

  useEffect(() => {
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
    fetchPost();
  }, [id]);

  if (loading) return <div className="loading">Loading…</div>;
  if (error)   return <div className="error-message">{error}</div>;
  if (!post)   return <div className="error-message">Post not found</div>;

  // Format dates
  const created = new Date(post.date).toLocaleString('en-US', dateOpts);
  const updated = new Date(post.updatedAt).toLocaleString('en-US', dateOpts);

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

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default SinglePage;
