
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.scss";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);

//   useEffect(() => {
//     setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
//   }, [formData.password, formData.confirmPassword]);

//   const navigate = useNavigate(); // Ensure this is called as a function

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: name === "profileImage" ? files[0] : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!passwordMatch) {
//       return;
//     }

//     try {
//       const register_form = new FormData();

//       for (const key in formData) {
//         if (formData[key] !== null && formData[key] !== undefined) {
//           register_form.append(key, formData[key]);
//         }
//       }

//       const response = await fetch("http://localhost:3001/auth/register", {
//         method: "POST",
//         body: register_form
//       });

//       if (response.ok) {
//         // Redirect to login page
//         navigate("/login");
//       } else {
//         console.log("Registration failed");
//       }
//     } catch (err) {
//       console.log("Registration failed", err.message);
//     }
//   };

//   return (
//     <div className='register'>
//       <div className='register_content'>
//         <form className='register_content_form' onSubmit={handleSubmit}>
//           <input
//             placeholder='First Name'
//             name='firstName'
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Last Name'
//             name='lastName'
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Email'
//             name='email'
//             type='email'
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Password'
//             name='password'
//             type='password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Confirm Password'
//             name='confirmPassword'
//             type='password'
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           {!passwordMatch && (
//             <p style={{ color: "red" }}>Passwords do not match</p>
//           )}
//           <input
//             id='image'
//             type="file"
//             name='profileImage'
//             accept='image/*'
//             style={{ display: 'none' }}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor='image'>
//             <img src="/assets/addImage.png" alt="add profile photo" />
//             <p>Upload your Photo</p>
//           </label>
//           {formData.profileImage && (
//             <img src={URL.createObjectURL(formData.profileImage)}
//               alt="profile photo"
//               style={{ maxWidth: "80px" }} />
//           )}
//           <button type='submit' disabled={!passwordMatch}>REGISTER</button>
//         </form>
//         <a href="/login">Already have an Account? Log In Here</a>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from 'react';
import "../styles/Register.scss";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {  // If registration is successful
        toast.success("Registration successful!");  // Show success toast
        navigate("/login");  // Navigate to login page
      } else {
        toast.error(data.message || "Registration failed. Please try again.");  // Show error toast
      }
    } catch (err) {
      console.log("Registration Failed", err.message);
      toast.error("An error occurred: " + err.message);  // Show general error toast
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
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <button type="submit">REGISTER</button>
          <a href="/login">Already have an account? Login here</a>
        </form>
      </div>

      {/* ToastContainer renders the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
