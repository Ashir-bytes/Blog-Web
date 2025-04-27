import React, { useState } from "react";
import "./Singup.css"; // Ensure the path is correct

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To handle any errors
  const [successMessage, setSuccessMessage] = useState(""); // To show success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form inputs (basic example)
    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Sending the form data to the backend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Sign Up Successful");
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage(data.message); // Show backend error message
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>

      {/* Displaying messages */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
