// Card.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Card.css";

const Card = ({ id, title, description, image, date }) => {
  return (
    <div className="card">
      <img src={image} alt="Post Thumbnail" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-date">{date}</span>
          <Link to={`/post/${id}`} className="card-link">
            Read More <FaArrowRight className="card-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
