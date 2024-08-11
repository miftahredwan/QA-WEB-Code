// // // // // // // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // import '../ansque.css';
// // // // // // // // // // // // import axiosBase from '../axiosconfig';

// // // // // // // // // // // // function AnsQuestion() {
// // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // //   const [question, setQuestion] = useState({});
// // // // // // // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // // // // // // //     const id = query.get('id');
// // // // // // // // // // // //     const title = query.get('title');
// // // // // // // // // // // //     const description = query.get('description');
// // // // // // // // // // // //     const username = query.get('username');
// // // // // // // // // // // //     setQuestion({ id, title, description, username });

// // // // // // // // // // // //     // Fetch the answers when the component mounts
// // // // // // // // // // // //     const fetchAnswers = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const token = localStorage.getItem('token');
// // // // // // // // // // // //         if (!token) {
// // // // // // // // // // // //           throw new Error('No token found in localStorage');
// // // // // // // // // // // //         }
// // // // // // // // // // // //         const { data } = await axiosBase.get(`/answers/getanswers/${id}`, {
// // // // // // // // // // // //           headers: {
// // // // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // // // //           },
// // // // // // // // // // // //         });
// // // // // // // // // // // //         setAnswers(data.answers);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.log('Error fetching answers:', error);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     fetchAnswers();

// // // // // // // // // // // //   }, [location.search]);

// // // // // // // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // // // // //       if (!token) {
// // // // // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // // // // //       }

// // // // // // // // // // // //       const { data } = await axiosBase.post(
// // // // // // // // // // // //         `/answers/postanswerpage/${question.id}`,
// // // // // // // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // // // // // // //         {
// // // // // // // // // // // //           headers: {
// // // // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // // // //           },
// // // // // // // // // // // //         }
// // // // // // // // // // // //       );

// // // // // // // // // // // //       setNewAnswer('');
// // // // // // // // // // // //       alert("Posted Successfully");

// // // // // // // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer }, ...prevAnswers]);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.log('Error posting answer:', error);
// // // // // // // // // // // //       if (error.response) {
// // // // // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // // // // //       } else if (error.request) {
// // // // // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div>
// // // // // // // // // // // //       <nav className="nav">
// // // // // // // // // // // //         <ul>
// // // // // // // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // // // // // // //           <li><a href="#">How it Works</a></li>
// // // // // // // // // // // //           <li><a href="/login"><button className="logout">LogOut</button></a></li>
// // // // // // // // // // // //         </ul>
// // // // // // // // // // // //       </nav>
// // // // // // // // // // // //       <div className="container">
// // // // // // // // // // // //         <div className="logo">
// // // // // // // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <h1>Question</h1>
// // // // // // // // // // // //         <div className="question-details">
// // // // // // // // // // // //           <h2>{question.title}</h2>
// // // // // // // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // // // // // // //           <p>{question.description}</p>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="answers-section">
// // // // // // // // // // // //           <h2>Answer From The Community</h2>
// // // // // // // // // // // //           {answers.length > 0 ? (
// // // // // // // // // // // //             answers.map((answer, index) => (
// // // // // // // // // // // //               <div key={index} className="answer">
// // // // // // // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             ))
// // // // // // // // // // // //           ) : (
// // // // // // // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // // // // // // //           )}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="form-container">
// // // // // // // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // // // // // // //           <textarea
// // // // // // // // // // // //             id="newAnswer"
// // // // // // // // // // // //             name="newAnswer"
// // // // // // // // // // // //             value={newAnswer}
// // // // // // // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // // // // // // //             placeholder="Enter your answer here"
// // // // // // // // // // // //           />
// // // // // // // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default AnsQuestion;



// // // // // // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // import '../ansque.css';
// // // // // // // // // // // import axiosBase from '../axiosconfig';

// // // // // // // // // // // function AnsQuestion() {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const [question, setQuestion] = useState({});
// // // // // // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // // // // // //     const id = query.get('id');
// // // // // // // // // // //     const title = query.get('title');
// // // // // // // // // // //     const description = query.get('description');
// // // // // // // // // // //     const username = query.get('username');
// // // // // // // // // // //     const userid = query.get('userid');
// // // // // // // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // // // // // // //     // Fetch the answers when the component mounts
// // // // // // // // // // //     const fetchAnswers = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const token = localStorage.getItem('token');
// // // // // // // // // // //         if (!token) {
// // // // // // // // // // //           throw new Error('No token found in localStorage');
// // // // // // // // // // //         }
// // // // // // // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // // //           },
// // // // // // // // // // //         });
// // // // // // // // // // //         setAnswers(data);
// // // // // // // // // // //         console.log(data)
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.log('Error fetching answers:', error);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchAnswers();

// // // // // // // // // // //   }, [location.search]);

// // // // // // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // // // //       if (!token) {
// // // // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // // // //       }

// // // // // // // // // // //       const { data } = await axiosBase.post(
// // // // // // // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // // // // // //         {
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // // //           },
// // // // // // // // // // //         }
// // // // // // // // // // //       );

// // // // // // // // // // //       setNewAnswer('');
// // // // // // // // // // //       alert("Posted Successfully");
// // // // // // // // // // //       console.log(data.answer)
// // // // // // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer}, ...prevAnswers]);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.log('Error posting answer:', error);
// // // // // // // // // // //       if (error.response) {
// // // // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // // // //       } else if (error.request) {
// // // // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // // // // // //   const handleDeleteAnswer = async (answerid) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // // // //       if (!token) {
// // // // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // // // //       }

// // // // // // // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`,
// // // // // // // // // // //          { 
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           Authorization: "Bearer " + token,
// // // // // // // // // // //         },
// // // // // // // // // // //       });

// // // // // // // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid!== answerid));
// // // // // // // // // // //       alert("Answer deleted successfully");
// // // // // // // // // // //       console.log(answerid)
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.log('Error deleting answer:', error);
// // // // // // // // // // //       if (error.response) {
// // // // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // // // //       } else if (error.request) {
// // // // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   async function Logout() {
// // // // // // // // // // //     // Remove the token from local storage
// // // // // // // // // // //     localStorage.removeItem('token');
    
// // // // // // // // // // //     // Navigate to the login page or home page
// // // // // // // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // // // // // // // }


// // // // // // // // // // //   return (
// // // // // // // // // // //     <div>
// // // // // // // // // // //       <nav className="nav">
// // // // // // // // // // //         <ul>
// // // // // // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // // // // // // //         </ul>
// // // // // // // // // // //       </nav>
// // // // // // // // // // //       <div className="container">
// // // // // // // // // // //         <div className="logo">
// // // // // // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <h1>Question</h1>
// // // // // // // // // // //         <div className="question-details">
// // // // // // // // // // //           <h2>{question.title}</h2>
// // // // // // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // // // // // //           <p>{question.description}</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="answers-section">
// // // // // // // // // // //           <h2>Answer From The Community</h2>
// // // // // // // // // // //           {answers.length > 0 ? (
// // // // // // // // // // //             answers.map((answer, index) => (
// // // // // // // // // // //               <div key={index} className="answer">
// // // // // // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // // // // // //                 <div className="username">{answer.userid}</div>
// // // // // // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid)}>Delete</button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))
// // // // // // // // // // //           ) : (
// // // // // // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="form-container">
// // // // // // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // // // // // //           <textarea
// // // // // // // // // // //             id="newAnswer"
// // // // // // // // // // //             name="newAnswer"
// // // // // // // // // // //             value={newAnswer}
// // // // // // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // // // // // //             placeholder="Enter your answer here"
// // // // // // // // // // //           />
// // // // // // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // export default AnsQuestion;


// // // // // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // import '../ansque.css';
// // // // // // // // // // import axiosBase from '../axiosconfig';
// // // // // // // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // // // // // // function AnsQuestion() {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const [question, setQuestion] = useState({});
// // // // // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // // // // //     const id = query.get('id');
// // // // // // // // // //     const title = query.get('title');
// // // // // // // // // //     const description = query.get('description');
// // // // // // // // // //     const username = query.get('username');
// // // // // // // // // //     const userid = query.get('userid');
// // // // // // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // // // // // //     // Fetch the answers when the component mounts
// // // // // // // // // //     const fetchAnswers = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const token = localStorage.getItem('token');
// // // // // // // // // //         if (!token) {
// // // // // // // // // //           throw new Error('No token found in localStorage');
// // // // // // // // // //         }
// // // // // // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // // // // // //           headers: {
// // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // //           },
// // // // // // // // // //         });
// // // // // // // // // //         setAnswers(data);
// // // // // // // // // //         console.log(data);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.log('Error fetching answers:', error);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchAnswers();

// // // // // // // // // //   }, [location.search]);

// // // // // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     try {
// // // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // // //       if (!token) {
// // // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // // //       }

// // // // // // // // // //       const { data } = await axiosBase.post(
// // // // // // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // // // // //         {
// // // // // // // // // //           headers: {
// // // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // // //           },
// // // // // // // // // //         }
// // // // // // // // // //       );

// // // // // // // // // //       setNewAnswer('');
// // // // // // // // // //       alert("Posted Successfully");
// // // // // // // // // //       console.log(data.answer);
// // // // // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer, userid: user.userid }, ...prevAnswers]);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log('Error posting answer:', error);
// // // // // // // // // //       if (error.response) {
// // // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // // //       } else if (error.request) {
// // // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // // //       } else {
// // // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // // // // //     }
// // // // // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // // // // // // //     try {
// // // // // // // // // //       // Check if the current user is the owner of the answer
// // // // // // // // // //       if (userid !== user.userid) {
// // // // // // // // // //         alert('You cannot delete another user\'s answer');
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // // //       if (!token) {
// // // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // // //       }

// // // // // // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // // // // // // //         headers: {
// // // // // // // // // //           Authorization: "Bearer " + token,
// // // // // // // // // //         },
// // // // // // // // // //       });

// // // // // // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // // // // // // //       alert("Answer deleted successfully");
// // // // // // // // // //       console.log(answerid);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log('Error deleting answer:', error);
// // // // // // // // // //       if (error.response) {
// // // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // // //       } else if (error.request) {
// // // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // // //       } else {
// // // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   async function Logout() {
// // // // // // // // // //     // Remove the token from local storage
// // // // // // // // // //     localStorage.removeItem('token');
    
// // // // // // // // // //     // Navigate to the login page or home page
// // // // // // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <nav className="nav">
// // // // // // // // // //         <ul>
// // // // // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // // // // // //         </ul>
// // // // // // // // // //       </nav>
// // // // // // // // // //       <div className="container">
// // // // // // // // // //         <div className="logo">
// // // // // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // // // // //         </div>
// // // // // // // // // //         <h1>Question</h1>
// // // // // // // // // //         <div className="question-details">
// // // // // // // // // //           <h2>{question.title}</h2>
// // // // // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // // // // //           <p>{question.description}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="answers-section">
// // // // // // // // // //           <h2>Answer From The Community</h2>
// // // // // // // // // //           {answers.length > 0 ? (
// // // // // // // // // //             answers.map((answer, index) => (
// // // // // // // // // //               <div key={index} className="answer">
// // // // // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // // // // //                 <div className="username">{answer.userid}</div>
// // // // // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // // // // // // //               </div>
// // // // // // // // // //             ))
// // // // // // // // // //           ) : (
// // // // // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // // // // //           )}
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-container">
// // // // // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // // // // //           <textarea
// // // // // // // // // //             id="newAnswer"
// // // // // // // // // //             name="newAnswer"
// // // // // // // // // //             value={newAnswer}
// // // // // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // // // // //             placeholder="Enter your answer here"
// // // // // // // // // //           />
// // // // // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default AnsQuestion;


// // // // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import '../ansque.css';
// // // // // // // // // import axiosBase from '../axiosconfig';
// // // // // // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // // // // // function AnsQuestion() {
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const [question, setQuestion] = useState({});
// // // // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // // // //     const id = query.get('id');
// // // // // // // // //     const title = query.get('title');
// // // // // // // // //     const description = query.get('description');
// // // // // // // // //     const username = query.get('username');
// // // // // // // // //     const userid = query.get('userid');
// // // // // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // // // // //     // Fetch the answers when the component mounts
// // // // // // // // //     const fetchAnswers = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const token = localStorage.getItem('token');
// // // // // // // // //         if (!token) {
// // // // // // // // //           throw new Error('No token found in localStorage');
// // // // // // // // //         }
// // // // // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // // // // //           headers: {
// // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // //           },
// // // // // // // // //         });
// // // // // // // // //         setAnswers(data.filter(answer => answer.questionid === id));
// // // // // // // // //         console.log(data);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.log('Error fetching answers:', error);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchAnswers();
// // // // // // // // //   }, [location.search]);

// // // // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // //       if (!token) {
// // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // //       }

// // // // // // // // //       const { data } = await axiosBase.post(
// // // // // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // // // //         {
// // // // // // // // //           headers: {
// // // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // // //           },
// // // // // // // // //         }
// // // // // // // // //       );

// // // // // // // // //       setNewAnswer('');
// // // // // // // // //       alert("Posted Successfully");
// // // // // // // // //       console.log(data.answer);
// // // // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer, userid: user.userid }, ...prevAnswers]);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log('Error posting answer:', error);
// // // // // // // // //       if (error.response) {
// // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // //       } else if (error.request) {
// // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // //       } else {
// // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // // // //     }
// // // // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // // // // // //     console.log('Attempting to delete answer:', answerid);
// // // // // // // // //     console.log('Answer user ID:', userid);
// // // // // // // // //     console.log('Current user ID:', user.userid);

// // // // // // // // //     try {
// // // // // // // // //       // Check if the current user is the owner of the answer
// // // // // // // // //       if (userid !== user.userid) {
// // // // // // // // //         alert('You cannot delete another user\'s answer');
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // // //       if (!token) {
// // // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // // //       }

// // // // // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // // // // // //         headers: {
// // // // // // // // //           Authorization: "Bearer " + token,
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // // // // // //       alert("Answer deleted successfully");
// // // // // // // // //       console.log(answerid);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log('Error deleting answer:', error);
// // // // // // // // //       if (error.response) {
// // // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // // //       } else if (error.request) {
// // // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // // //       } else {
// // // // // // // // //         console.log('Error message:', error.message);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   async function Logout() {
// // // // // // // // //     // Remove the token from local storage
// // // // // // // // //     localStorage.removeItem('token');
    
// // // // // // // // //     // Navigate to the login page or home page
// // // // // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <nav className="nav">
// // // // // // // // //         <ul>
// // // // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // // // // //         </ul>
// // // // // // // // //       </nav>
// // // // // // // // //       <div className="container">
// // // // // // // // //         <div className="logo">
// // // // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // // // //         </div>
// // // // // // // // //         <h1>Question</h1>
// // // // // // // // //         <div className="question-details">
// // // // // // // // //           <h2>{question.title}</h2>
// // // // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // // // //           <p>{question.description}</p>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="answers-section">
// // // // // // // // //           <h2>Answer From The Community</h2>
// // // // // // // // //           {answers.length > 0 ? (
// // // // // // // // //             answers.map((answer, index) => (
// // // // // // // // //               <div key={index} className="answer">
// // // // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // // // //                 <div className="username">{answer.userid}</div>
// // // // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // // // // // //               </div>
// // // // // // // // //             ))
// // // // // // // // //           ) : (
// // // // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // // // //           )}
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-container">
// // // // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // // // //           <textarea
// // // // // // // // //             id="newAnswer"
// // // // // // // // //             name="newAnswer"
// // // // // // // // //             value={newAnswer}
// // // // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // // // //             placeholder="Enter your answer here"
// // // // // // // // //           />
// // // // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default AnsQuestion;



// // // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // import '../ansque.css';
// // // // // // // // import axiosBase from '../axiosconfig';
// // // // // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // // // // function AnsQuestion() {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const [question, setQuestion] = useState({});
// // // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // // // // //   useEffect(() => {
// // // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // // //     const id = query.get('id');
// // // // // // // //     const title = query.get('title');
// // // // // // // //     const description = query.get('description');
// // // // // // // //     const username = query.get('username');
// // // // // // // //     const userid = query.get('userid');
// // // // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // // // //     // Fetch the answers when the component mounts
// // // // // // // //     const fetchAnswers = async () => {
// // // // // // // //       try {
// // // // // // // //         const token = localStorage.getItem('token');
// // // // // // // //         if (!token) {
// // // // // // // //           throw new Error('No token found in localStorage');
// // // // // // // //         }
// // // // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // // // //           headers: {
// // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // //           },
// // // // // // // //         });
// // // // // // // //         setAnswers(data);
// // // // // // // //         console.log(data);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.log('Error fetching answers:', error);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchAnswers();
// // // // // // // //   }, [location.search]);

// // // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     try {
// // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // //       if (!token) {
// // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // //       }

// // // // // // // //       const { data } = await axiosBase.post(
// // // // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // // //         {
// // // // // // // //           headers: {
// // // // // // // //             Authorization: "Bearer " + token,
// // // // // // // //           },
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       setNewAnswer('');
// // // // // // // //       alert("Posted Successfully");
// // // // // // // //       console.log(data.answer);
// // // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer, answerid: data.answerid, userid: user.userid }, ...prevAnswers]);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log('Error posting answer:', error);
// // // // // // // //       if (error.response) {
// // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // //       } else if (error.request) {
// // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // //       } else {
// // // // // // // //         console.log('Error message:', error.message);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // // //     }
// // // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // // // // //     console.log('Attempting to delete answer:', answerid);
// // // // // // // //     console.log('Answer user ID:', userid);
// // // // // // // //     console.log('Current user ID:', user.userid);

// // // // // // // //     try {
// // // // // // // //       // Check if the current user is the owner of the answer
// // // // // // // //       if (userid !== user.userid) {
// // // // // // // //         alert('You cannot delete another user\'s answer');
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       const token = localStorage.getItem('token');
// // // // // // // //       if (!token) {
// // // // // // // //         throw new Error('No token found in localStorage');
// // // // // // // //       }

// // // // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // // // // //         headers: {
// // // // // // // //           Authorization: "Bearer " + token,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // // // // //       alert("Answer deleted successfully");
// // // // // // // //       console.log(answerid);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log('Error deleting answer:', error);
// // // // // // // //       if (error.response) {
// // // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // // //       } else if (error.request) {
// // // // // // // //         console.log('Error request data:', error.request);
// // // // // // // //       } else {
// // // // // // // //         console.log('Error message:', error.message);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   async function Logout() {
// // // // // // // //     // Remove the token from local storage
// // // // // // // //     localStorage.removeItem('token');
    
// // // // // // // //     // Navigate to the login page or home page
// // // // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <nav className="nav">
// // // // // // // //         <ul>
// // // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // // // //         </ul>
// // // // // // // //       </nav>
// // // // // // // //       <div className="container">
// // // // // // // //         <div className="logo">
// // // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // // //         </div>
// // // // // // // //         <h1>Question</h1>
// // // // // // // //         <div className="question-details">
// // // // // // // //           <h2>{question.title}</h2>
// // // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // // //           <p>{question.description}</p>
// // // // // // // //         </div>
// // // // // // // //         <div className="answers-section">
// // // // // // // //           <h2>Answer From The Community</h2>
// // // // // // // //           {answers.length > 0 ? (
// // // // // // // //             answers.filter(answer => answer.questionid === question.id).map((answer, index) => (
// // // // // // // //               <div key={index} className="answer">
// // // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // // //                 <div className="username">{answer.userid}</div>
// // // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // // // // //               </div>
// // // // // // // //             ))
// // // // // // // //           ) : (
// // // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //         <div className="form-container">
// // // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // // //           <textarea
// // // // // // // //             id="newAnswer"
// // // // // // // //             name="newAnswer"
// // // // // // // //             value={newAnswer}
// // // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // // //             placeholder="Enter your answer here"
// // // // // // // //           />
// // // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default AnsQuestion;




// // // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // import '../ansque.css';
// // // // // // // import axiosBase from '../axiosconfig';
// // // // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // // // function AnsQuestion() {
// // // // // // //   const location = useLocation();
// // // // // // //   const [question, setQuestion] = useState({});
// // // // // // //   const [answers, setAnswers] = useState([]);
// // // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // // // //   useEffect(() => {
// // // // // // //     const query = new URLSearchParams(location.search);
// // // // // // //     const id = query.get('id');
// // // // // // //     const title = query.get('title');
// // // // // // //     const description = query.get('description');
// // // // // // //     const username = query.get('username');
// // // // // // //     const userid = query.get('userid');
// // // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // // //     // Fetch the answers when the component mounts
// // // // // // //     const fetchAnswers = async () => {
// // // // // // //       try {
// // // // // // //         const token = localStorage.getItem('token');
// // // // // // //         if (!token) {
// // // // // // //           throw new Error('No token found in localStorage');
// // // // // // //         }
// // // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // // //           headers: {
// // // // // // //             Authorization: "Bearer " + token,
// // // // // // //           },
// // // // // // //         });
// // // // // // //         setAnswers(data);
// // // // // // //         console.log(data);
// // // // // // //       } catch (error) {
// // // // // // //         console.log('Error fetching answers:', error);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchAnswers();
// // // // // // //   }, [location.search]);

// // // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem('token');
// // // // // // //       if (!token) {
// // // // // // //         throw new Error('No token found in localStorage');
// // // // // // //       }

// // // // // // //       const { data } = await axiosBase.post(
// // // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: "Bearer " + token,
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       setNewAnswer('');
// // // // // // //       alert("Posted Successfully");
// // // // // // //       console.log(data.answer);
// // // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer, answerid: data.answerid, userid: data.userid }, ...prevAnswers]);
// // // // // // //     }catch (error) {
// // // // // // //       console.log('Error posting answer:', error);
// // // // // // //       if (error.response) {
// // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // //       } else if (error.request) {
// // // // // // //         console.log('Error request data:', error.request);
// // // // // // //       } else {
// // // // // // //         console.log('Error message:', error.message);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     if (location.state && location.state.newAnswer) {
// // // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // // //     }
// // // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // // // //     console.log('Attempting to delete answer:', answerid);
// // // // // // //     console.log('Answer user ID:', userid);
// // // // // // //     console.log('Current user ID:', user.userid);

// // // // // // //     try {
// // // // // // //       // Check if the current user is the owner of the answer
// // // // // // //       if (userid !== user.userid) {
// // // // // // //         alert('You cannot delete another user\'s answer');
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const token = localStorage.getItem('token');
// // // // // // //       if (!token) {
// // // // // // //         throw new Error('No token found in localStorage');
// // // // // // //       }

// // // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // // // //         headers: {
// // // // // // //           Authorization: "Bearer " + token,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // // // //       alert("Answer deleted successfully");
// // // // // // //       console.log(answerid);
// // // // // // //     } catch (error) {
// // // // // // //       console.log('Error deleting answer:', error);
// // // // // // //       if (error.response) {
// // // // // // //         console.log('Error response data:', error.response.data);
// // // // // // //         console.log('Error response status:', error.response.status);
// // // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // // //       } else if (error.request) {
// // // // // // //         console.log('Error request data:', error.request);
// // // // // // //       } else {
// // // // // // //         console.log('Error message:', error.message);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   async function Logout() {
// // // // // // //     // Remove the token from local storage
// // // // // // //     localStorage.removeItem('token');
    
// // // // // // //     // Navigate to the login page or home page
// // // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <nav className="nav">
// // // // // // //         <ul>
// // // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // // //         </ul>
// // // // // // //       </nav>
// // // // // // //       <div className="container">
// // // // // // //         <div className="logo">
// // // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // // //         </div>
// // // // // // //         <h1>Question</h1>
// // // // // // //         <div className="question-details">
// // // // // // //           <h2>{question.title}</h2>
// // // // // // //           <p>Asked by: {question.username}</p>
// // // // // // //           <p>{question.description}</p>
// // // // // // //         </div>
// // // // // // //         <div className="answers-section">
// // // // // // //           <h2>Answer From The Community</h2>
// // // // // // //           {answers.length > 0 ? (
// // // // // // //             answers.filter(answer => answer.questionid === question.id).map((answer, index) => (
// // // // // // //               <div key={index} className="answer">
// // // // // // //                 <div className="username">{answer.username}</div>
// // // // // // //                 <div className="username">{answer.userid}</div>
// // // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // // // //               </div>
// // // // // // //             ))
// // // // // // //           ) : (
// // // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //         <div className="form-container">
// // // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // // //           <textarea
// // // // // // //             id="newAnswer"
// // // // // // //             name="newAnswer"
// // // // // // //             value={newAnswer}
// // // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // // //             placeholder="Enter your answer here"
// // // // // // //           />
// // // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default AnsQuestion;


// // // // // // // eslint-disable-next-line no-unused-vars
// // // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // import '../ansque.css';
// // // // // // import axiosBase from '../axiosconfig';
// // // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // // function AnsQuestion() {
// // // // // //   const location = useLocation();
// // // // // //   const [question, setQuestion] = useState({});
// // // // // //   const [answers, setAnswers] = useState([]);
// // // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // // //   const navigate = useNavigate();
// // // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // // //   useEffect(() => {
// // // // // //     const query = new URLSearchParams(location.search);
// // // // // //     const id = query.get('id');
// // // // // //     const title = query.get('title');
// // // // // //     const description = query.get('description');
// // // // // //     const username = query.get('username');
// // // // // //     const userid = query.get('userid');
// // // // // //     setQuestion({ id, title, description, username, userid });

// // // // // //     // Fetch the answers when the component mounts
// // // // // //     const fetchAnswers = async () => {
// // // // // //       try {
// // // // // //         const token = localStorage.getItem('token');
// // // // // //         if (!token) {
// // // // // //           throw new Error('No token found in localStorage');
// // // // // //         }
// // // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // // //           headers: {
// // // // // //             Authorization: "Bearer " + token,
// // // // // //           },
// // // // // //         });
// // // // // //         setAnswers(data);
// // // // // //         console.log('Fetched answers:', data);
// // // // // //       } catch (error) {
// // // // // //         console.log('Error fetching answers:', error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchAnswers();
// // // // // //   }, [location.search]);

// // // // // //   const handleAnswerSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       if (!token) {
// // // // // //         throw new Error('No token found in localStorage');
// // // // // //       }

// // // // // //       const { data } = await axiosBase.post(
// // // // // //         `/answer/postAnswer/${question.id}`,
// // // // // //         { answer: newAnswer, questionid: question.id },
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: "Bearer " + token,
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setNewAnswer('');
// // // // // //       alert("Posted Successfully");
// // // // // //       console.log('Posted answer:', data);
// // // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid }, ...prevAnswers]);
// // // // // //     } catch (error) {
// // // // // //       console.log('Error posting answer:', error);
// // // // // //       if (error.response) {
// // // // // //         console.log('Error response data:', error.response.data);
// // // // // //         console.log('Error response status:', error.response.status);
// // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // //       } else if (error.request) {
// // // // // //         console.log('Error request data:', error.request);
// // // // // //       } else {
// // // // // //         console.log('Error message:', error.message);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (location.state && location.state.newAnswer) {
// // // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // // //     }
// // // // // //   }, [location.state, location.pathname, navigate]);

// // // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // // //     console.log('Attempting to delete answer:', answerid);
// // // // // //     console.log('Answer user ID:', userid);
// // // // // //     console.log('Current user ID:', user.userid);

// // // // // //     try {
// // // // // //       // Check if the current user is the owner of the answer
// // // // // //       if (userid !== user.userid) {
// // // // // //         alert('You cannot delete another user\'s answer');
// // // // // //         return;
// // // // // //       }

// // // // // //       const token = localStorage.getItem('token');
// // // // // //       if (!token) {
// // // // // //         throw new Error('No token found in localStorage');
// // // // // //       }

// // // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // // //         headers: {
// // // // // //           Authorization: "Bearer " + token,
// // // // // //         },
// // // // // //       });

// // // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // // //       alert("Answer deleted successfully");
// // // // // //       console.log('Deleted answer ID:', answerid);
// // // // // //     } catch (error) {
// // // // // //       console.log('Error deleting answer:', error);
// // // // // //       if (error.response) {
// // // // // //         console.log('Error response data:', error.response.data);
// // // // // //         console.log('Error response status:', error.response.status);
// // // // // //         console.log('Error response headers:', error.response.headers);
// // // // // //       } else if (error.request) {
// // // // // //         console.log('Error request data:', error.request);
// // // // // //       } else {
// // // // // //         console.log('Error message:', error.message);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   async function Logout() {
// // // // // //     // Remove the token from local storage
// // // // // //     localStorage.removeItem('token');
    
// // // // // //     // Navigate to the login page or home page
// // // // // //     navigate('/login'); // Adjust the URL as needed
// // // // // //   }

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <nav className="nav">
// // // // // //         <ul>
// // // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // // //         </ul>
// // // // // //       </nav>
// // // // // //       <div className="container">
// // // // // //         <div className="logo">
// // // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // // //         </div>
// // // // // //         <h1>Question</h1>
// // // // // //         <div className="question-details">
// // // // // //           <h2>{question.title}</h2>
// // // // // //           <p>Asked by: {question.username}</p>
// // // // // //           <p>{question.description}</p>
// // // // // //         </div>
// // // // // //         <div className="answers-section">
// // // // // //           <h2>Answer From The Community</h2>
// // // // // //           {answers.length > 0 ? (
// // // // // //             answers.filter(answer => answer.questionid === question.id).map((answer, index) => (
// // // // // //               <div key={index} className="answer">
// // // // // //                 <div className="username">{answer.username}</div>
// // // // // //                 <div className="username">{answer.userid}</div>
// // // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // // //               </div>
// // // // // //             ))
// // // // // //           ) : (
// // // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // // //           )}
// // // // // //         </div>
// // // // // //         <div className="form-container">
// // // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // // //           <textarea
// // // // // //             id="newAnswer"
// // // // // //             name="newAnswer"
// // // // // //             value={newAnswer}
// // // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // // //             placeholder="Enter your answer here"
// // // // // //           />
// // // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default AnsQuestion;



