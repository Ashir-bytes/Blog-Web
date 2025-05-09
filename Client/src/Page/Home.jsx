import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '../Components/Card';
import Question from '../Components/Question';
import Hero from '../Components/Hero';

function Home() {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts/ranked/top');
        if (!response.ok) {
          throw new Error('Failed to fetch top posts');
        }
        const data = await response.json();
        setTopPosts(data);
        setLoading(false);
      } catch (err) {
        setError('There was an issue loading the top posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  return (
    <div className="home-container">
      <Hero />

      {/* Featured Posts Section */}
      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="card-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : topPosts.length > 0 ? (
            topPosts.map((post) => (
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.excerpt}
                image={post.image}
                date={<p>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Me</h2>
        <p>Hi, I'm Ashir. I'm passionate about full-stack development and share my experiences through this blog. Feel free to reach out if you have any questions!</p>
      </section>

      <Question />
    </div>
  );
}

export default Home;
