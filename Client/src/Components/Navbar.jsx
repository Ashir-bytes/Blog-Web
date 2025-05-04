import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Optionally clear previous search results
    if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term!");
      return;
    }

    // Clear previous search results before new search
    setSearchResults([]);
    setLoading(true);

    fetch(`http://localhost:5000/api/posts/search?query=${searchTerm}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching search results. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner
        setSearchTerm("");  // Optionally clear search term after search
      });
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/posts" className="navbar-link">Posts</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        <Link to="/signup" className="navbar-link">Sign up</Link>
        <Link to="/login" className="navbar-link">Login</Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          {/* Loading Spinner */}
          {loading && <div className="loading-spinner">Loading...</div>}

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div className="search-results">
              {searchResults.map((result) => (
                <Link to={`/posts/${result._id}`} key={result._id} className="search-result-item">
                  {result.title}
                </Link>
              ))}
            </div>
          ) : (
            !loading && <div></div>
          )}
        </div>

        <div className="user-icon">
          <Link to="/profile">
            <FaUserCircle size={30} />
          </Link>
        </div>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
