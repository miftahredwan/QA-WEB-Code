// // import './App.css'
// // import { Route, Routes, useNavigate } from 'react-router-dom'
// // import Home from './pages/Home'
// // import Login from './pages/Login'
// // import Register from './pages/Register'
// // import { createContext, useEffect, useState } from 'react'
// // import axiosBase from './axiosconfig'
// // import AskQuestion from './pages/AskQuestion'
// // import Ansquestion from './pages/Ansquestion'
 

// // export const AppState = createContext();

// // function App(){
// //   const [user, setUser] = useState({
// //   //     username: '',
// //   // profileImage: ''
// //   })
// //   const [loading, setLoading] = useState(true); // Add loading state
// //   // const [questions, setQuestions] = useState({});
// //   const navigate = useNavigate()
// //   async function checkUser(){

// //      try {


// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         navigate('/login');
// //         return;
// //       }
  

// //       const { data } = await axiosBase.get('/user/checkuser', {
// //         headers: {
// //           Authorization: "Bearer " + token
// //         },
// //       });
// //       console.log('Fetched user data:', data.msg)
// //       // localStorage.setItem('token', data.token)
// //       setUser(data.msg)
// //       console.log('User data:', data.msg)
// //     } catch (error) {
// //       // localStorage.removeItem('token');
// //       navigate('/login') 
// //       console.log('Error:', error.response ? error.response.data : error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }
// //     useEffect(()=>{
// //     checkUser()
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);  

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }
 
  
// //   return (
// //     <AppState.Provider value={{ user, setUser
// //     }}>
// //       <Routes>
// //         <Route path="/" element= { <Home />}  />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />}/>
// //         <Route path="/askquestion" element={user ? <AskQuestion /> : <Login />}/>
// //         <Route path="/ansquestion" element={ <Ansquestion />}/>
// //       </Routes> 

// //     </AppState.Provider>  
// //   )
// // }

// // export default App


// import './App.css';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import { createContext, useEffect, useState } from 'react';
// import axiosBase from './axiosconfig';
// import AskQuestion from './pages/AskQuestion';
// import Ansquestion from './pages/Ansquestion';

// export const AppState = createContext();

// function App() {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   async function checkUser() {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const { data } = await axiosBase.get('/user/checkuser', {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setUser(data.msg);
//     } catch (error) {
//       navigate('/login');
//       console.log('Error:', error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     checkUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AppState.Provider value={{ user, setUser }}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/askquestion" element={user ? <AskQuestion /> : <Login />} />
//         <Route path="/ansquestion" element={<Ansquestion />} />
//       </Routes>
//     </AppState.Provider>
//   );
// }

// export default App;


// import './App.css'
// import { Route, Routes, useNavigate } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import { createContext, useEffect, useState } from 'react'
// import axiosBase from './axiosconfig'
// import AskQuestion from './pages/AskQuestion'
// import Ansquestion from './pages/Ansquestion'
 

// export const AppState = createContext();

// function App(){
//   const [user, setUser] = useState({
//     // username: '',
//     // profileImage: ''
//   })
//   const [loading, setLoading] = useState(true); // Add loading state
//   const navigate = useNavigate()
  
//   async function checkUser() {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const { data } = await axiosBase.get('/api/user/check', {
//         headers: {
//           Authorization: "Bearer " + token
//         },
//       });
//       console.log(token)
//       console.log('Fetched user data:', data.username, data.profileImage)
//       // setUser(data.msg)
//       setUser({
//         username: data.username,
//         userid: data.userid,
//         profileImage: data.profileImage
//       });
//       console.log('User data:', data)
//     } catch (error) {
//       navigate('/login') 
//       console.log('Error:', error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false); // Set loading to false after fetching user data
//     }
//   }

//   async function handleLogin() {
//     setLoading(true); // Set loading to true while fetching user data
//     await checkUser();
//     navigate('/');
//   }

//   useEffect(()=>{
//     checkUser()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);  

//   if (loading) {
//     return <div>Loading...</div>; // Display loading indicator while fetching user data
//   }
  
//   return (
//     <AppState.Provider value={{ user, setUser }}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/askquestion" element={user ? <AskQuestion /> : <Login />} />
//         <Route path="/ansquestion" element={<Ansquestion />} />
//       </Routes> 
//     </AppState.Provider>  
//   )
// }

// export default App


import './App.css';
// import './nprogress-custom.css'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import axiosBase from './axiosconfig';
import AskQuestion from './pages/AskQuestion';
import Ansquestion from './pages/Ansquestion';
import nprogress from 'nprogress';
// import 'nprogress/nprogress.css';
import { RingLoader } from 'react-spinners';


export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Access location to track route changes

  async function checkUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const { data } = await axiosBase.get('/api/user/check', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setUser({
        username: data.username,
        userid: data.userid,
        profileImage: data.profileImage,
      });
    } catch (error) {
      navigate('/login');
      console.log('Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching user data
      nprogress.done(); // End the progress bar
    }
  }

  async function handleLogin() {
    setLoading(true);
    nprogress.start(); // Start the progress bar
    await checkUser();
    navigate('/');
  }

  useEffect(() => {
    nprogress.start(); // Start the progress bar when the component mounts
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    nprogress.start(); // Start the progress bar when the route changes
    return () => {
      nprogress.done(); // Finish the progress bar when the route change completes
    };
  }, [location]);

  if (loading) {
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <RingLoader color="blue" size={120} />
  </div>
  }

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/askquestion" element={user ? <AskQuestion /> : <Login />} />
        <Route path="/ansquestion" element={<Ansquestion />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
