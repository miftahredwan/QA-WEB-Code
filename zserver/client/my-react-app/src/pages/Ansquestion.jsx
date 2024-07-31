// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../ansque.css';
// import axiosBase from '../axiosconfig';

// function AnsQuestion() {
//   const location = useLocation();
//   const [question, setQuestion] = useState({});
//   const [answers, setAnswers] = useState([]);
//   const [newAnswer, setNewAnswer] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const id = query.get('id');
//     const title = query.get('title');
//     const description = query.get('description');
//     const username = query.get('username');
//     setQuestion({ id, title, description, username });

//     // Fetch the answers when the component mounts
//     const fetchAnswers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found in localStorage');
//         }
//         const { data } = await axiosBase.get(`/answers/getanswers/${id}`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setAnswers(data.answers);
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
//         `/answers/postanswerpage/${question.id}`,
//         { answer: newAnswer, questionid: question.id },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       setNewAnswer('');
//       alert("Posted Successfully");

//       setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer }, ...prevAnswers]);
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

//   useEffect(() => {
//     if (location.state && location.state.newAnswer) {
//       setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, [location.state, location.pathname, navigate]);

//   return (
//     <div>
//       <nav className="nav">
//         <ul>
//           <li className='navhome'><a href="/">Home</a></li>
//           <li><a href="#">How it Works</a></li>
//           <li><a href="/login"><button className="logout">LogOut</button></a></li>
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
//             answers.map((answer, index) => (
//               <div key={index} className="answer">
//                 <div className="username">{answer.username}</div>
//                 <div className="answer-text">{answer.answer}</div>
//               </div>
//             ))
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
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../ansque.css';
import axiosBase from '../axiosconfig';

function AnsQuestion() {
  const location = useLocation();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const title = query.get('title');
    const description = query.get('description');
    const username = query.get('username');
    setQuestion({ id, title, description, username });

    // Fetch the answers when the component mounts
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }
        const { data } = await axiosBase.get(`/answers/getanswers/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAnswers(data.answers);
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
        `/answers/postanswerpage/${question.id}`,
        { answer: newAnswer, questionid: question.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setNewAnswer('');
      alert("Posted Successfully");

      setAnswers(prevAnswers => [{ questionid: data.questionid, username: data.username, answer: data.answer }, ...prevAnswers]);
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

  useEffect(() => {
    if (location.state && location.state.newAnswer) {
      setAnswers(prevAnswers => [location.state.newAnswer, ...prevAnswers]);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const handleDeleteAnswer = async (answerid) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      await axiosBase.delete(`/answers/deleteanswer/${answerid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerid !== answerid));
      alert("Answer deleted successfully");
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
      <nav className="nav">
        <ul>
          <li className='navhome'><a href="/">Home</a></li>
          <button onClick={Logout} className="logout">Logout</button>
        </ul>
      </nav>
      <div className="container">
        <div className="logo">
          <img src="https://placehold.co/100x100" alt="Logo" />
        </div>
        <h1>Question</h1>
        <div className="question-details">
          <h2>{question.title}</h2>
          <p>Asked by: {question.username}</p>
          <p>{question.description}</p>
        </div>
        <div className="answers-section">
          <h2>Answer From The Community</h2>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className="answer">
                <div className="username">{answer.username}</div>
                <div className="answer-text">{answer.answer}</div>
                <button onClick={() => handleDeleteAnswer(answer.answerid)}>Delete</button>
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
    </div>
  );
}

export default AnsQuestion;
