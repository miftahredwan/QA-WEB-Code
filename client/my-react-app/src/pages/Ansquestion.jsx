// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../ansque.css';
import axiosBase from '../axiosconfig';
import logo from '../../public/images/cropped-White-logo-no-background.png.webp'; // Import the logo image
import { AppState } from '../App'; // Assuming AppState context is defined in App.js
// const backendUrl = import.meta.env.VITE_BACKEND_URL
function AnsQuestion() {
  const location = useLocation();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AppState); // Assuming user context is provided by AppState

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const title = query.get('title');
    const description = query.get('description');
    const username = query.get('username');
    const userid = query.get('userid');
    setQuestion({ id, title, description, username, userid });

    // Fetch the answers when the component mounts
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }
        const { data } = await axiosBase.get(`/api/answer/getAnswer/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAnswers(data);
        console.log('Fetched answers:', data);
      } catch (error) {
        console.log('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [location.search]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const { data } = await axiosBase.post(
        `/api/answer/postAnswer/${question.id}`,
        { answer: newAnswer, questionid: question.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setNewAnswer('');
      alert("Posted Successfully");
      console.log('Posted answer:', data);

navigate('/')
    
    } catch (error) {
      console.log('Error posting answer:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  const handleDeleteAnswer = async (answerid, userid) => {
    console.log('Attempting to delete answer:', answerid);
    console.log('Answer user ID:', userid);
    console.log('Current user ID:', user.userid);

    try {
      // Check if the current user is the owner of the answer
      if (userid !== user.userid) {
        alert('You cannot delete another user\'s answer');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      await axiosBase.delete(`/api/answer/deleteanswer/${answerid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
      alert("Answer deleted successfully");
      console.log('Deleted answer ID:', answerid);
    } catch (error) {
      console.log('Error deleting answer:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  async function Logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Navigate to the login page or home page
    navigate('/login'); // Adjust the URL as needed
  }

  return (
    <div>   
       <header>
        <nav className='navbar'>
          <img src={logo} alt="Logo" className="homelogo" /> {/* Logo element */}  
          <li>
              <button>
            <Link to="/">Home</Link></button>
             </li><li>
              <Link to="/askquestion"><button className="btn-nav">Ask Question</button></Link>
              </li>
            <li>
                <button onClick={Logout} className="logout">Logout</button>
                </li>
          </nav>
      </header>   
        <h1>Question</h1>
        <div className="question-details">
         
          <h2>Asked by: {question.username}</h2>
          <h2>{question.title}</h2>
          <h4>{question.description}</h4>
        </div>
        <div className="answers-section">
          <h2>Answer From The Community</h2>
          {answers.length > 0 ? (
            answers
              .filter(answer => answer.questionid === question.id)
              .map((answer, index) => (
                <div key={index} className="answer">
                  <div className="username">{  answer.username + "   "}</div>
                  <div className="answer-text">{answer.answer} <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button></div>
                </div>
              ))
          ) : (
            <p>No answers yet. Be the first to answer!</p>
          )}
        </div>
        <div className="form-container">
          <label htmlFor="newAnswer">Your Answer:</label>
          <textarea
            id="newAnswer"
            name="newAnswer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter your answer here, maximum length 255 characters"
          />
          <button onClick={handleAnswerSubmit}>Post Your Answer</button>
        </div>
    </div>
  );
}

export default AnsQuestion;