// // // // // // eslint-disable-next-line no-unused-vars
// // // // // import React, { useEffect, useState, useContext } from 'react';
// // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // import '../ansque.css';
// // // // // import axiosBase from '../axiosconfig';
// // // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // // function AnsQuestion() {
// // // // //   const location = useLocation();
// // // // //   const [question, setQuestion] = useState({});
// // // // //   const [answers, setAnswers] = useState([]);
// // // // //   const [newAnswer, setNewAnswer] = useState('');
// // // // //   const navigate = useNavigate();
// // // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // // //   useEffect(() => {
// // // // //     const query = new URLSearchParams(location.search);
// // // // //     const id = query.get('id');
// // // // //     const title = query.get('title');
// // // // //     const description = query.get('description');
// // // // //     const username = query.get('username');
// // // // //     const userid = query.get('userid');
// // // // //     setQuestion({ id, title, description, username, userid });

// // // // //     // Fetch the answers when the component mounts
// // // // //     const fetchAnswers = async () => {
// // // // //       try {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) {
// // // // //           throw new Error('No token found in localStorage');
// // // // //         }
// // // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // // //           headers: {
// // // // //             Authorization: "Bearer " + token,
// // // // //           },
// // // // //         });
// // // // //         setAnswers(data);
// // // // //         console.log('Fetched answers:', data);
// // // // //       } catch (error) {
// // // // //         console.log('Error fetching answers:', error);
// // // // //       }
// // // // //     };

// // // // //     fetchAnswers();
// // // // //   }, [location.search]);

// // // // //   // const handleAnswerSubmit = async (e) => {
// // // // //   //   e.preventDefault();
// // // // //   //   try {
// // // // //   //     const token = localStorage.getItem('token');
// // // // //   //     if (!token) {
// // // // //   //       throw new Error('No token found in localStorage');
// // // // //   //     }

// // // // //   //     const { data } = await axiosBase.post(
// // // // //   //       `/answer/postAnswer/${question.id}`,
// // // // //   //       { answer: newAnswer, questionid: question.id },
// // // // //   //       {
// // // // //   //         headers: {
// // // // //   //           Authorization: "Bearer " + token,
// // // // //   //         },
// // // // //   //       }
// // // // //   //     );

// // // // //   //     setNewAnswer('');
// // // // //   //     alert("Posted Successfully");
// // // // //   //     console.log('Posted answer:', data);
// // // // //   //     setAnswers(prevAnswers => [{ questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid }, ...prevAnswers]);
// // // // //   //   } catch (error) {
// // // // //   //     console.log('Error posting answer:', error);
// // // // //   //     if (error.response) {
// // // // //   //       console.log('Error response data:', error.response.data);
// // // // //   //       console.log('Error response status:', error.response.status);
// // // // //   //       console.log('Error response headers:', error.response.headers);
// // // // //   //     } else if (error.request) {
// // // // //   //       console.log('Error request data:', error.request);
// // // // //   //     } else {
// // // // //   //       console.log('Error message:', error.message);
// // // // //   //     }
// // // // //   //   }
// // // // //   // };


// // // // //   const handleAnswerSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       if (!token) {
// // // // //         throw new Error('No token found in localStorage');
// // // // //       }
  
// // // // //       const { data } = await axiosBase.post(
// // // // //         `/answer/postAnswer/${question.id}`,
// // // // //         { answer: newAnswer, questionid: question.id },
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: "Bearer " + token,
// // // // //           },
// // // // //         }
// // // // //       );
  
// // // // //       setNewAnswer('');
// // // // //       alert("Posted Successfully");
// // // // //       console.log('Posted answer:', data);
  
// // // // //       // Add the new answer to the state, filtered by question ID
// // // // //       setAnswers(prevAnswers => [{ questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid }, ...prevAnswers]);
// // // // //     } catch (error) {
// // // // //       console.log('Error posting answer:', error);
// // // // //       if (error.response) {
// // // // //         console.log('Error response data:', error.response.data);
// // // // //         console.log('Error response status:', error.response.status);
// // // // //         console.log('Error response headers:', error.response.headers);
// // // // //       } else if (error.request) {
// // // // //         console.log('Error request data:', error.request);
// // // // //       } else {
// // // // //         console.log('Error message:', error.message);
// // // // //       }
// // // // //     }
// // // // //   };
  


// // // // //   useEffect(() => {
// // // // //     if (location.state && location.state.newAnswer) {
// // // // //       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
// // // // //       navigate(location.pathname, { replace: true, state: {} });
// // // // //     }
// // // // //   }, [location.state, location.pathname, navigate]);

// // // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // // //     console.log('Attempting to delete answer:', answerid);
// // // // //     console.log('Answer user ID:', userid);
// // // // //     console.log('Current user ID:', user.userid);

// // // // //     try {
// // // // //       // Check if the current user is the owner of the answer
// // // // //       if (userid !== user.userid) {
// // // // //         alert('You cannot delete another user\'s answer');
// // // // //         return;
// // // // //       }

// // // // //       const token = localStorage.getItem('token');
// // // // //       if (!token) {
// // // // //         throw new Error('No token found in localStorage');
// // // // //       }

// // // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // // //         headers: {
// // // // //           Authorization: "Bearer " + token,
// // // // //         },
// // // // //       });

// // // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // // //       alert("Answer deleted successfully");
// // // // //       console.log('Deleted answer ID:', answerid);
// // // // //     } catch (error) {
// // // // //       console.log('Error deleting answer:', error);
// // // // //       if (error.response) {
// // // // //         console.log('Error response data:', error.response.data);
// // // // //         console.log('Error response status:', error.response.status);
// // // // //         console.log('Error response headers:', error.response.headers);
// // // // //       } else if (error.request) {
// // // // //         console.log('Error request data:', error.request);
// // // // //       } else {
// // // // //         console.log('Error message:', error.message);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   async function Logout() {
// // // // //     // Remove the token from local storage
// // // // //     localStorage.removeItem('token');
    
// // // // //     // Navigate to the login page or home page
// // // // //     navigate('/login'); // Adjust the URL as needed
// // // // //   }

// // // // //   return (
// // // // //     <div>
// // // // //       <nav className="nav">
// // // // //         <ul>
// // // // //           <li className='navhome'><a href="/">Home</a></li>
// // // // //           <button onClick={Logout} className="logout">Logout</button>
// // // // //         </ul>
// // // // //       </nav>
// // // // //       <div className="container">
// // // // //         <div className="logo">
// // // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // // //         </div>
// // // // //         <h1>Question</h1>
// // // // //         <div className="question-details">
// // // // //           <h2>{question.title}</h2>
// // // // //           <p>Asked by: {question.username}</p>
// // // // //           <p>{question.description}</p>
// // // // //         </div>
// // // // //         {/* <div className="answers-section">
// // // // //           <h2>Answer From The Community</h2>
// // // // //           {answers.length > 0 ? (
// // // // //             answers.map((answer, index) => (
// // // // //               <div key={index} className="answer">
// // // // //                 <div className="username">{answer.username}</div>
// // // // //                 <div className="userid">{answer.userid}</div>
// // // // //                 <div className="answer-text">{answer.answer}</div>
// // // // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // //               </div>
// // // // //             ))
// // // // //           ) : (
// // // // //             <p>No answers yet. Be the first to answer!</p>
// // // // //           )}
// // // // //         </div> */}



// // // // // {/* <div className="answers-section">
// // // // //   <h2>Answer From The Community</h2>
// // // // //   {answers.length > 0 ? (
// // // // //     answers.filter(answer => answer.questionid === question.id).map((answer, index) => (
// // // // //       <div key={index} className="answer">
// // // // //         <div className="username">{answer.username}</div>
// // // // //         <div className="userid">{answer.userid}</div>
// // // // //         <div className="answer-text">{answer.answer}</div>
// // // // //         <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // //       </div>
// // // // //     ))
// // // // //   ) : (
// // // // //     <p>No answers yet. Be the first to answer!</p>
// // // // //   )}
// // // // // </div> */}


