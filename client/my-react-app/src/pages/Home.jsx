// // // // /* eslint-disable no-unused-vars */
// // // // import { useContext, useEffect, useState } from 'react';
// // // // import '../../src/home.css';
// // // // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // // // import { AppState } from '../App';
// // // // import axiosBase from '../axiosconfig';

// // // // function Home() {
// // // //   const [questions, setQuestions] = useState([]);
// // // //   const [selectedQuestions, setSelectedQuestions] = useState([]);
// // // //   const [editingQuestionId, setEditingQuestionId] = useState(null);
// // // //   const [currentQuestion, setCurrentQuestion] = useState({ title: '', description: '', questionid: '' });
// // // //   const { user } = useContext(AppState);
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     async function fetchQuestions() {
// // // //       try {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) {
// // // //           throw new Error('No token found in localStorage');
// // // //         }

// // // //         const { data } = await axiosBase.get('/question/getquestions', {
// // // //           headers: {
// // // //             Authorization: "Bearer " + token,
// // // //           },
// // // //         });
// // // //         setQuestions(data); // Set questions array from backend response
// // // //         console.log('Fetched questions:', data);
// // // //       } catch (error) {
// // // //         console.log('Error fetching questions:', error.response ? error.response.data : error.message);
// // // //       }
// // // //     }

// // // //     fetchQuestions();
// // // //   }, []); // Empty dependency array ensures useEffect runs only once on component mount

// // // //   useEffect(() => {
// // // //     if (location.state && location.state.newQuestion) {
// // // //       setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
// // // //     }
// // // //   }, [location.state]);

// // // //   async function handleDelete(questionId) {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         throw new Error('No token found in localStorage');
// // // //       }

// // // //       await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// // // //         headers: {
// // // //           Authorization: "Bearer " + token,
// // // //         },
// // // //       });

// // // //       setQuestions(prevQuestions => prevQuestions.filter(question => question.questionid !== questionId));
// // // //       alert('Question deleted successfully');
// // // //     } catch (error) {
// // // //       if (error.response && error.response.status === 404) {
// // // //         alert('You are not authorized to delete this question');
// // // //       } else {
// // // //         console.log('Error deleting question:', error.response ? error.response.data : error.message);
// // // //       }
// // // //     }
// // // //   }

// // // //   async function handleDeleteSelected() {
// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) {
// // // //       alert('No token found in localStorage');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const failedDeletions = [];
// // // //       for (const questionId of selectedQuestions) {
// // // //         try {
// // // //           await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// // // //             headers: {
// // // //               Authorization: "Bearer " + token,
// // // //             },
// // // //           });
// // // //         } catch (error) {
// // // //           if (error.response && error.response.status === 404) {
// // // //             failedDeletions.push(questionId);
// // // //           } else {
// // // //             console.log('Error deleting question:', error.response ? error.response.data : error.message);
// // // //           }
// // // //         }
// // // //       }

// // // //       setQuestions(prevQuestions => prevQuestions.filter(question => !selectedQuestions.includes(question.questionid)));
// // // //       setSelectedQuestions([]);

// // // //       if (failedDeletions.length > 0) {
// // // //         alert('Some questions could not be deleted because you are not authorized to delete them');
// // // //       } else {
// // // //         alert('Selected questions deleted successfully');
// // // //       }
// // // //     } catch (error) {
// // // //       console.log('Error deleting questions:', error.response ? error.response.data : error.message);
// // // //     }
// // // //   }

// // // //   const handleCheckboxChange = (questionId) => {
// // // //     setSelectedQuestions(prevSelected =>
// // // //       prevSelected.includes(questionId)
// // // //         ? prevSelected.filter(id => id !== questionId)
// // // //         : [...prevSelected, questionId]
// // // //     );
// // // //   };

// // // //   const handleUpdateClick = (question) => {
// // // //     if (question.userid !== user.userid) {
// // // //       alert('You cannot update another user\'s question');
// // // //       return;
// // // //     }
// // // //     setCurrentQuestion(question);
// // // //     setEditingQuestionId(question.questionid);
// // // //   };

// // // //   // async function handleUpdateQuestion() {
// // // //   //   const token = localStorage.getItem('token');
// // // //   //   if (!token) {
// // // //   //     alert('No token found in localStorage');
// // // //   //     return;
// // // //   //   }

// // // //   //   try {
// // // //   //     await axiosBase.put(`/question/updatequestion/${currentQuestion.questionid}`, currentQuestion, {
// // // //   //       headers: {
// // // //   //         Authorization: "Bearer " + token,
// // // //   //       },
// // // //   //     });

// // // //   //     setQuestions(prevQuestions =>
// // // //   //       prevQuestions.map(q =>
// // // //   //         q.questionid === currentQuestion.questionid ? currentQuestion : q
// // // //   //       )
// // // //   //     );

// // // //   //     setEditingQuestionId(null);
// // // //   //     alert('Question updated successfully');
// // // //   //   } catch (error) {
// // // //   //     if (error.response && error.response.status === 404) {
// // // //   //       alert('You are not authorized to update this question');
// // // //   //     } else {
// // // //   //       console.log('Error updating question:', error.response ? error.response.data : error.message);
// // // //   //     }
// // // //   //   }
// // // //   // }

// // // //   async function handleUpdateQuestion() {
// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) {
// // // //       alert('No token found in localStorage');
// // // //       return;
// // // //     }
  
// // // //     try {
// // // //       await axiosBase.put(`/question/updatequestion/${currentQuestion.questionid}`, currentQuestion, {
// // // //         headers: {
// // // //           Authorization: "Bearer " + token,
// // // //         },
// // // //       });
  
// // // //       setQuestions(prevQuestions =>
// // // //         prevQuestions.map(q =>
// // // //           q.questionid === currentQuestion.questionid ? { ...q, ...currentQuestion } : q
// // // //         )
// // // //       );
  
// // // //       setEditingQuestionId(null);
// // // //       alert('Question updated successfully');
// // // //     } catch (error) {
// // // //       if (error.response && error.response.status === 404) {
// // // //         alert('You are not authorized to update this question');
// // // //       } else {
// // // //         console.log('Error updating question:', error.response ? error.response.data : error.message);
// // // //       }
// // // //     }
// // // //   }
  


// // // //   async function Logout() {
// // // //     localStorage.removeItem('token');
// // // //     navigate('/login'); 
// // // //   }

// // // //   console.log('User object:', user);


// // // //   console.log(`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`);
// // // //   // console.log('Profile Image URL:', user.profileImage);
// // // //   // console.log('Profile Image URL:', `${backendUrl}/uploads/${user.profileImage.replace(/\\/g, '/')}`);
// // // //   return (
// // // //     <div>
// // // //       <header>
// // // //         <div className="container">
// // // //           <div className="logo"></div>
// // // //           <nav className='navbar'>
// // // //             <ul>
// // // //               <li><a href="/">Home</a></li>
// // // //               <li>
// // // //                 <button className="btn-nav"><a href="/askquestion">Ask Question</a></button>
// // // //               </li>
// // // //               <li>
// // // //                 <button onClick={Logout} className="logout">Logout</button>
// // // //               </li>
// // // //             </ul>
// // // //           </nav>
// // // //         </div>
// // // //       </header>
// // // //       <div className="hero-content">
      
// // // // {user.profileImage ? (


// // // //   // <img src={`${backendUrl}/uploads/${user.profileImage}`} alt="Profile" className="profile-image" />
// // // // <img src={`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />

// // // // ) : (
// // // //   <p>No profile image available</p>
// // // // )}

// // // //         <h1>Welcome, {user.username}</h1>
// // // //         <a href="/askquestion"><button className="btn">Ask Question</button></a>
// // // //       </div>

// // // //       <section className="hero">
// // // //         <div className="container">
// // // //           <div className="hero-content">
// // // //             <h1>GROW YOUR PROGRAMMING KNOWLEDGE WITH OUR HELP!</h1>
// // // //             <a href="/ansquestion"><button className="btn">Answered Question</button></a>
// // // //           </div>
// // // //         </div>
// // // //         <section className='question-section'>
// // // //           {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
// // // //           <div className="questions-list">
// // // //             {questions?.length > 0 ? (
// // // //               questions.map((question, index) => (
// // // //                 question.questiontitle ? (
// // // //                   <div key={index} className="question-title">
                   




// // // // {question.profileimage ? (
// // // //                         <img 
// // // //                           src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} 
// // // //                           alt="Profile" 
// // // //                           className="profile-image" 
// // // //                           onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
// // // //                         />
// // // //                       ) : (
// // // //                         <p>No profile image available</p>
// // // //                       )}

// // // //                     <div className='username'>{question.username}</div>
// // // //                     <div className="question-container">
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={selectedQuestions.includes(question.questionid)}
// // // //                         onChange={() => handleCheckboxChange(question.questionid)}
// // // //                       />
// // // //                       <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}`}>
// // // //                         {question.questiontitle}
// // // //                       </Link>
// // // //                       <button onClick={() => handleDelete(question.questionid)}>Delete</button>
// // // //                       <button onClick={() => handleUpdateClick(question)}>Update</button>
// // // //                       {editingQuestionId === question.questionid && (
// // // //                         <div className="update-box">
// // // //                           <h2>Update Question</h2>
// // // //                           <label>
// // // //                             Title:
// // // //                             <input
// // // //                               type="text"
// // // //                               value={currentQuestion.title}
// // // //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
// // // //                             />
// // // //                           </label>
// // // //                           <label>
// // // //                             Description:
// // // //                             <textarea
// // // //                               value={currentQuestion.description}
// // // //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
// // // //                             />
// // // //                           </label>
// // // //                           <button onClick={handleUpdateQuestion}>Update</button>
// // // //                           <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 ) : null
// // // //               ))
// // // //             ) : (
// // // //               <p>No questions available</p>
// // // //             )}
// // // //           </div>
// // // //           {selectedQuestions.length > 0 && (
// // // //             <button onClick={handleDeleteSelected}>Delete Selected</button>
// // // //           )}
// // // //         </section>
// // // //       </section>
// // // //       <footer>
// // // //         <div className="container">
// // // //           <p>&copy; 2024 Baaji Tech Software Solution</p>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Home;




// // // import { useContext, useEffect, useState } from 'react';
// // // import '../../src/home.css';
// // // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // // import { AppState } from '../App';
// // // import axiosBase from '../axiosconfig';

// // // function Home() {
// // //   const [questions, setQuestions] = useState([]);
// // //   const [selectedQuestions, setSelectedQuestions] = useState([]);
// // //   const [editingQuestionId, setEditingQuestionId] = useState(null);
// // //   const [currentQuestion, setCurrentQuestion] = useState({ questiontitle: '', questiondescription: '', questionid: '' });
// // //   const { user } = useContext(AppState);
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     async function fetchQuestions() {
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) {
// // //           throw new Error('No token found in localStorage');
// // //         }

// // //         const { data } = await axiosBase.get('/question/getquestions', {
// // //           headers: {
// // //             Authorization: "Bearer " + token,
// // //           },
// // //         });
// // //         setQuestions(data);
// // //         console.log('Fetched questions:', data);
// // //       } catch (error) {
// // //         console.log('Error fetching questions:', error.response ? error.response.data : error.message);
// // //       }
// // //     }

// // //     fetchQuestions();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (location.state && location.state.newQuestion) {
// // //       setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
// // //     }
// // //   }, [location.state]);

// // //   async function handleDelete(questionId) {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         throw new Error('No token found in localStorage');
// // //       }

// // //       await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// // //         headers: {
// // //           Authorization: "Bearer " + token,
// // //         },
// // //       });

// // //       setQuestions(prevQuestions => prevQuestions.filter(question => question.questionid !== questionId));
// // //       alert('Question deleted successfully');
// // //     } catch (error) {
// // //       if (error.response && error.response.status === 404) {
// // //         alert('You are not authorized to delete this question');
// // //       } else {
// // //         console.log('Error deleting question:', error.response ? error.response.data : error.message);
// // //       }
// // //     }
// // //   }

// // //   async function handleDeleteSelected() {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) {
// // //       alert('No token found in localStorage');
// // //       return;
// // //     }

// // //     try {
// // //       const failedDeletions = [];
// // //       for (const questionId of selectedQuestions) {
// // //         try {
// // //           await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// // //             headers: {
// // //               Authorization: "Bearer " + token,
// // //             },
// // //           });
// // //         } catch (error) {
// // //           if (error.response && error.response.status === 404) {
// // //             failedDeletions.push(questionId);
// // //           } else {
// // //             console.log('Error deleting question:', error.response ? error.response.data : error.message);
// // //           }
// // //         }
// // //       }

// // //       setQuestions(prevQuestions => prevQuestions.filter(question => !selectedQuestions.includes(question.questionid)));
// // //       setSelectedQuestions([]);

// // //       if (failedDeletions.length > 0) {
// // //         alert('Some questions could not be deleted because you are not authorized to delete them');
// // //       } else {
// // //         alert('Selected questions deleted successfully');
// // //       }
// // //     } catch (error) {
// // //       console.log('Error deleting questions:', error.response ? error.response.data : error.message);
// // //     }
// // //   }

// // //   const handleCheckboxChange = (questionId) => {
// // //     setSelectedQuestions(prevSelected =>
// // //       prevSelected.includes(questionId)
// // //         ? prevSelected.filter(id => id !== questionId)
// // //         : [...prevSelected, questionId]
// // //     );
// // //   };

// // //   const handleUpdateClick = (question) => {
// // //     if (question.userid !== user.userid) {
// // //       alert('You cannot update another user\'s question');
// // //       return;
// // //     }
// // //     setCurrentQuestion(question);
// // //     setEditingQuestionId(question.questionid);
// // //   };

// // //   async function handleUpdateQuestion() {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) {
// // //       alert('No token found in localStorage');
// // //       return;
// // //     }

// // //     try {
// // //       await axiosBase.put(`/question/updatequestion/${currentQuestion.questionid}`, currentQuestion, {
// // //         headers: {
// // //           Authorization: "Bearer " + token,
// // //         },
// // //       });

// // //       setQuestions(prevQuestions =>
// // //         prevQuestions.map(q =>
// // //           q.questionid === currentQuestion.questionid ? { ...q, ...currentQuestion } : q
// // //         )
// // //       );

// // //       setEditingQuestionId(null);
// // //       alert('Question updated successfully');
// // //     } catch (error) {
// // //       if (error.response && error.response.status === 404) {
// // //         alert('You are not authorized to update this question');
// // //       } else {
// // //         console.log('Error updating question:', error.response ? error.response.data : error.message);
// // //       }
// // //     }
// // //   }

// // //   async function Logout() {
// // //     localStorage.removeItem('token');
// // //     navigate('/login'); 
// // //   }

// // //   console.log('User object:', user);
// // //   console.log(`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`);

// // //   return (
// // //     <div>
// // //       <header>
// // //         <div className="container">
// // //           <div className="logo"></div>
// // //           <nav className='navbar'>
// // //             <ul>
// // //               <li><a href="/">Home</a></li>
// // //               <li>
// // //                 <button className="btn-nav"><a href="/askquestion">Ask Question</a></button>
// // //               </li>
// // //               <li>
// // //                 <button onClick={Logout} className="logout">Logout</button>
// // //               </li>
// // //             </ul>
// // //           </nav>
// // //         </div>
// // //       </header>
// // //       <div className="hero-content">
// // //         {user.profileImage ? (
// // //           <img src={`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
// // //         ) : (
// // //           <p>No profile image available</p>
// // //         )}
// // //         <h1>Welcome, {user.username}</h1>
// // //         <a href="/askquestion"><button className="btn">Ask Question</button></a>
// // //       </div>

// // //       <section className="hero">
// // //         <div className="container">
// // //           <div className="hero-content">
// // //             <h1>GROW YOUR PROGRAMMING KNOWLEDGE WITH OUR HELP!</h1>
// // //             <a href="/ansquestion"><button className="btn">Answered Question</button></a>
// // //           </div>
// // //         </div>
// // //         <section className='question-section'>
// // //           {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
// // //           <div className="questions-list">
// // //             {questions?.length > 0 ? (
// // //               questions.map((question, index) => (
// // //                 question.questiontitle ? (
// // //                   <div key={index} className="question-title">
// // //                     {question.profileimage ? (
// // //                       <img 
// // //                         src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} 
// // //                         alt="Profile" 
// // //                         className="profile-image" 
// // //                         onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
// // //                       />
// // //                     ) : (
// // //                       <p>No profile image available</p>
// // //                     )}
// // //                     <div className='username'>{question.username}</div>
// // //                     <div className="question-container">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedQuestions.includes(question.questionid)}
// // //                         onChange={() => handleCheckboxChange(question.questionid)}
// // //                       />
// // //                       <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}`}>
// // //                         {question.questiontitle}
// // //                       </Link>
// // //                       <button onClick={() => handleDelete(question.questionid)}>Delete</button>
// // //                       <button onClick={() => handleUpdateClick(question)}>Update</button>
// // //                       {editingQuestionId === question.questionid && (
// // //                         <div className="update-box">
// // //                           <h2>Update Question</h2>
// // //                           <label>
// // //                             Title:
// // //                             <input
// // //                               type="text"
// // //                               value={currentQuestion.questiontitle}
// // //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, questiontitle: e.target.value })}
// // //                             />
// // //                           </label>
// // //                           <label>
// // //                             Description:
// // //                             <textarea
// // //                               value={currentQuestion.questiondescription}
// // //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, questiondescription: e.target.value })}
// // //                             />
// // //                           </label>
// // //                           <button onClick={handleUpdateQuestion}>Update</button>
// // //                           <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 ) : null
// // //               ))
// // //             ) : (
// // //               <p>No questions available</p>
// // //             )}
// // //           </div>
// // //           {selectedQuestions.length > 0 && (
// // //             <button onClick={handleDeleteSelected}>Delete Selected</button>
// // //           )}
// // //         </section>
// // //       </section>
// // //       <footer>
// // //         <div className="container">
// // //           <p>&copy; 2024 Baaji Tech Software Solution</p>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // // export default Home;

// // import { useContext, useEffect, useState } from 'react';
// // import '../../src/home.css';
// // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import { AppState } from '../App';
// // import axiosBase from '../axiosconfig';

// // function Home() {
// //   const [questions, setQuestions] = useState([]);
// //   const [selectedQuestions, setSelectedQuestions] = useState([]);
// //   const [editingQuestionId, setEditingQuestionId] = useState(null);
// //   const [currentQuestion, setCurrentQuestion] = useState({ title: '', description: '', questionid: '' });
// //   const { user } = useContext(AppState);
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     async function fetchQuestions() {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           throw new Error('No token found in localStorage');
// //         }

// //         const { data } = await axiosBase.get('/question/getquestions', {
// //           headers: {
// //             Authorization: "Bearer " + token,
// //           },
// //         });
// //         setQuestions(data);
// //         console.log('Fetched questions:', data);
// //       } catch (error) {
// //         console.log('Error fetching questions:', error.response ? error.response.data : error.message);
// //       }
// //     }

// //     fetchQuestions();
// //   }, []);

// //   useEffect(() => {
// //     if (location.state && location.state.newQuestion) {
// //       setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
// //     }
// //   }, [location.state]);

// //   async function handleDelete(questionId) {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         throw new Error('No token found in localStorage');
// //       }

// //       await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// //         headers: {
// //           Authorization: "Bearer " + token,
// //         },
// //       });

// //       setQuestions(prevQuestions => prevQuestions.filter(question => question.questionid !== questionId));
// //       alert('Question deleted successfully');
// //     } catch (error) {
// //       if (error.response && error.response.status === 404) {
// //         alert('You are not authorized to delete this question');
// //       } else {
// //         console.log('Error deleting question:', error.response ? error.response.data : error.message);
// //       }
// //     }
// //   }

// //   async function handleDeleteSelected() {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       alert('No token found in localStorage');
// //       return;
// //     }

// //     try {
// //       const failedDeletions = [];
// //       for (const questionId of selectedQuestions) {
// //         try {
// //           await axiosBase.delete(`/question/deletequestion/${questionId}`, {
// //             headers: {
// //               Authorization: "Bearer " + token,
// //             },
// //           });
// //         } catch (error) {
// //           if (error.response && error.response.status === 404) {
// //             failedDeletions.push(questionId);
// //           } else {
// //             console.log('Error deleting question:', error.response ? error.response.data : error.message);
// //           }
// //         }
// //       }

// //       setQuestions(prevQuestions => prevQuestions.filter(question => !selectedQuestions.includes(question.questionid)));
// //       setSelectedQuestions([]);

// //       if (failedDeletions.length > 0) {
// //         alert('Some questions could not be deleted because you are not authorized to delete them');
// //       } else {
// //         alert('Selected questions deleted successfully');
// //       }
// //     } catch (error) {
// //       console.log('Error deleting questions:', error.response ? error.response.data : error.message);
// //     }
// //   }

// //   const handleCheckboxChange = (questionId) => {
// //     setSelectedQuestions(prevSelected =>
// //       prevSelected.includes(questionId)
// //         ? prevSelected.filter(id => id !== questionId)
// //         : [...prevSelected, questionId]
// //     );
// //   };

// //   const handleUpdateClick = (question) => {
// //     if (question.userid !== user.userid) {
// //       alert('You cannot update another user\'s question');
// //       return;
// //     }
// //     setCurrentQuestion({ title: question.questiontitle, description: question.questiondescription, questionid: question.questionid });
// //     setEditingQuestionId(question.questionid);
// //   };

// //   async function handleUpdateQuestion() {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       alert('No token found in localStorage');
// //       return;
// //     }

// //     try {
// //       await axiosBase.put(`/question/updatequestion/${currentQuestion.questionid}`, {
// //         title: currentQuestion.title,
// //         description: currentQuestion.description
// //       }, {
// //         headers: {
// //           Authorization: "Bearer " + token,
// //         },
// //       });

// //       setQuestions(prevQuestions =>
// //         prevQuestions.map(q =>
// //           q.questionid === currentQuestion.questionid ? { ...q, questiontitle: currentQuestion.title, questiondescription: currentQuestion.description } : q
// //         )
// //       );

// //       setEditingQuestionId(null);
// //       alert('Question updated successfully');
// //     } catch (error) {
// //       if (error.response && error.response.status === 404) {
// //         alert('You are not authorized to update this question');
// //       } else {
// //         console.log('Error updating question:', error.response ? error.response.data : error.message);
// //       }
// //     }
// //   }

// //   async function Logout() {
// //     localStorage.removeItem('token');
// //     navigate('/login'); 
// //   }

// //   console.log('User object:', user);
// //   console.log(`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`);

// //   return (
// //     <div>
// //       <header>
// //         <div className="container">
// //           <div className="logo"></div>
// //           <nav className='navbar'>
// //             <ul>
// //               <li><a href="/">Home</a></li>
// //               <li>
// //                 <button className="btn-nav"><a href="/askquestion">Ask Question</a></button>
// //               </li>
// //               <li>
// //                 <button onClick={Logout} className="logout">Logout</button>
// //               </li>
// //             </ul>
// //           </nav>
// //         </div>
// //       </header>
// //       <div className="hero-content">
// //         {user.profileImage ? (
// //           <img src={`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
// //         ) : (
// //           <p>No profile image available</p>
// //         )}
// //         <h1>Welcome, {user.username}</h1>
// //         <a href="/askquestion"><button className="btn">Ask Question</button></a>
// //       </div>

// //       <section className="hero">
// //         <div className="container">
// //           <div className="hero-content">
// //             <h1>GROW YOUR PROGRAMMING KNOWLEDGE WITH OUR HELP!</h1>
// //             <a href="/ansquestion"><button className="btn">Answered Question</button></a>
// //           </div>
// //         </div>
// //         <section className='question-section'>
// //           {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
// //           <div className="questions-list">
// //             {questions?.length > 0 ? (
// //               questions.map((question, index) => (
// //                 question.questiontitle ? (
// //                   <div key={index} className="question-title">
// //                     {question.profileimage ? (
// //                       <img 
// //                         src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} 
// //                         alt="Profile" 
// //                         className="profile-image" 
// //                         onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
// //                       />
// //                     ) : (
// //                       <p>No profile image available</p>
// //                     )}
// //                     <div className='username'>{question.username}</div>
// //                     <div className="question-container">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedQuestions.includes(question.questionid)}
// //                         onChange={() => handleCheckboxChange(question.questionid)}
// //                       />
// //                       <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}`}>
// //                         {question.questiontitle}
// //                       </Link>
// //                       <button onClick={() => handleDelete(question.questionid)}>Delete</button>
// //                       <button onClick={() => handleUpdateClick(question)}>Update</button>
// //                       {editingQuestionId === question.questionid && (
// //                         <div className="update-box">
// //                           <h2>Update Question</h2>
// //                           <label>
// //                             Title:
// //                             <input
// //                               type="text"
// //                               value={currentQuestion.title}
// //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
// //                             />
// //                           </label>
// //                           <label>
// //                             Description:
// //                             <textarea
// //                               value={currentQuestion.description}
// //                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
// //                             />
// //                           </label>
// //                           <button onClick={handleUpdateQuestion}>Update</button>
// //                           <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ) : null
// //               ))
// //             ) : (
// //               <p>No questions available</p>
// //             )}
// //           </div>
// //           {selectedQuestions.length > 0 && (
// //             <button onClick={handleDeleteSelected}>Delete Selected</button>
// //           )}
// //         </section>
// //       </section>
// //       <footer>
// //         <div className="container">
// //           <p>&copy; 2024 Baaji Tech Software Solution</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default Home;

// import { useContext, useEffect, useState } from 'react';
// import '../../src/home.css';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AppState } from '../App';
// import axiosBase from '../axiosconfig';

// function Home() {
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [editingQuestionId, setEditingQuestionId] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState({ title: '', description: '', questionid: '' });
//   const { user } = useContext(AppState);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchQuestions() {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found in localStorage');
//         }

//         const { data } = await axiosBase.get('/question/getquestions', {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setQuestions(data);
//         console.log('Fetched questions:', data);
//       } catch (error) {
//         console.log('Error fetching questions:', error.response ? error.response.data : error.message);
//       }
//     }

//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     if (location.state && location.state.newQuestion) {
//       setQuestions(prevQuestions => [location.state.newQuestion, ...prevQuestions]);
//     }
//   }, [location.state]);

//   async function handleDelete(questionId) {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found in localStorage');
//       }

//       await axiosBase.delete('/question/deletequestion', {
//         data: { questionid: questionId },
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });

//       setQuestions(prevQuestions => prevQuestions.filter(question => question.questionid !== questionId));
//       alert('Question deleted successfully');
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         alert('You are not authorized to delete this question');
//       } else {
//         console.log('Error deleting question:', error.response ? error.response.data : error.message);
//       }
//     }
//   }

//   async function handleDeleteSelected() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('No token found in localStorage');
//       return;
//     }

//     try {
//       const failedDeletions = [];
//       for (const questionId of selectedQuestions) {
//         try {
//           await axiosBase.delete('/question/deletequestion', {
//             data: { questionid: questionId },
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           });
//         } catch (error) {
//           if (error.response && error.response.status === 404) {
//             failedDeletions.push(questionId);
//           } else {
//             console.log('Error deleting question:', error.response ? error.response.data : error.message);
//           }
//         }
//       }

