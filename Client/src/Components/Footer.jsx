/* Footer.jsx */
import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <h2>BlogBytes</h2>
        <p>© 2025 MyBlog. All Rights Reserved.</p>
      </div>
      <nav className="footer-nav">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <div className="footer-social">
        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