// // // // // <div className="answers-section">
// // // // //   <h2>Answer From The Community</h2>
// // // // //   {answers.length > 0 ? (
// // // // //     answers
// // // // //       .filter(answer => answer.questionid === question.id)
// // // // //       .map((answer, index) => (
// // // // //         <div key={index} className="answer">
// // // // //           <div className="username">{answer.username}</div>
// // // // //           <div className="userid">{answer.userid}</div>
// // // // //           <div className="answer-text">{answer.answer}</div>
// // // // //           <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // // //         </div>
// // // // //       ))
// // // // //   ) : (
// // // // //     <p>No answers yet. Be the first to answer!</p>
// // // // //   )}
// // // // // </div>



// // // // //         <div className="form-container">
// // // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // // //           <textarea
// // // // //             id="newAnswer"
// // // // //             name="newAnswer"
// // // // //             value={newAnswer}
// // // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // // //             placeholder="Enter your answer here"
// // // // //           />
// // // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default AnsQuestion;



// // // // import React, { useEffect, useState, useContext } from 'react';
// // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // import '../ansque.css';
// // // // import axiosBase from '../axiosconfig';
// // // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // // function AnsQuestion() {
// // // //   const location = useLocation();
// // // //   const [question, setQuestion] = useState({});
// // // //   const [answers, setAnswers] = useState([]);
// // // //   const [newAnswer, setNewAnswer] = useState('');
// // // //   const navigate = useNavigate();
// // // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // // //   useEffect(() => {
// // // //     const query = new URLSearchParams(location.search);
// // // //     const id = query.get('id');
// // // //     const title = query.get('title');
// // // //     const description = query.get('description');
// // // //     const username = query.get('username');
// // // //     const userid = query.get('userid');
// // // //     setQuestion({ id, title, description, username, userid });

// // // //     // Fetch the answers when the component mounts
// // // //     const fetchAnswers = async () => {
// // // //       try {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) {
// // // //           throw new Error('No token found in localStorage');
// // // //         }
// // // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // // //           headers: {
// // // //             Authorization: "Bearer " + token,
// // // //           },
// // // //         });
// // // //         setAnswers(data);
// // // //         console.log('Fetched answers:', data);
// // // //       } catch (error) {
// // // //         console.log('Error fetching answers:', error);
// // // //       }
// // // //     };

// // // //     fetchAnswers();
// // // //   }, [location.search]);

// // // //   const handleAnswerSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         throw new Error('No token found in localStorage');
// // // //       }

// // // //       const { data } = await axiosBase.post(
// // // //         `/answer/postAnswer/${question.id}`,
// // // //         { answer: newAnswer, questionid: question.id },
// // // //         {
// // // //           headers: {
// // // //             Authorization: "Bearer " + token,
// // // //           },
// // // //         }
// // // //       );

// // // //       setNewAnswer('');
// // // //       alert("Posted Successfully");
// // // //       console.log('Posted answer:', data);

// // // //       // Add the new answer to the state
// // // //       setAnswers(prevAnswers => [
// // // //         { questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid },
// // // //         ...prevAnswers.filter(answer => answer.questionid === question.id)
// // // //       ]);
// // // //     } catch (error) {
// // // //       console.log('Error posting answer:', error);
// // // //       if (error.response) {
// // // //         console.log('Error response data:', error.response.data);
// // // //         console.log('Error response status:', error.response.status);
// // // //         console.log('Error response headers:', error.response.headers);
// // // //       } else if (error.request) {
// // // //         console.log('Error request data:', error.request);
// // // //       } else {
// // // //         console.log('Error message:', error.message);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleDeleteAnswer = async (answerid, userid) => {
// // // //     console.log('Attempting to delete answer:', answerid);
// // // //     console.log('Answer user ID:', userid);
// // // //     console.log('Current user ID:', user.userid);

// // // //     try {
// // // //       // Check if the current user is the owner of the answer
// // // //       if (userid !== user.userid) {
// // // //         alert('You cannot delete another user\'s answer');
// // // //         return;
// // // //       }

// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         throw new Error('No token found in localStorage');
// // // //       }

// // // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // // //         headers: {
// // // //           Authorization: "Bearer " + token,
// // // //         },
// // // //       });

// // // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // // //       alert("Answer deleted successfully");
// // // //       console.log('Deleted answer ID:', answerid);
// // // //     } catch (error) {
// // // //       console.log('Error deleting answer:', error);
// // // //       if (error.response) {
// // // //         console.log('Error response data:', error.response.data);
// // // //         console.log('Error response status:', error.response.status);
// // // //         console.log('Error response headers:', error.response.headers);
// // // //       } else if (error.request) {
// // // //         console.log('Error request data:', error.request);
// // // //       } else {
// // // //         console.log('Error message:', error.message);
// // // //       }
// // // //     }
// // // //   };

// // // //   async function Logout() {
// // // //     // Remove the token from local storage
// // // //     localStorage.removeItem('token');
    
// // // //     // Navigate to the login page or home page
// // // //     navigate('/login'); // Adjust the URL as needed
// // // //   }

// // // //   return (
// // // //     <div>
// // // //       <nav className="nav">
// // // //         <ul>
// // // //           <li className='navhome'><a href="/">Home</a></li>
// // // //           <button onClick={Logout} className="logout">Logout</button>
// // // //         </ul>
// // // //       </nav>
// // // //       <div className="container">
// // // //         <div className="logo">
// // // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // // //         </div>
// // // //         <h1>Question</h1>
// // // //         <div className="question-details">
// // // //           <h2>{question.title}</h2>
// // // //           <p>Asked by: {question.username}</p>
// // // //           <p>{question.description}</p>
// // // //         </div>
// // // //         <div className="answers-section">
// // // //           <h2>Answer From The Community</h2>
// // // //           {answers.length > 0 ? (
// // // //             answers
// // // //               .filter(answer => answer.questionid === question.id)
// // // //               .map((answer, index) => (
// // // //                 <div key={index} className="answer">
// // // //                   <div className="username">{answer.username}</div>
// // // //                   <div className="userid">{answer.userid}</div>
// // // //                   <div className="answer-text">{answer.answer}</div>
// // // //                   <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // // //                 </div>
// // // //               ))
// // // //           ) : (
// // // //             <p>No answers yet. Be the first to answer!</p>
// // // //           )}
// // // //         </div>
// // // //         <div className="form-container">
// // // //           <label htmlFor="newAnswer">Your Answer:</label>
// // // //           <textarea
// // // //             id="newAnswer"
// // // //             name="newAnswer"
// // // //             value={newAnswer}
// // // //             onChange={(e) => setNewAnswer(e.target.value)}
// // // //             placeholder="Enter your answer here"
// // // //           />
// // // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AnsQuestion;



// // // // eslint-disable-next-line no-unused-vars
// // // import React, { useEffect, useState, useContext } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import '../ansque.css';
// // // import axiosBase from '../axiosconfig';
// // // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // // function AnsQuestion() {
// // //   const location = useLocation();
// // //   const [question, setQuestion] = useState({});
// // //   const [answers, setAnswers] = useState([]);
// // //   const [newAnswer, setNewAnswer] = useState('');
// // //   const navigate = useNavigate();
// // //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// // //   useEffect(() => {
// // //     const query = new URLSearchParams(location.search);
// // //     const id = query.get('id');
// // //     const title = query.get('title');
// // //     const description = query.get('description');
// // //     const username = query.get('username');
// // //     const userid = query.get('userid');
// // //     setQuestion({ id, title, description, username, userid });