//       setQuestions(prevQuestions => prevQuestions.filter(question => !selectedQuestions.includes(question.questionid)));
//       setSelectedQuestions([]);

//       if (failedDeletions.length > 0) {
//         alert('Some questions could not be deleted because you are not authorized to delete them');
//       } else {
//         alert('Selected questions deleted successfully');
//       }
//     } catch (error) {
//       console.log('Error deleting questions:', error.response ? error.response.data : error.message);
//     }
//   }

//   const handleCheckboxChange = (questionId) => {
//     setSelectedQuestions(prevSelected =>
//       prevSelected.includes(questionId)
//         ? prevSelected.filter(id => id !== questionId)
//         : [...prevSelected, questionId]
//     );
//   };

//   const handleUpdateClick = (question) => {
//     if (question.userid !== user.userid) {
//       alert('You cannot update another user\'s question');
//       return;
//     }
//     setCurrentQuestion({ title: question.questiontitle, description: question.questiondescription, questionid: question.questionid });
//     setEditingQuestionId(question.questionid);
//   };

//   async function handleUpdateQuestion() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('No token found in localStorage');
//       return;
//     }

//     try {
//       await axiosBase.put(`/question/updatequestion/${currentQuestion.questionid}`, {
//         title: currentQuestion.title,
//         description: currentQuestion.description
//       }, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });

