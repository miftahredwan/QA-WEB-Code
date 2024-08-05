// // eslint-disable-next-line no-unused-vars
// import React, { useRef, useState } from 'react';
// import '../Register.css';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosBase from '../axiosconfig';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons
//   function Login() {
// const navigate = useNavigate() 
// const emailDom =useRef(null)
// const passwordDom =useRef(null)
// const [isPasswordVisible, setIsPasswordVisible] = useState(false);  
// const togglePasswordVisibility = () => {
//   setIsPasswordVisible(!isPasswordVisible);
// };

//  async function handleSubmit (e) {
//     e.preventDefault();

// const emailvalue = emailDom.current.value
// const passvalue = passwordDom.current.value
// if( !emailvalue || !passvalue){
// alert("fill the provide filed")
// return
// }
// try {
//   const { data } =await axiosBase.post('/user/login', { 
//      email:emailvalue,
//      password:passvalue
//     })
//     alert('Loged in succesfully')
//     console.log(data)

// localStorage.setItem('token', data.token)
//     navigate('/')
// } catch (error) {
//   alert(error?.response?.data?.msg)
//   alert("some thing went wrong ")
// }
//   }

//   return (
//     <body>

// <div className="register-container">
//       <h2>Welcome 
//             <span> to </span>
//         Baaji Tech Q & A
//         </h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label>Email</label>
//           <input 
//           ref={emailDom}
//             type="email" 
//             name="email" 
//              placeholder="youremail@gmail.com"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">PASSWORD</label>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <input
//               ref={passwordDom}
//               type={isPasswordVisible ? 'text' : 'password'}
//               id="password"
//               placeholder="*************"
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               style={{ borderRadius: '155px', /* Rounded corners */
//                  border: 'none', cursor: 'pointer', marginLeft: '5px' }}
//             >
//               {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         <button type="submit" className="submit-button">signin</button>
//       <div>
//         <div className="link">
        
  
//       <Link to={'/register'}>Dont have an account? Sign up</Link>
//       </div>
//       </div> 
//       </form>
//     </div>

//     </body>
    
//   );
// }

// export default Login;


// login.jsx
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import '../Register.css';
import { Link } from 'react-router-dom';
import axiosBase from '../axiosconfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye icons

// eslint-disable-next-line react/prop-types
function Login({ handleLogin }) {
  // const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailvalue = emailDom.current.value;
    const passvalue = passwordDom.current.value;
    if (!emailvalue || !passvalue) {
      alert("fill the provide field");
      return;
    }
    try {
      const { data } = await axiosBase.post('/user/login', { 
         email: emailvalue,
         password: passvalue
      });
      alert('Logged in successfully');
      localStorage.setItem('token', data.token);
      handleLogin(); // Call the new handleLogin function
    } catch (error) {
      alert(error?.response?.data?.msg || "something went wrong");
    }
  }

  return (
    <body>
      <div className="register-container">
        <h2>Welcome 
          <span> to </span>
          Baaji Tech Q & A
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              ref={emailDom}
              type="email" 
              name="email" 
              placeholder="youremail@gmail.com"
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
                style={{ borderRadius: '155px', border: 'none', cursor: 'pointer', marginLeft: '5px' }}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">signin</button>
          <div className="link">
            <Link to={'/register'}>Dont have an account? Sign up</Link>
          </div> 
        </form>
      </div>
    </body>
  );
}

export default Login;
