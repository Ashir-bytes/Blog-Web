import React, { useEffect, useRef } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="about-container" ref={containerRef}>
        <div className="about-header fade-up">
          <h1>About Us</h1>
        </div>
        <div className="about-content fade-up">
          <p>
            Welcome to MyBlog! This blog is a place where we share insightful articles
            about web development, technology, and all things coding. Whether you're a
            beginner or an experienced developer, you'll find resources, tutorials, and
            stories to help you grow in your coding journey.
          </p>
          <p>
            Our mission is to create a community where developers can share knowledge,
            collaborate on projects, and keep learning. Join us as we explore the world of
            programming and tech!
          </p>
          <h3>Meet the Creator</h3>
        </div>
        <div className="creator-section fade-up">
          <div className="creator-image">
            <img
              src="https://avatars.githubusercontent.com/u/190104929?…00&u=87c6bcb6bdcca22a60aef241f312e786e6c919cd&v=4"
              alt="Creator"
              className="creator-img"
            />
          </div>
          <p>
            Hi, I'm Ashir, the creator of MyBlog. I'm passionate about full-stack
            development, and this blog is my way of sharing my experiences and helping
            others on their learning path. Feel free to reach out if you have any questions
            or need help!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
