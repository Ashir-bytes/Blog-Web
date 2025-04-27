import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodePanel from '../Components/CodePanel';
import './SinglePage.css';

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/posts.json');
        
        // Log the full response
        const text = await response.text();
        console.log('Response:', text);  // Log the response body to see what is returned
  
        if (!response.ok) {
          throw new Error('Post not found');
        }
  
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON response, but got something else');
        }
  
        const data = JSON.parse(text);  // Manually parse if response was text
        const post = data.posts.find((post) => post.id === parseInt(id));
        setPost(post);
      } catch (err) {
        console.error('Error fetching data:', err);  // Log detailed error for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPostData();
  }, [id]); // Re-fetch data when `id` changes
  

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="Postnot">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return <div className="Postnot">Post not found</div>;
  }

  return (
    <div className="single-post-page">
      <div className="post-header">
        <img src={post.image} alt={post.title} className="post-image" />
        <h1>{post.title}</h1>
        <p className="post-meta">
          <span className="author">{post.author}</span> | {post.date} | Updated on {post.updatedAt}
        </p>
        <p className="overview">{post.overview}</p>
      </div>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="code-snippet">
        <h2>Code Example:</h2>
        <CodePanel code={post.code} language={post.language} />
      </div>
    </div>
  );
};

export default SinglePage;
