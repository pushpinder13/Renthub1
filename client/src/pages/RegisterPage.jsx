import React, { useState } from 'react';
import "../styles/Register.scss";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate(); 

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // FormData for file uploads
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login"); 
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration failed:", err.message);
      alert("An error occurred: " + err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
          <input
            placeholder='Confirm Password'
            name='confirmPassword'
            type='password'
            value={confirmPassword}  
            onChange={(e) => setConfirmPassword(e.target.value)}  
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <button type="submit">REGISTER</button>
          <a href="/login">Already have an account? Login here</a>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
