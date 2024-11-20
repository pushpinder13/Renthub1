import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Managing email input
  const [password, setPassword] = useState(""); // Managing password input

  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation hook from react-router-dom

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make an API call to login the user
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST", // POST request to login
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
        },
        body: JSON.stringify({ email, password }) // Send email and password in body
      });

      const loggedIn = await response.json(); // Get response as JSON

      if (response.ok) { // If login is successful
        alert("Login successful!");  // Show success alert
        dispatch( // Dispatch login action to Redux
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");  // Navigate to home page after login
      } else {
        // Show error alert if login fails and clear the form
        alert(loggedIn.message || "Login failed. Invalid credentials.");
        setEmail("");  // Clear the email input
        setPassword("");  // Clear the password input
      }
    } catch (err) {
      // Handle error (network issue or other)
      console.log("Login Failed", err.message);
      alert("An error occurred: " + err.message);  // Show error alert for any other issues
      setEmail("");  // Clear the email input
      setPassword("");  // Clear the password input
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
          <button type="submit">LOG IN</button>
          <a href="/register">Don't have an account? Sign Up Here</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
