// const express = require("express");
// const authenticateToken = require("../api/middleware/auth");
// const {
//   AddQuestion,
//   getAllQuestion,
//   getAllTitle,
//   deleteQuestion,
//   updateQuestion,
//   singleQuestionId,
//   singleQuestionWithoutAnswers,
//   getAllSingleUserTitle,
// } = require("./question.controller");

// const questionRouter = express.Router();
// questionRouter.post("/add", authenticateToken, AddQuestion);
// questionRouter.get("/allquestions", authenticateToken, getAllQuestion);
// questionRouter.get("/alltitles", authenticateToken, getAllTitle);
// questionRouter.put("/update/:question_id", authenticateToken, updateQuestion);
// questionRouter.get("/singleTitle", authenticateToken, getAllSingleUserTitle);
// questionRouter.get("/:question_id", authenticateToken, singleQuestionId);
// questionRouter.get("/withoutAnswers/:question_id", authenticateToken, singleQuestionWithoutAnswers); // New route
// questionRouter.delete("/delete", authenticateToken, deleteQuestion);

// module.exports = questionRouter;



const express = require("express");
const authenticateToken = require("../api/middleware/auth");
const {
  AddQuestion,
  getAllQuestion,
  // getAllTitle, // Uncomment this if you implement it
  deleteQuestion,
  updateQuestion,
  // singleQuestionId, // Uncomment this if you implement it
  // singleQuestionWithoutAnswers, // Uncomment this if you implement it
  // getAllSingleUserTitle, // Uncomment this if you implement it
} = require("../controller/question.controller");

const questionRouter = express.Router();
questionRouter.post("/postquestion", authenticateToken, AddQuestion);
questionRouter.get("/getquestions", authenticateToken, getAllQuestion);
// questionRouter.get("/alltitles", authenticateToken, getAllTitle); // Uncomment if implemented
questionRouter.put("/updatequestion/:questionid", authenticateToken, updateQuestion);
// questionRouter.get("/singleTitle", authenticateToken, getAllSingleUserTitle); // Uncomment if implemented
// questionRouter.get("/:question_id", authenticateToken, singleQuestionId); // Uncomment if implemented
// questionRouter.get("/withoutAnswers/:question_id", authenticateToken, singleQuestionWithoutAnswers); // Uncomment if implemented
questionRouter.delete("/deletequestion", authenticateToken, deleteQuestion);

module.exports = questionRouter;
