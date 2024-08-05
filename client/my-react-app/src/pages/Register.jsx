// // // eslint-disable-next-line no-unused-vars
// // import React, { useRef } from 'react';
// // import '../Register.css';
// // import axios from '../axiosconfig'
// // import { Link, useNavigate } from 'react-router-dom';

// // function Register() {
// //   const navigate = useNavigate();
  
// // const userNameDom =useRef(null)
// // const firstNameDom =useRef(null)
// // const lastNameDom =useRef(null)
// // const emailDom =useRef(null)
// // const passwordDom =useRef(null) 


// //   async function handleSubmit(e) {
  
// //     e.preventDefault();
// //     const usernamevalue = userNameDom.current.value
// //     const firstnamevalue = firstNameDom.current.value
// //     const lastnamevalue = lastNameDom.current.value
// //     const emailvalue = emailDom.current.value
// //     const passvalue = passwordDom.current.value
// //     if( !usernamevalue || !firstnamevalue || !lastnamevalue || !emailvalue || !passvalue){
// //     alert("fill the provide filed")
// //     return
// //     }

// //   try {
// //   await axios.post('/user/register', { 
// //      username: usernamevalue,
// //      firstname: firstnamevalue, 
// //      lastname: lastnamevalue,
// //      email: emailvalue,
// //      password: passvalue
// //     })
// //     alert('register succesfully. login')
// //   navigate('/login')
// // } catch (error) {
// //   alert(error?.response?.msg)
// //   alert("some thing went wrong ")
// // }
// //   }



// //   return (
// //     <body>
// //     <div className="register-container">
// //       <h2>Create new Account</h2>
// //       <form onSubmit={handleSubmit} className="register-form">
// //         <div className="form-group">
// //           <label htmlFor="name">NAME</label>
// //           <input
// //             ref={userNameDom}
// //             type="text"
// //             id="name"
// //             placeholder="user Name"
// //             required
// //           />
          
// //         </div>

// //         <div className="form-group">
// //            <label>First Name</label>
// //      <input
// //            ref={firstNameDom} 
// //             type="text" 
// //             name="firstName" 
// //             placeholder="First Name"
// //             required
// //           />
// //         </div>


// //            <div className="form-group">
// //            <label>Last Name</label>
// //            <input 
// //            ref={lastNameDom}
// //             type="text" 
// //             name="lastName" 
// //             placeholder="Last Name"
// //             required
// //        />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="email">EMAIL</label>
// //           <input
// //             ref={emailDom}
// //             type="email"
// //             id="email"
// //             placeholder="user@gmail.com"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="password">PASSWORD</label>
// //           <input
// //             ref={passwordDom}
// //             type="password"
// //             id="password"
// //             placeholder="*************"
// //             required
// //           />
// //         </div>
// //         <button type="submit" className="submit-button">sign up</button>
// //         <div className="link">
        
// //           {/* <a href="">Already Registered? Login</a> */}
// //         <Link to={'/login'}>Already Registered? Login</Link>
// //         </div>
// //       </form>
// //     </div>   
// //     </body>
// //   );
// // }

// // export default Register;


// // // // eslint-disable-next-line no-unused-vars
// // // import React, { useRef } from 'react';
// // // import '../Register.css';
// // // import axios from '../axiosconfig';
// // // import { Link, useNavigate } from 'react-router-dom';

// // // function Register() {
// // //   const navigate = useNavigate();
  
// // //   const userNameDom = useRef(null);
// // //   const firstNameDom = useRef(null);
// // //   const lastNameDom = useRef(null);
// // //   const emailDom = useRef(null);
// // //   const passwordDom = useRef(null);
// // //   const profileImageDom = useRef(null);

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
    
// // //     const usernameValue = userNameDom.current.value;
// // //     const firstnameValue = firstNameDom.current.value;
// // //     const lastnameValue = lastNameDom.current.value;
// // //     const emailValue = emailDom.current.value;
// // //     const passValue = passwordDom.current.value;
// // //     const profileImage = profileImageDom.current.files[0];

// // //     if (!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passValue) {
// // //       alert("Please fill in all the fields");
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('username', usernameValue);
// // //     formData.append('firstname', firstnameValue);
// // //     formData.append('lastname', lastnameValue);
// // //     formData.append('email', emailValue);
// // //     formData.append('password', passValue);
// // //     if (profileImage) {
// // //       formData.append('profileImage', profileImage);
// // //     }

