import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import axiosBase from './axiosconfig';
import AskQuestion from './pages/AskQuestion';
import Ansquestion from './pages/Ansquestion';
import nprogress from 'nprogress';
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
