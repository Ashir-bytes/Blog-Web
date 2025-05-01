import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to MyBlog</h1>
        <p className="hero-description">
          Explore amazing posts on technology, design, and development. Join our community and stay updated!
        </p>
        <Link to={"/posts"} className="cta-button">Get Started</Link>
      </div>
    </section>
  )
}

export default Hero