// // //     try {
// // //       await axios.post('/user/register', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data'
// // //         }
// // //       });
// // //       alert('Registered successfully. Please login.');
// // //       navigate('/login');
// // //     } catch (error) {
// // //       alert(error?.response?.data?.msg || "Something went wrong");
// // //     }
// // //   }

// // //   return (
// // //     <div className="register-container">
// // //       <h2>Create New Account</h2>
// // //       <form onSubmit={handleSubmit} className="register-form">
// // //         <div className="form-group">
// // //           <label htmlFor="username">Username</label>
// // //           <input
// // //             ref={userNameDom}
// // //             type="text"
// // //             id="username"
// // //             placeholder="Username"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="firstname">First Name</label>
// // //           <input
// // //             ref={firstNameDom}
// // //             type="text"
// // //             id="firstname"
// // //             placeholder="First Name"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="lastname">Last Name</label>
// // //           <input
// // //             ref={lastNameDom}
// // //             type="text"
// // //             id="lastname"
// // //             placeholder="Last Name"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="email">Email</label>
// // //           <input
// // //             ref={emailDom}
// // //             type="email"
// // //             id="email"
// // //             placeholder="user@gmail.com"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="password">Password</label>
// // //           <input
// // //             ref={passwordDom}
// // //             type="password"
// // //             id="password"
// // //             placeholder="*************"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="profileImage">Profile Image</label>
// // //           <input
// // //             ref={profileImageDom}
// // //             type="file"
// // //             id="profileImage"
// // //           />
// // //         </div>
// // //         <button type="submit" className="submit-button">Sign Up</button>
// // //         <div className="link">
// // //           <Link to="/login">Already Registered? Login</Link>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default Register;



// // // // // eslint-disable-next-line no-unused-vars
// // // // import React, { useRef } from 'react';
// // // // import '../Register.css';
// // // // import axios from '../axiosconfig';
// // // // import { Link, useNavigate } from 'react-router-dom';

// // // // function Register() {
// // // //   const navigate = useNavigate();

// // // //   const userNameDom = useRef(null);
// // // //   const firstNameDom = useRef(null);
// // // //   const lastNameDom = useRef(null);
// // // //   const emailDom = useRef(null);
// // // //   const passwordDom = useRef(null);
// // // //   const profileImageDom = useRef(null);

// // // //   async function handleSubmit(e) {
// // // //     e.preventDefault();

// // // //     const usernameValue = userNameDom.current.value;
// // // //     const firstnameValue = firstNameDom.current.value;
// // // //     const lastnameValue = lastNameDom.current.value;
// // // //     const emailValue = emailDom.current.value;
// // // //     const passValue = passwordDom.current.value;
// // // //     const profileImage = profileImageDom.current.files[0];

// // // //     if (!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passValue) {
// // // //       alert("Please fill in all the fields");
// // // //       return;
// // // //     }

// // // //     if (passValue.length <= 8) {
// // // //       alert("Password must be more than 8 characters");
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('username', usernameValue);
// // // //     formData.append('firstname', firstnameValue);
// // // //     formData.append('lastname', lastnameValue);
// // // //     formData.append('email', emailValue);
// // // //     formData.append('password', passValue);
// // // //     if (profileImage) {
// // // //       formData.append('profileImage', profileImage);
// // // //     }

