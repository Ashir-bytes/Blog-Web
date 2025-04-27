import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import Card from '../Components/Card';
const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'Understanding React and Redux',
      excerpt: 'An introduction to React and Redux, how they work together, and why they are a powerful combination for building modern web apps.',
      image: 'https://source.unsplash.com/1600x900/?react,web',
      date: '2025-04-20',
    },
    {
      id: 2,
      title: 'A Beginner\'s Guide to Node.js',
      excerpt: 'Learn the basics of Node.js, a powerful JavaScript runtime built on Chrome’s V8 JavaScript engine, and how it can help build scalable server-side applications.',
      image: 'https://source.unsplash.com/1600x900/?nodejs,backend',
      date: '2025-04-19',
    },
    {
      id: 3,
      title: 'CSS Flexbox: A Practical Guide',
      excerpt: 'Master the art of building responsive layouts using CSS Flexbox, a layout model that makes it easy to design flexible, responsive page layouts.',
      image: 'https://source.unsplash.com/1600x900/?css,flexbox',
      date: '2025-04-18',
    },
    {
      id: 4,
      title: 'JavaScript ES6 Features You Should Know',
      excerpt: 'Dive into the new features of JavaScript introduced in ES6, such as arrow functions, classes, template literals, and more.',
      image: 'https://source.unsplash.com/1600x900/?javascript,es6',
      date: '2025-04-17',
    },
    {
      id: 5,
      title: 'Introduction to Web Accessibility',
      excerpt: 'Learn the importance of web accessibility and how to make websites inclusive and usable for all users, including those with disabilities.',
      image: 'https://source.unsplash.com/1600x900/?web,accessibility',
      date: '2025-04-16',
    },
    {
      id: 6,
      title: 'The Power of Serverless Architecture',
      excerpt: 'Explore serverless computing and how it enables developers to build applications without managing servers, improving scalability and cost-effectiveness.',
      image: 'https://source.unsplash.com/1600x900/?serverless,cloud',
      date: '2025-04-15',
    },
    {
      id: 7,
      title: 'Mastering Git and GitHub for Collaboration',
      excerpt: 'A comprehensive guide to Git and GitHub, two essential tools for version control and collaboration in software development.',
      image: 'https://source.unsplash.com/1600x900/?git,github',
      date: '2025-04-14',
    },
    {
      id: 8,
      title: 'Building RESTful APIs with Express.js',
      excerpt: 'Learn how to build scalable and efficient RESTful APIs using Express.js, a minimal web framework for Node.js.',
      image: 'https://source.unsplash.com/1600x900/?expressjs,api',
      date: '2025-04-13',
    },
    {
      id: 9,
      title: 'Getting Started with Docker for Developers',
      excerpt: 'An introduction to Docker, a platform that enables developers to create, deploy, and run applications in containers, improving consistency across environments.',
      image: 'https://source.unsplash.com/1600x900/?docker,devops',
      date: '2025-04-12',
    },
    {
      id: 10,
      title: 'Vue.js vs React: A Comparative Guide',
      excerpt: 'A comparison of Vue.js and React, two of the most popular front-end JavaScript frameworks, to help you decide which one to use for your next project.',
      image: 'https://source.unsplash.com/1600x900/?vuejs,react',
      date: '2025-04-11',
    },
    {
      id: 11,
      title: 'Learning Python for Data Science',
      excerpt: 'Learn the basics of Python and how it is used in data science for analyzing large datasets and building machine learning models.',
      image: 'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg',
      date: '2025-04-10',
    },
    {
      id: 12,
      title: 'CSS Grid vs Flexbox: Which One Should You Use?',
      excerpt: 'A detailed comparison of CSS Grid and Flexbox, and how to choose the right tool for building complex layouts.',
      image: 'https://images.pexels.com/photos/305233/pexels-photo-305233.jpeg',
      date: '2025-04-09',
    },
    {
      id: 13,
      title: 'Building Mobile Apps with React Native',
      excerpt: 'Learn how to build cross-platform mobile applications using React Native, a framework that allows you to build iOS and Android apps using JavaScript.',
      image: 'https://images.pexels.com/photos/3787317/pexels-photo-3787317.jpeg',
      date: '2025-04-08',
    },
    {
      id: 14,
      title: 'Introduction to Cloud Computing',
      excerpt: 'A beginner-friendly guide to cloud computing, covering the basics and the major cloud providers, including AWS, Azure, and Google Cloud.',
      image: 'https://images.pexels.com/photos/1181242/pexels-photo-1181242.jpeg',
      date: '2025-04-07',
    },
    {
      id: 15,
      title: 'The Importance of Web Security in 2023',
      excerpt: 'Learn the essential aspects of web security, including HTTPS, SSL certificates, and common threats like SQL injection and cross-site scripting (XSS).',
      image: 'https://images.pexels.com/photos/1181239/pexels-photo-1181239.jpeg',
      date: '2025-04-06',
    }
  ];
  
  
  

  return (
    <>
      
      <div className="blog-container">
        <h1 className="blog-title">Latest Posts</h1>
        <div className="blog-posts">
          {posts.map((post) => (
            <Card id={"/post/"+post.id} title={post.title} excerpt={post.excerpt} image={post.image} key={post.id} date={post.date}/>
          ))}
        </div>
      </div>
    </>
  )
};

export default BlogPage;
