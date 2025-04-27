import React, { useState } from "react";
import "./Login.css"; // Add your CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // To handle success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form inputs (basic validation)
    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send the email and password to the backend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Login Successful");
        setErrorMessage(""); // Clear any error message
        // You can store the login status in localStorage or cookies here, if needed
      } else {
        setErrorMessage(data.message); // Show the error message from the backend
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
