import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Optionally handle search logic here
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">MyBlog</Link> {/* Linking to home page */}
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/posts" className="navbar-link">
          Posts
        </Link>
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>

        {/* Sign Up and Login links */}
        
        <Link to="/login" className="navbar-link">
          Login
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
