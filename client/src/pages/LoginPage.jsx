import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to login the user
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email, password }) 
      });

      const loggedIn = await response.json(); 

      if (response.ok) { 
        alert("Login successful!");  
        dispatch( 
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      } else {
        alert(loggedIn.message || "Login failed. Invalid credentials.");
        setEmail("");  
        setPassword("");  
      }
    } catch (err) {
      // Handle error (network issue or other)
      console.log("Login Failed", err.message);
      alert("An error occurred: " + err.message);  
      setEmail("");  
      setPassword(""); 
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
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
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
