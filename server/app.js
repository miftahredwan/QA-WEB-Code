// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const app = express();
// // const questionRouter = require("./server/Questions/question.route");
// // const router = require("./server/user/user.router");
// // const answerRouter=require("./server/Answers/answer.router")
// app.use(cors());
// app.use(express.json());
// const PORT = process.env.PORT || 3000;

// // app.use("/api/users", router);
// // app.use("/api/questions", questionRouter);
// // app.use("/api/answers", answerRouter);

// app.get("/",(req, res)=>{
//   res.status(200).json({message:"Successfully connected"})
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
  
// });



const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const path = require('path');
const pool = require("./config/db"); // Ensure this points to your db.js file
const userRouter = require("./route/user.router");
const questionRouter = require("./route/question.route");
// const router = require("./route/user.router");
const answerRouter = require("./route/answer.router");
const createTables = require("./config/createtable")
const corsOptions = {
  origin: 'https://baajitechquestionandanswer.vercel.app',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const PORT = process.env.PORT

// Uncomment and update the following lines as needed



app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Successfully connected" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Ensure the tables are created when the server starts
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    createTables();
    release();
  });
});
