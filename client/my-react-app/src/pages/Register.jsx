// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import '../Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons
import axiosBase from '../axiosconfig';
import logo from '../../public/images/logo.png.webp'; // Import the logo image


function Register() {
  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const profileImageDom = useRef(null);  // New ref for profile image

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);  // State to manage loading
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userNameDom.current.value);
    formData.append('firstname', firstNameDom.current.value);
    formData.append('lastname', lastNameDom.current.value);
    formData.append('email', emailDom.current.value);
    formData.append('password', passwordDom.current.value);
    formData.append('profileImage', profileImageDom.current.files[0]);  // Add the profile image file

    try {
      await axiosBase.post('/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Register successfully. Please log in.');
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.msg || "Something went wrong");
    }finally {
      setLoading(false); // Stop loading after the request is completed
    }
  }
  console.log('Axios base URL:', axiosBase.defaults.baseURL);

console.log(import.meta.env.VITE_BACKEND_URL);





  return (
     <body>     
    <div className="register-container">
       <img src={logo} alt="Logo" className="logo" /> {/* Logo element */}  
        <h2>Welcome 
          <span> to </span>
          Baaji Tech Q & A <br />
          Create Account
        </h2>
      <form onSubmit={handleSubmit} className="register-form">        
        <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input className='registername'
            ref={firstNameDom}
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input className='registername'
            ref={lastNameDom}
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className='registername'
            ref={userNameDom}
            type="text"
            id="name"
            placeholder="User Name"
            required
          />
        </div>
        <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            ref={emailDom}
            type="email"
            id="email"
            placeholder="user@gmail.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              ref={passwordDom}
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              placeholder="*************"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{ borderRadius: '155px', /* Rounded corners */
                 border: 'none', cursor: 'pointer', marginLeft: '5px' }}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        </div>
        <div className="form-row">
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input className='profilePic'
            ref={profileImageDom}
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            required
          />
        </div>
        </div>
        <button 
  type="submit" 
  className={`submit-button ${loading ? 'loading' : ''}`} 
  disabled={loading}
>
  {loading ? 'Loading...' : 'Sign Up'}
</button>

        <div className="link">
          <Link to="/login">Already Registered? Login</Link>
        </div>
      </form>
    </div>
    </body>
  );
}

export default Register;
