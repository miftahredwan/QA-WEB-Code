const express = require("express");
const authenticateToken = require("../api/middleware/auth");
const {
  AddAnswer,
  getAllAnswers,
  deleteAnswer,
} = require("../controller/answers.controller");

const answerRouter = express.Router();
answerRouter.post("/postAnswer/:answerid", authenticateToken, AddAnswer);
answerRouter.get("/getAnswer/:answerid", authenticateToken, getAllAnswers);
answerRouter.delete("/deleteanswer/:answerid", authenticateToken, deleteAnswer);

module.exports = answerRouter;
