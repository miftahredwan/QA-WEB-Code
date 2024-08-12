const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.AddQuestion = async (req, res) => {
  const { title, description } = req.body;
  const { userid } = req.user;

  if (!title || !description) {
    return res.status(400).json({ msg: "Please provide all information" });
  }
  const questionid = uuidv4();

  try {
    const client = await pool.connect();

    console.log(userid);
    const sql = `
      INSERT INTO question (userid, title, description, questionid) 
      VALUES ($1, $2, $3, $4) RETURNING id`;
    const result = await client.query(sql, [
      userid,
      title,
      description,
      questionid,
    ]);

    client.release();

    res.status(201).json({
      id: result.rows[0].id,
      message: "Question delivered successfully",
    });
  } catch (err) {
    console.error("Error delivering message:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.getAllQuestion = async (req, res) => {
//   try {
//     const client = await pool.connect();

//     const sql = `
//       SELECT 
//         question.id, 
//         users.userid AS user_id, 
//         users.email AS email,
//         question.title AS question_title, 
//         question.description AS question_description
//       FROM 
//         users
//       LEFT JOIN 
//         question ON users.userid = question.userid`;

//     const result = await client.query(sql);
//     client.release();

//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error("Error fetching questions:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.getAllQuestion = async (req, res) => {
    try {
      const client = await pool.connect();
  
      const sql = `
        SELECT 
          question.id, 
          users.username AS username,
          users.profileimage, 
          users.userid AS userid, 
          users.email AS email,
          question.questionid,
          question.title AS questiontitle, 
          question.description AS questiondescription,
          question.created_at
        FROM 
          users
        LEFT JOIN 
          question ON users.userid = question.userid
        ORDER BY 
          question.created_at DESC`;
  
      const result = await client.query(sql);
      client.release();
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching questions:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
    };
    


// Uncomment and update these functions similarly to match the database schema if needed
// exports.singleQuestionWithoutAnswers = async (req, res) => { ... }
// exports.getAllTitle = async (req, res) => { ... }



// exports.singleQuestionId = async (req, res) => { ... }

exports.updateQuestion = async (req, res) => {
  const questionid = req.params.questionid;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .send({ error: "Title and description are required" });
  }

  try {
    const client = await pool.connect();

    const sql = `
      UPDATE question 
      SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE questionid = $3 RETURNING id`;
    const result = await client.query(sql, [title, description, questionid]);

    if (result.rowCount === 0) {
      client.release();
      return res.status(404).json({ error: "Question not found" });
    }

    client.release();
    res.send({ message: "Question updated successfully" });
  } catch (err) {
    console.error("Error updating question:", err.message);
    res.status(500).json({ error: "Database update failed" });
  }
};

// exports.getAllSingleUserTitle = async (req, res) => { ... }

exports.deleteQuestion = async (req, res) => {
  const { questionid } = req.body;

  if (!questionid) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    await client.query("DELETE FROM answer WHERE questionid = $1", [
      questionid,
    ]);

    const result = await client.query(
      "DELETE FROM question WHERE questionid = $1 RETURNING id",
      [questionid]
    );

    await client.query("COMMIT");
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question and related answers deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err.message);
    res.status(500).json({ error: "Database deletion failed" });
  }
};
