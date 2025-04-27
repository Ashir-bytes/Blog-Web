import React, { useState } from "react";
import "./Question.css";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="question-container">
      <h2 className="question-title">Ask Us Anything</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="question-form">
          <textarea
            placeholder="Your question..."
            value={question}
            onChange={handleChange}
            className="question-input"
            rows="5"
          ></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="thank-you-message">
          <p>Your question has been submitted! We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
};

export default Question;
