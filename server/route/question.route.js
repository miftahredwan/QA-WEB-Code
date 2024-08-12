const express = require("express");
const authenticateToken = require("../api/middleware/auth");
const {
  AddQuestion,
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controller/question.controller");

const questionRouter = express.Router();
questionRouter.post("/postquestion", authenticateToken, AddQuestion);
questionRouter.get("/getquestions", authenticateToken, getAllQuestion);
questionRouter.put("/updatequestion/:questionid", authenticateToken, updateQuestion);
questionRouter.delete("/deletequestion", authenticateToken, deleteQuestion);

module.exports = questionRouter;
