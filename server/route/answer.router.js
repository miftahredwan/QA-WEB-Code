const express = require("express");
const authenticateToken = require("../api/middleware/auth");
const {
  AddAnswer,
  getAllAnswers,
//   updateAnswer,
//   getTitlesWithAnswers,
//   singleAnswerId,
  deleteAnswer,
//   answersByQuestionId,
} = require("../controller/answers.controller");

const answerRouter = express.Router();
// answerRouter.get("/titlesWithAnswers", authenticateToken, getTitlesWithAnswers);
answerRouter.post("/postAnswer/:answerid", authenticateToken, AddAnswer);
// answerRouter.put("/updateAnswer/:answer_id", authenticateToken, updateAnswer);
answerRouter.get("/getAnswer/:answerid", authenticateToken, getAllAnswers);
// answerRouter.get("/:answerid", authenticateToken, singleAnswerId);
// answerRouter.get("/byQuestionId/:questionid", authenticateToken, answersByQuestionId); // New route
answerRouter.delete("/deleteanswer/:answerid", authenticateToken, deleteAnswer);

module.exports = answerRouter;