// // //     // Fetch the answers when the component mounts
// // //     const fetchAnswers = async () => {
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) {
// // //           throw new Error('No token found in localStorage');
// // //         }
// // //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// // //           headers: {
// // //             Authorization: "Bearer " + token,
// // //           },
// // //         });
// // //         setAnswers(data);
// // //         console.log('Fetched answers:', data);
// // //       } catch (error) {
// // //         console.log('Error fetching answers:', error);
// // //       }
// // //     };

// // //     fetchAnswers();
// // //   }, [location.search]);

// // //   const handleAnswerSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         throw new Error('No token found in localStorage');
// // //       }

// // //       const { data } = await axiosBase.post(
// // //         `/answer/postAnswer/${question.id}`,
// // //         { answer: newAnswer, questionid: question.id },
// // //         {
// // //           headers: {
// // //             Authorization: "Bearer " + token,
// // //           },
// // //         }
// // //       );

// // //       setNewAnswer('');
// // //       alert("Posted Successfully");
// // //       console.log('Posted answer:', data);

// // //       // Add the new answer to the state
// // //       setAnswers(prevAnswers => [
// // //         { questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid },
// // //         ...prevAnswers
// // //       ]);
// // //     } catch (error) {
// // //       console.log('Error posting answer:', error);
// // //       if (error.response) {
// // //         console.log('Error response data:', error.response.data);
// // //         console.log('Error response status:', error.response.status);
// // //         console.log('Error response headers:', error.response.headers);
// // //       } else if (error.request) {
// // //         console.log('Error request data:', error.request);
// // //       } else {
// // //         console.log('Error message:', error.message);
// // //       }
// // //     }
// // //   };

// // //   const handleDeleteAnswer = async (answerid, userid) => {
// // //     console.log('Attempting to delete answer:', answerid);
// // //     console.log('Answer user ID:', userid);
// // //     console.log('Current user ID:', user.userid);

// // //     try {
// // //       // Check if the current user is the owner of the answer
// // //       if (userid !== user.userid) {
// // //         alert('You cannot delete another user\'s answer');
// // //         return;
// // //       }

// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         throw new Error('No token found in localStorage');
// // //       }

// // //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// // //         headers: {
// // //           Authorization: "Bearer " + token,
// // //         },
// // //       });

// // //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// // //       alert("Answer deleted successfully");
// // //       console.log('Deleted answer ID:', answerid);
// // //     } catch (error) {
// // //       console.log('Error deleting answer:', error);
// // //       if (error.response) {
// // //         console.log('Error response data:', error.response.data);
// // //         console.log('Error response status:', error.response.status);
// // //         console.log('Error response headers:', error.response.headers);
// // //       } else if (error.request) {
// // //         console.log('Error request data:', error.request);
// // //       } else {
// // //         console.log('Error message:', error.message);
// // //       }
// // //     }
// // //   };

// // //   async function Logout() {
// // //     // Remove the token from local storage
// // //     localStorage.removeItem('token');
    
// // //     // Navigate to the login page or home page
// // //     navigate('/login'); // Adjust the URL as needed
// // //   }

// // //   const filteredAnswers = answers.filter(answer => answer.questionid === question.id);

// // //   return (
// // //     <div>
// // //       <nav className="nav">
// // //         <ul>
// // //           <li className='navhome'><a href="/">Home</a></li>
// // //           <button onClick={Logout} className="logout">Logout</button>
// // //         </ul>
// // //       </nav>
// // //       <div className="container">
// // //         <div className="logo">
// // //           <img src="https://placehold.co/100x100" alt="Logo" />
// // //         </div>
// // //         <h1>Question</h1>
// // //         <div className="question-details">
// // //           <h2>{question.title}</h2>
// // //           <p>Asked by: {question.username}</p>
// // //           <p>{question.description}</p>
// // //         </div>
// // //         <div className="answers-section">
// // //           <h2>Answer From The Community</h2>
// // //           {filteredAnswers.length > 0 ? (
// // //             filteredAnswers.map((answer, index) => (
// // //               <div key={index} className="answer">
// // //                 <div className="username">{answer.username}</div>
// // //                 <div className="userid">{answer.userid}</div>
// // //                 <div className="answer-text">{answer.answer}</div>
// // //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// // //               </div>
// // //             ))
// // //           ) : (
// // //             <p>No answers yet. Be the first to answer!</p>
// // //           )}
// // //         </div>
// // //         <div className="form-container">
// // //           <label htmlFor="newAnswer">Your Answer:</label>
// // //           <textarea
// // //             id="newAnswer"
// // //             name="newAnswer"
// // //             value={newAnswer}
// // //             onChange={(e) => setNewAnswer(e.target.value)}
// // //             placeholder="Enter your answer here"
// // //           />
// // //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default AnsQuestion;




// // import React, { useEffect, useState, useContext } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import '../ansque.css';
// // import axiosBase from '../axiosconfig';
// // import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// // function AnsQuestion() {
// //   const location = useLocation();
// //   const [question, setQuestion] = useState({});
// //   const [answers, setAnswers] = useState([]);
// //   const [newAnswer, setNewAnswer] = useState('');
// //   const navigate = useNavigate();
// //   const { user } = useContext(AppState); // Assuming user context is provided by AppState

// //   useEffect(() => {
// //     const query = new URLSearchParams(location.search);
// //     const id = query.get('id');
// //     const title = query.get('title');
// //     const description = query.get('description');
// //     const username = query.get('username');
// //     const userid = query.get('userid');
// //     setQuestion({ id, title, description, username, userid });

// //     // Fetch the answers when the component mounts
// //     const fetchAnswers = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           throw new Error('No token found in localStorage');
// //         }
// //         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
// //           headers: {
// //             Authorization: "Bearer " + token,
// //           },
// //         });
// //         setAnswers(data);
// //         console.log('Fetched answers:', data);
// //       } catch (error) {
// //         console.log('Error fetching answers:', error);
// //       }
// //     };

// //     fetchAnswers();
// //   }, [location.search]);

// //   const handleAnswerSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         throw new Error('No token found in localStorage');
// //       }

// //       const { data } = await axiosBase.post(
// //         `/answer/postAnswer/${question.id}`,
// //         { answer: newAnswer, questionid: question.id },
// //         {
// //           headers: {
// //             Authorization: "Bearer " + token,
// //           },
// //         }
// //       );

// //       setNewAnswer('');
// //       alert("Posted Successfully");
// //       console.log('Posted answer:', data);

// //       // Add the new answer to the state
// //       setAnswers(prevAnswers => [
// //         { questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid },
// //         ...prevAnswers
// //       ]);
// //     } catch (error) {
// //       console.log('Error posting answer:', error);
// //       if (error.response) {
// //         console.log('Error response data:', error.response.data);
// //         console.log('Error response status:', error.response.status);
// //         console.log('Error response headers:', error.response.headers);
// //       } else if (error.request) {
// //         console.log('Error request data:', error.request);
// //       } else {
// //         console.log('Error message:', error.message);
// //       }
// //     }
// //   };

// //   const handleDeleteAnswer = async (answerid, userid) => {
// //     console.log('Attempting to delete answer:', answerid);
// //     console.log('Answer user ID:', userid);
// //     console.log('Current user ID:', user.userid);

// //     try {
// //       // Check if the current user is the owner of the answer
// //       if (userid !== user.userid) {
// //         alert('You cannot delete another user\'s answer');
// //         return;
// //       }

// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         throw new Error('No token found in localStorage');
// //       }

// //       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
// //         headers: {
// //           Authorization: "Bearer " + token,
// //         },
// //       });

// //       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
// //       alert("Answer deleted successfully");
// //       console.log('Deleted answer ID:', answerid);
// //     } catch (error) {
// //       console.log('Error deleting answer:', error);
// //       if (error.response) {
// //         console.log('Error response data:', error.response.data);
// //         console.log('Error response status:', error.response.status);
// //         console.log('Error response headers:', error.response.headers);
// //       } else if (error.request) {
// //         console.log('Error request data:', error.request);
// //       } else {
// //         console.log('Error message:', error.message);
// //       }
// //     }
// //   };

// //   async function Logout() {
// //     // Remove the token from local storage
// //     localStorage.removeItem('token');
    
// //     // Navigate to the login page or home page
// //     navigate('/login'); // Adjust the URL as needed
// //   }

// //   // Filter the answers for the current question
// //   const filteredAnswers = answers.filter(answer => answer.questionid === question.id);

// //   return (
// //     <div>
// //       <nav className="nav">
// //         <ul>
// //           <li className='navhome'><a href="/">Home</a></li>
// //           <button onClick={Logout} className="logout">Logout</button>
// //         </ul>
// //       </nav>
// //       <div className="container">
// //         <div className="logo">
// //           <img src="https://placehold.co/100x100" alt="Logo" />
// //         </div>
// //         <h1>Question</h1>
// //         <div className="question-details">
// //           <h2>{question.title}</h2>
// //           <p>Asked by: {question.username}</p>
// //           <p>{question.description}</p>
// //         </div>
// //         <div className="answers-section">
// //           <h2>Answer From The Community</h2>
// //           {filteredAnswers.length > 0 ? (
// //             filteredAnswers.map((answer, index) => (
// //               <div key={index} className="answer">
// //                 <div className="username">{answer.username}</div>
// //                 <div className="userid">{answer.userid}</div>
// //                 <div className="answer-text">{answer.answer}</div>
// //                 <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No answers yet. Be the first to answer!</p>
// //           )}
// //         </div>
// //         <div className="form-container">
// //           <label htmlFor="newAnswer">Your Answer:</label>
// //           <textarea
// //             id="newAnswer"
// //             name="newAnswer"
// //             value={newAnswer}
// //             onChange={(e) => setNewAnswer(e.target.value)}
// //             placeholder="Enter your answer here"
// //           />
// //           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AnsQuestion;




// import React, { useEffect, useState, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../ansque.css';
// import axiosBase from '../axiosconfig';
// import { AppState } from '../App'; // Assuming AppState context is defined in App.js

// function AnsQuestion() {
//   const location = useLocation();
//   const [question, setQuestion] = useState({});
//   const [answers, setAnswers] = useState([]);
//   const [newAnswer, setNewAnswer] = useState('');
//   const navigate = useNavigate();
//   const { user } = useContext(AppState); // Assuming user context is provided by AppState

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const id = query.get('id');
//     const title = query.get('title');
//     const description = query.get('description');
//     const username = query.get('username');
//     const userid = query.get('userid');
//     setQuestion({ id, title, description, username, userid });

//     // Fetch the answers when the component mounts
//     const fetchAnswers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found in localStorage');
//         }
//         const { data } = await axiosBase.get(`/answer/getAnswer/${id}`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setAnswers(data);
//         console.log('Fetched answers:', data);
//       } catch (error) {
//         console.log('Error fetching answers:', error);
//       }
//     };

//     fetchAnswers();
//   }, [location.search]);

//   const handleAnswerSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found in localStorage');
//       }

//       const { data } = await axiosBase.post(
//         `/answer/postAnswer/${question.id}`,
//         { answer: newAnswer, questionid: question.id },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       setNewAnswer('');
//       alert("Posted Successfully");
//       console.log('Posted answer:', data);

//       // Add the new answer to the state
//       setAnswers(prevAnswers => [
//         { questionid: data.questionid, username: user.username, answer: data.answer, answerid: data.answerid, userid: user.userid },
//         ...prevAnswers
//       ]);
//     } catch (error) {
//       console.log('Error posting answer:', error);
//       if (error.response) {
//         console.log('Error response data:', error.response.data);
//         console.log('Error response status:', error.response.status);
//         console.log('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         console.log('Error request data:', error.request);
//       } else {
//         console.log('Error message:', error.message);
//       }
//     }
//   };

//   const handleDeleteAnswer = async (answerid, userid) => {
//     console.log('Attempting to delete answer:', answerid);
//     console.log('Answer user ID:', userid);
//     console.log('Current user ID:', user.userid);

//     try {
//       // Check if the current user is the owner of the answer
//       if (userid !== user.userid) {
//         alert('You cannot delete another user\'s answer');
//         return;
//       }

//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found in localStorage');
//       }

//       await axiosBase.delete(`/answer/deleteanswer/${answerid}`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });

//       setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
//       alert("Answer deleted successfully");
//       console.log('Deleted answer ID:', answerid);
//     } catch (error) {
//       console.log('Error deleting answer:', error);
//       if (error.response) {
//         console.log('Error response data:', error.response.data);
//         console.log('Error response status:', error.response.status);
//         console.log('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         console.log('Error request data:', error.request);
//       } else {
//         console.log('Error message:', error.message);
//       }
//     }
//   };

//   async function Logout() {
//     // Remove the token from local storage
//     localStorage.removeItem('token');
    
//     // Navigate to the login page or home page
//     navigate('/login'); // Adjust the URL as needed
//   }

//   return (
//     <div>
//       <nav className="nav">
//         <ul>
//           <li className='navhome'><a href="/">Home</a></li>
//           <button onClick={Logout} className="logout">Logout</button>
//         </ul>
//       </nav>
//       <div className="container">
//         <div className="logo">
//           <img src="https://placehold.co/100x100" alt="Logo" />
//         </div>
//         <h1>Question</h1>
//         <div className="question-details">
//           <h2>{question.title}</h2>
//           <p>Asked by: {question.username}</p>
//           <p>{question.description}</p>
//         </div>
//         <div className="answers-section">
//           <h2>Answer From The Community</h2>
//           {answers.length > 0 ? (
//             answers
//               .filter(answer => answer.questionid === question.id)
//               .map((answer, index) => (
//                 <div key={index} className="answer">
//                   <div className="username">{answer.username}</div>
//                   <div className="userid">{answer.userid}</div>
//                   <div className="answer-text">{answer.answer}</div>
//                   <button onClick={() => handleDeleteAnswer(answer.answerid, answer.userid)}>Delete</button>
//                 </div>
//               ))
//           ) : (
//             <p>No answers yet. Be the first to answer!</p>
//           )}
//         </div>
//         <div className="form-container">
//           <label htmlFor="newAnswer">Your Answer:</label>
//           <textarea
//             id="newAnswer"
//             name="newAnswer"
//             value={newAnswer}
//             onChange={(e) => setNewAnswer(e.target.value)}
//             placeholder="Enter your answer here"
//           />
//           <button onClick={handleAnswerSubmit}>Post Your Answer</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AnsQuestion;



// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../ansque.css';
import axiosBase from '../axiosconfig';
import logo from '../../public/images/cropped-White-logo-no-background.png.webp'; // Import the logo image
import { AppState } from '../App'; // Assuming AppState context is defined in App.js
const backendUrl = import.meta.env.VITE_BACKEND_URL
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

      // Trigger a page reload
      window.location.reload();
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
          <Link to="/"><img src={logo} alt="Logo" className="homelogo" /></Link> {/* Logo element */}  
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
      {/* <nav className="nav">
        <ul>
        
     
          <Link to="/"><li className='navhome'>Home</li></Link>
          <Link to="/askquestion"><button>Ask Question</button></Link>
          <button onClick={Logout} className="logout">Logout</button>
        </ul>
      </nav> */}
        <h1>Question</h1>
        <div className="question-details">
         
          <p>Asked by: {question.username}</p>
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
                  <div className="username">{answer.username}</div>
                  <div className="userid">{answer.userid}</div>
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
            placeholder="Enter your answer here"
          />
          <button onClick={handleAnswerSubmit}>Post Your Answer</button>
        </div>
    </div>
  );
}

export default AnsQuestion;
