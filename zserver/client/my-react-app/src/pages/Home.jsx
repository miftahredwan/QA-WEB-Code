/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import '../../src/home.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../App';
import axiosBase from '../axiosconfig';

function Home() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({ title: '', description: '', questionid: '' });
  const { user } = useContext(AppState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const { data } = await axiosBase.get('/questions/getquestions', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setQuestions(data); // Set questions array from backend response
        console.log('Fetched questions:', data);
      } catch (error) {
        console.log('Error fetching questions:', error.response ? error.response.data : error.message);
      }
    }

    fetchQuestions();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  useEffect(() => {
    if (location.state && location.state.newQuestion) {
      setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
    }
  }, [location.state]);

  async function handleDelete(questionId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      await axiosBase.delete(`/questions/deletequestion/${questionId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setQuestions(prevQuestions => prevQuestions.filter(question => question.questionid !== questionId));
      alert('Question deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('You are not authorized to delete this question');
      } else {
        console.log('Error deleting question:', error.response ? error.response.data : error.message);
      }
    }
  }

  async function handleDeleteSelected() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found in localStorage');
      return;
    }

    try {
      const failedDeletions = [];
      for (const questionId of selectedQuestions) {
        try {
          await axiosBase.delete(`/questions/deletequestion/${questionId}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            failedDeletions.push(questionId);
          } else {
            console.log('Error deleting question:', error.response ? error.response.data : error.message);
          }
        }
      }

      setQuestions(prevQuestions => prevQuestions.filter(question => !selectedQuestions.includes(question.questionid)));
      setSelectedQuestions([]);

      if (failedDeletions.length > 0) {
        alert('Some questions could not be deleted because you are not authorized to delete them');
      } else {
        alert('Selected questions deleted successfully');
      }
    } catch (error) {
      console.log('Error deleting questions:', error.response ? error.response.data : error.message);
    }
  }

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions(prevSelected =>
      prevSelected.includes(questionId)
        ? prevSelected.filter(id => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleUpdateClick = (question) => {
    if (question.userid !== user.userid) {
      alert('You cannot update another user\'s question');
      return;
    }
    setCurrentQuestion(question);
    setEditingQuestionId(question.questionid);
  };

  async function handleUpdateQuestion() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found in localStorage');
      return;
    }

    try {
      await axiosBase.put(`/questions/updatequestion/${currentQuestion.questionid}`, currentQuestion, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setQuestions(prevQuestions =>
        prevQuestions.map(q =>
          q.questionid === currentQuestion.questionid ? currentQuestion : q
        )
      );

      setEditingQuestionId(null);
      alert('Question updated successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('You are not authorized to update this question');
      } else {
        console.log('Error updating question:', error.response ? error.response.data : error.message);
      }
    }
  }

  async function Logout() {
    localStorage.removeItem('token');
    navigate('/login'); 
  }

  console.log('User object:', user);

  // console.log('Profile Image URL:', user.profileImage);
  // console.log('Profile Image URL:', `http://localhost:5500/uploads/${user.profileImage.replace(/\\/g, '/')}`);
  return (
    <div>
      <header>
        <div className="container">
          <div className="logo"></div>
          <nav className='navbar'>
            <ul>
              <li><a href="/">Home</a></li>
              <li>
                <button className="btn-nav"><a href="/askquestion">Ask Question</a></button>
              </li>
              <li>
                <button onClick={Logout} className="logout">Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="hero-content">
        {/* {user.profileImage && <img src={user.profileImage} alt="Profile" className="profile-image" />} */}


        {/* {user.profileImage ? (
          <img 
            src={`http://localhost:5500/uploads/${user.profileImage}`} 
            alt="Profile" 
            className="profile-image" 
            onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} 
          />
        ) : (
          <p>No profile image available</p>
        )} */}

{user.profileImage ? (


  // <img src={`http://localhost:5500/uploads/${user.profileImage}`} alt="Profile" className="profile-image" />
<img src={`http://localhost:5500/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />

) : (
  <p>No profile image available</p>
)}

{/* {user.profileImage ? (
  <img 
    src={`http://localhost:5500/uploads/${user.profileImage}`} 
    alt="Profile" 
    className="profile-image" 
    onError={(e) => { 
      e.target.onerror = null; 
      e.target.src = "fallback.jpg"; 
    }} 
  />
) : (
  <p>No profile image available</p>
)} */}


        <h1>Welcome, {user.username}</h1>
        <a href="/askquestion"><button className="btn">Ask Question</button></a>
      </div>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>GROW YOUR PROGRAMMING KNOWLEDGE WITH OUR HELP!</h1>
            <a href="/ansquestion"><button className="btn">Answered Question</button></a>
          </div>
        </div>
        <section className='question-section'>
          {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
          <div className="questions-list">
            {questions?.length > 0 ? (
              questions.map((question, index) => (
                question.title ? (
                  <div key={index} className="question-title">
                   {/* {question.profileImage ? (


<img src={`http://localhost:5500/${question.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />

  // <img src={`http://localhost:5500/uploads/${user.profileImage}`} alt="Profile" className="profile-image" />
) : (
  <p>No profile image available</p>
)} */}




{question.profileimage ? (
                        <img 
                          src={`http://localhost:5500/${question.profileimage.replace(/\\/g, '/')}`} 
                          alt="Profile" 
                          className="profile-image" 
                          onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
                        />
                      ) : (
                        <p>No profile image available</p>
                      )}



{/* {question.profileImage ? (


// <img src={`http://localhost:5500/uploads/${user.profileImage}`} alt="Profile" className="profile-image" />
<img src={`http://localhost:5500/${question.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />

) : (
<p>No profile image available</p>
)} */}



                    <div className='username'>{question.username}</div>
                    <div className="question-container">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.questionid)}
                        onChange={() => handleCheckboxChange(question.questionid)}
                      />
                      <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.title)}&description=${encodeURIComponent(question.description)}&username=${encodeURIComponent(question.username)}`}>
                        {question.title}
                      </Link>
                      <button onClick={() => handleDelete(question.questionid)}>Delete</button>
                      <button onClick={() => handleUpdateClick(question)}>Update</button>
                      {editingQuestionId === question.questionid && (
                        <div className="update-box">
                          <h2>Update Question</h2>
                          <label>
                            Title:
                            <input
                              type="text"
                              value={currentQuestion.title}
                              onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
                            />
                          </label>
                          <label>
                            Description:
                            <textarea
                              value={currentQuestion.description}
                              onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
                            />
                          </label>
                          <button onClick={handleUpdateQuestion}>Update</button>
                          <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
          {selectedQuestions.length > 0 && (
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          )}
        </section>
      </section>
      <footer>
        <div className="container">
          <p>&copy; 2024 Baaji Tech Software Solution</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;




