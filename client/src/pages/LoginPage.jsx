// import React, { useState } from 'react';
// import "../styles/Login.scss";
// import { setLogin } from '../redux/state';
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       })
//       const loggedIn = await response.json()
//       if (loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token

//           })
//         )
//         navigate("/")

//       }
//     }
//     catch (err) {
//       console.log("Login Failed", err.message);

//     }
//   }
//   return (
//     <div className='login'>
//       <div className='login_content'>
//         <form className="login_content_form " onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder='Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder='Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type='submit'>LOG IN</button>
//           <a href="/register">Don't have an account? Sign In Here</a>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState, useEffect } from 'react';
// import "../styles/Login.scss";
// import { setLogin } from '../redux/state';
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redirect to home if user is already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       navigate("/"); // or redirect to a protected page like "/dashboard"
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Sending login request
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
      
//       // Check if login is successful
//       if (response.ok) {
//         // Store JWT token in localStorage for persistence
//         localStorage.setItem("authToken", data.token);

//         // Dispatch the user and token to Redux state
//         dispatch(
//           setLogin({
//             user: data.user,
//             token: data.token,
//           })
//         );

//         // Redirect to home or dashboard
//         navigate("/");
//       } else {
//         // If login fails, show the error message
//         console.log(data.message); // You can display this message to the user
//       }
//     } catch (err) {
//       console.log("Login Failed", err.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//           <a href="/register">Don't have an account? Sign In Here</a>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
        toast.success("Login successful!");  // Show success toast notification
        dispatch( // Dispatch login action to Redux
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");  // Navigate to home page after login
      } else {
        // Show error toast notification if login fails
        toast.error(loggedIn.message || "Login failed. Invalid credentials.");
      }
    } catch (err) {
      // Handle error (network issue or other)
      console.log("Login Failed", err.message);
      toast.error("An error occurred: " + err.message);  // Show error toast for any other issues
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

      {/* ToastContainer renders the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
