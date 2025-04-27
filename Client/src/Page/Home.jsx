import React from 'react';
import './Home.css';
import Card from '../Components/Card';
import Question from '../Components/Question';

function Home() {
  return (
    <div className="home-container">

      {/* Featured Posts Section */}
      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="card-container">
          <Card id={1} title="How to Build a Blog" content="Learn how to create your own blog from scratch using React and Node.js." image={"https://images.unsplash.com/photo-1644916056046-d6bfff3d4d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SG93JTIwdG8lMjBCdWlsZCUyMGElMjBCbG9nfGVufDB8fDB8fHww"}  date={"5/10/2024"}/>

          <Card id={2} title="JavaScript ES6 Features" content="Explore the latest features in JavaScript ES6 to improve your coding skills." image={"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SmF2YVNjcmlwdCUyMEVTNnxlbnwwfHwwfHx8MA%3D%3D"} date={"20/02/2000"} />

          <Card id={3} title="Web Design Tips" content="Essential tips to improve the design of your websites and enhance user experience." image={"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww"}  date={"5/05/2021"}/>
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
