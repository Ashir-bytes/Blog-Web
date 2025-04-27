    import React from "react";
    import "./PostPage.css";

    const PostPage = () => {
    return (
        <div className="post-page-container">
        <div className="post-header">
            <h1 className="post-title">The Future of Web Development</h1>
            <div className="post-meta">
            <span className="author">By John Doe</span> | 
            <span className="date">April 27, 2025</span>
            </div>
        </div>

        <div className="post-content">
            <p>
            Web development has seen significant changes over the past decade. The industry has shifted from
            monolithic applications to modern, microservices-based architectures. With the rise of serverless
            computing and the ever-increasing power of JavaScript, developers have more tools at their disposal
            than ever before.
            </p>
            <p>
            The future of web development looks bright, with a focus on progressive web apps (PWAs), WebAssembly,
            and frameworks like React and Vue.js. These advancements will allow for faster, more efficient web
            experiences, particularly on mobile devices.
            </p>
            <p>
            As the web continues to evolve, developers must stay up-to-date with the latest trends and tools.
            Continuous learning and adaptation will be key to remaining competitive in the field of web development.
            </p>
        </div>

        <div className="comment-section">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment..." className="comment-input"></textarea>
            <button className="comment-button">Post Comment</button>
        </div>
        </div>
    );
    };

    export default PostPage;