//       setQuestions(prevQuestions =>
//         prevQuestions.map(q =>
//           q.questionid === currentQuestion.questionid ? { ...q, questiontitle: currentQuestion.title, questiondescription: currentQuestion.description } : q
//         )
//       );

//       setEditingQuestionId(null);
//       alert('Question updated successfully');
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         alert('You are not authorized to update this question');
//       } else {
//         console.log('Error updating question:', error.response ? error.response.data : error.message);
//       }
//     }
//   }

//   async function Logout() {
//     localStorage.removeItem('token');
//     navigate('/login'); 
//   }

//   console.log('User object:', user);
//   console.log(`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`);

//   return (
//     <div>
//       <header>
//         <div className="container">
//           <div className="logo"></div>
//           <nav className='navbar'>
//             <ul>
//               <li><a href="/">Home</a></li>
//               <li>
//                 <button className="btn-nav"><a href="/askquestion">Ask Question</a></button>
//               </li>
//               <li>
//                 <button onClick={Logout} className="logout">Logout</button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//       <div className="hero-content">
//         {user.profileImage ? (
//           <img src={`${backendUrl}/${user.profileImage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
//         ) : (
//           <p>No profile image available</p>
//         )}
//         <h1>Welcome, {user.username}</h1>
//         <a href="/askquestion"><button className="btn">Ask Question</button></a>
//       </div>