// // // //     try {
// // // //       await axios.post('/user/register', formData, {
// // // //         headers: {
// // // //           'Content-Type': 'multipart/form-data'
// // // //         }
// // // //       });
// // // //       alert('Registered successfully. Please login.');
// // // //       navigate('/login');
// // // //     } catch (error) {
// // // //       alert(error?.response?.data?.msg || "Something went wrong");
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="register-container">
// // // //       <h2>Create New Account</h2>
// // // //       <form onSubmit={handleSubmit} className="register-form">
// // // //         <div className="form-group">
// // // //           <label htmlFor="username">Username</label>
// // // //           <input
// // // //             ref={userNameDom}
// // // //             type="text"
// // // //             id="username"
// // // //             placeholder="Username"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="form-group">
// // // //           <label htmlFor="firstname">First Name</label>
// // // //           <input
// // // //             ref={firstNameDom}
// // // //             type="text"
// // // //             id="firstname"
// // // //             placeholder="First Name"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="form-group">
// // // //           <label htmlFor="lastname">Last Name</label>
// // // //           <input
// // // //             ref={lastNameDom}
// // // //             type="text"
// // // //             id="lastname"
// // // //             placeholder="Last Name"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="form-group">
// // // //           <label htmlFor="email">Email</label>
// // // //           <input
// // // //             ref={emailDom}
// // // //             type="email"
// // // //             id="email"
// // // //             placeholder="user@gmail.com"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="form-group">
// // // //           <label htmlFor="password">Password</label>
// // // //           <input
// // // //             ref={passwordDom}
// // // //             type="password"
// // // //             id="password"
// // // //             placeholder="*************"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="form-group">
// // // //           <label htmlFor="profileImage">Profile Image</label>
// // // //           <input
// // // //             ref={profileImageDom}
// // // //             type="file"
// // // //             id="profileImage"
// // // //           />
// // // //         </div>
// // // //         <button type="submit" className="submit-button">Sign Up</button>
// // // //         <div className="link">
// // // //           <Link to="/login">Already Registered? Login</Link>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Register;


// // eslint-disable-next-line no-unused-vars
// import React, { useRef } from 'react';
// import '../Register.css';
// import axios from '../axiosconfig';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons

// function Register() {
//   const navigate = useNavigate();
  
//   const userNameDom = useRef(null);
//   const firstNameDom = useRef(null);
//   const lastNameDom = useRef(null);
//   const emailDom = useRef(null);
//   const passwordDom = useRef(null);
//   const profileImageDom = useRef(null);  // New ref for profile image

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('username', userNameDom.current.value);
//     formData.append('firstname', firstNameDom.current.value);
//     formData.append('lastname', lastNameDom.current.value);
//     formData.append('email', emailDom.current.value);
//     formData.append('password', passwordDom.current.value);
//     formData.append('profileImage', profileImageDom.current.files[0]);  // Add the profile image file

//     try {
//       await axios.post('/user/register', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('Register successfully. Please log in.');
//       navigate('/login');
//     } catch (error) {
//       alert(error?.response?.data?.msg || "Something went wrong");
//     }
//   }

//   return (
//     <body>
//       <div className="register-container">
//         <h2>Create new Account</h2>
//         <form onSubmit={handleSubmit} className="register-form">
//           <div className="form-group">
//             <label htmlFor="name">NAME</label>
//             <input
//               ref={userNameDom}
//               type="text"
//               id="name"
//               placeholder="User Name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>First Name</label>
//             <input
//               ref={firstNameDom}
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Last Name</label>
//             <input
//               ref={lastNameDom}
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">EMAIL</label>
//             <input
//               ref={emailDom}
//               type="email"
//               id="email"
//               placeholder="user@gmail.com"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">PASSWORD</label>
//             <input
//               ref={passwordDom}
//               type="password"
//               id="password"
//               placeholder="*************"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="profileImage">Profile Image</label>
//             <input
//               ref={profileImageDom}
//               type="file"
//               id="profileImage"
//               name="profileImage"
//               accept="image/*"
//               required
//             />
//           </div>

//           <button type="submit" className="submit-button">Sign Up</button>
//           <div className="link">
//             <Link to={'/login'}>Already Registered? Login</Link>
//           </div>
//         </form>
//       </div>
//     </body>
//   );
// }

// export default Register;


// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import '../Register.css';
// import axios from '../axiosconfig';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons
import axiosBase from '../axiosconfig';

function Register() {
  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const profileImageDom = useRef(null);  // New ref for profile image

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      await axiosBase.post('/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Register successfully. Please log in.');
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.msg || "Something went wrong");
    }
  }

  return (
     <body>
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">NAME</label>
          <input
            ref={userNameDom}
            type="text"
            id="name"
            placeholder="User Name"
            required
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            ref={firstNameDom}
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            ref={lastNameDom}
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            ref={emailDom}
            type="email"
            id="email"
            placeholder="user@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
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

        <button type="submit" className="submit-button">Sign Up</button>
        <div className="link">
          <Link to="/login">Already Registered? Login</Link>
        </div>
      </form>
    </div>
    </body>
  );
}

export default Register;
