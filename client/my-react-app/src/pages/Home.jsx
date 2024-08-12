import { useContext, useEffect, useState } from 'react';
import '../../src/home.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../App';
import axiosBase from '../axiosconfig';
import logo from '../../public/images/cropped-White-logo-no-background.png.webp'; // Import the logo image

// eslint-disable-next-line no-undef
const backendUrl = import.meta.env.VITE_BACKEND_URL;
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

        const { data } = await axiosBase.get('/api/question/getquestions', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setQuestions(data);
        console.log('Fetched questions:', data);
      } catch (error) {
        console.log('Error fetching questions:', error.response ? error.response.data : error.message);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (location.state && location.state.newQuestion) {
      setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
    }
  }, [location.state]);

  async function handleDelete(questionId, userId) {
    try {
      if (userId !== user.userid) {
        alert('You cannot delete another user\'s question');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      await axiosBase.delete('/api/question/deletequestion', {
        data: { questionid: questionId },
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
        const question = questions.find(q => q.questionid === questionId);
        if (question.userid !== user.userid) {
          failedDeletions.push(questionId);
          continue;
        }

        try {
          await axiosBase.delete('/api/question/deletequestion', {
            data: { questionid: questionId },
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
    setCurrentQuestion({ title: question.questiontitle, description: question.questiondescription, questionid: question.questionid });
    setEditingQuestionId(question.questionid);
  };

  async function handleUpdateQuestion() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found in localStorage');
      return;
    }

    try {
      await axiosBase.put(`/api/question/updatequestion/${currentQuestion.questionid}`, {
        title: currentQuestion.title,
        description: currentQuestion.description
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setQuestions(prevQuestions =>
        prevQuestions.map(q =>
          q.questionid === currentQuestion.questionid ? { ...q, questiontitle: currentQuestion.title, questiondescription: currentQuestion.description } : q
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
  console.log(`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`);

  return (
    <div>
      <header>
        <div className="container">
         
          <nav className='navbar'>
          <img src={logo} alt="Logo" className="homelogo" /> {/* Logo element */}  
          <li>
             
            <Link to="/"> <button>Home</button></Link>
             </li><li>
              <Link to="/askquestion"><button className="btn-nav">Ask Question</button></Link>
              </li>
            <li>
                <button onClick={Logout} className="logout">Logout</button>
                </li>
           
          </nav>
        </div>
      </header>
      <div className="hero-content-profile">
        {user.profileImage ? (
          <img src={`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
        ) : (
          <p>No profile image available</p>
        )}
        <h2>Welcome, {user.username}</h2>
        <Link to="/askquestion"><button>Ask Question</button></Link>
      </div>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
          <h1><span>"The cure for ignorance is to ask"</span> <br />
          <strong>Prophet Muhammad (PBUH)</strong></h1>
          </div>
        </div>
     
        <section className='question-section'>
          {questions?.length > 0 && 
          <h1 className="question-title">Questions</h1>}
          <div className="questions-list">
            {questions?.length > 0 ? (
              questions.map((question, index) => (
                question.questiontitle ? (
                  <div key={index} className="question-title">
                    <div className="question-container">

                    {question.profileimage ? (
          <img src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
        ) : (
          <p>No profile image available</p>
        )}
                    <div className='username'>{question.username}</div>
                     
                      <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}&userid=${encodeURIComponent(question.userid)}`}    className="link-space">
                        {question.questiontitle}
                      </Link>
                      <div className="button-group">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.questionid)}
                        onChange={() => handleCheckboxChange(question.questionid)}
                      />
                      <button 
                      className="button-style button-delete"
                       onClick={() => handleDelete(question.questionid, question.userid)}>
                        Delete</button>
                     
                    <button className="button-style button-update"
                    onClick={() => handleUpdateClick(question)}>Update</button>
                    </div>
                    </div>


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
  <section>
  <footer className="footer">
  <div className="container">
    <p>&copy; 2024 Baaji Tech Software Solutions.</p>

    <div className="footer-links">
      <p><strong>Categories:</strong></p>
      <p>
        <Link to="/category/technology">Technology</Link> | 
        <Link to="/category/science">Science</Link> | 
        <Link to="/category/mathematics">Mathematics</Link> | 
        <Link to="/category/health">Health</Link> | 
        <Link to="/category/business">Business</Link> | 
        <Link to="/category/education">Education</Link> | 
        <Link to="/category/environment">Environment</Link> | 
        <Link to="/category/lifestyle">Lifestyle</Link> | 
        <Link to="/category/entertainment">Entertainment</Link> | 
        <Link to="/category/sports">Sports</Link>
      </p>

      <p><strong>Popular Questions:</strong></p>
      <p>
        <Link to="/question/most-answered">Most Answered</Link> | 
        <Link to="/question/recent">Recently Asked</Link> | 
        <Link to="/question/unanswered">Unanswered</Link> | 
        <Link to="/question/top-rated">Top Rated</Link> | 
        <Link to="/question/hot-today">Hot Today</Link> | 
        <Link to="/question/featured">Featured</Link> | 
        <Link to="/question/editor-picks">Editor’s Picks</Link> | 
        <Link to="/question/trending">Trending</Link>
      </p>

      <p><strong>Resources:</strong></p>
      <p>
        <Link to="/faq">FAQ</Link> | 
        <Link to="/guidelines">Community Guidelines</Link> | 
        <Link to="/support">Support</Link> | 
        <Link to="/contact">Contact Us</Link> | 
        <Link to="/about">About Us</Link> | 
        <Link to="/privacy-policy">Privacy Policy</Link> | 
        <Link to="/terms-of-service">Terms of Service</Link> | 
        <Link to="/report">Report an Issue</Link>
      </p>

      <p><strong>User Account:</strong></p>
      <p>
        <Link to="/profile">Profile</Link> | 
        <Link to="/settings">Settings</Link> | 
        <Link to="/notifications">Notifications</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/signup">Sign Up</Link> | 
        <Link to="/my-questions">My Questions</Link> | 
        <Link to="/my-answers">My Answers</Link> | 
        <Link to="/saved-questions">Saved Questions</Link>
      </p>

      <p><strong>Learning & Help:</strong></p>
      <p>
        <Link to="/tutorials">Tutorials</Link> | 
        <Link to="/how-to-ask">How to Ask</Link> | 
        <Link to="/how-to-answer">How to Answer</Link> | 
        <Link to="/community-rules">Community Rules</Link> | 
        <Link to="/moderator-guidelines">Moderator Guidelines</Link> | 
        <Link to="/support-center">Support Center</Link> | 
        <Link to="/help-center">Help Center</Link> | 
        <Link to="/contact-mods">Contact Moderators</Link>
      </p>

      <p><strong>Follow us:</strong></p>
      <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> | 
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a> | 
        <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">Reddit</a> | 
        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a> | 
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
      </p>
    </div>
  </div>
</footer>

  </section>

    </div>
    
  );
}

export default Home;