//       <section className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1>GROW YOUR PROGRAMMING KNOWLEDGE WITH OUR HELP!</h1>
//             <a href="/ansquestion"><button className="btn">Answered Question</button></a>
//           </div>
//         </div>
//         <section className='question-section'>
//           {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
//           <div className="questions-list">
//             {questions?.length > 0 ? (
//               questions.map((question, index) => (
//                 question.questiontitle ? (
//                   <div key={index} className="question-title">
//                     {question.profileimage ? (
//                       <img 
//                         src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} 
//                         alt="Profile" 
//                         className="profile-image" 
//                         onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
//                       />
//                     ) : (
//                       <p>No profile image available</p>
//                     )}
//                     <div className='username'>{question.username}</div>
//                     <div className="question-container">
//                       <input
//                         type="checkbox"
//                         checked={selectedQuestions.includes(question.questionid)}
//                         onChange={() => handleCheckboxChange(question.questionid)}
//                       />
//                       <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}&userid=${encodeURIComponent(question.userid)}`}>
//                         {question.questiontitle}
//                       </Link>
//                       <button onClick={() => handleDelete(question.questionid)}>Delete</button>
//                       <button onClick={() => handleUpdateClick(question)}>Update</button>
//                       {editingQuestionId === question.questionid && (
//                         <div className="update-box">
//                           <h2>Update Question</h2>
//                           <label>
//                             Title:
//                             <input
//                               type="text"
//                               value={currentQuestion.title}
//                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
//                             />
//                           </label>
//                           <label>
//                             Description:
//                             <textarea
//                               value={currentQuestion.description}
//                               onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
//                             />
//                           </label>
//                           <button onClick={handleUpdateQuestion}>Update</button>
//                           <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ) : null
//               ))
//             ) : (
//               <p>No questions available</p>
//             )}
//           </div>
//           {selectedQuestions.length > 0 && (
//             <button onClick={handleDeleteSelected}>Delete Selected</button>
//           )}
//         </section>
//       </section>
//       <footer>
//         <div className="container">
//           <p>&copy; 2024 Baaji Tech Software Solution</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;




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
              <button>
            <Link to="/">Home</Link></button>
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
        <h1>Welcome, {user.username}</h1>
        <Link to="/askquestion"><button>Ask Question</button></Link>
      </div>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>"The cure for ignorance is to ask" <br />
            <strong>Prophet Muhammad (PBUH)</strong> </h1>
          </div>
        </div>
        <section className='question-section'>
          {questions?.length > 0 && <h1 className="question-title">Questions</h1>}
          <div className="questions-list">
            {questions?.length > 0 ? (
              questions.map((question, index) => (
                question.questiontitle ? (
                  <div key={index} className="question-title">
                    {/* {question.profileimage ? (
                      <img 
                      src={`${backendUrl}/${question.profileImage.replace(/\\/g, '/')}`} 
                        // src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} 
                        alt="Profile" 
                        className="profile-image" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg"; }} 
                      />
                    ) : (
                      <p>No profile image available</p>
                    )} */}

{question.profileimage ? (
          <img src={`${backendUrl}/${question.profileimage.replace(/\\/g, '/')}`} alt="Profile" className="profile-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback.jpg" }} />
        ) : (
          <p>No profile image available</p>
        )}
                    <div className='username'>{question.username}</div>
                    <div className="question-container">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.questionid)}
                        onChange={() => handleCheckboxChange(question.questionid)}
                      />
                      <Link to={`/ansquestion?id=${question.questionid}&title=${encodeURIComponent(question.questiontitle)}&description=${encodeURIComponent(question.questiondescription)}&username=${encodeURIComponent(question.username)}&userid=${encodeURIComponent(question.userid)}`}>
                        {question.questiontitle}
                      </Link>
                      <button onClick={() => handleDelete(question.questionid, question.userid)}>Delete</button>
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
