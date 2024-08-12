const pool = require("../config/db");

exports.AddAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
const userid = req.user.userid
  console.log("Received payload:", { questionid, answer, userid}); // Log the payload

  if (!answer || !questionid ) {
    return res.status(400).json({ msg: "Please provide all information" });
  }

  try {
    const client = await pool.connect();
    const sql = "INSERT INTO answer (answerid, userid, questionid, answer) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING answerid";
    const result = await client.query(sql, [userid,questionid, answer]);

    client.release();

    res
      .status(201)
      .json({ id: result.rows[0].answerid, userid,answer, message: "Answer posted successfully" });
  } catch (err) {
    console.error("Error delivering message:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllAnswers = async (req, res) => {
  try {
    const client = await pool.connect();
    const sql = `
      SELECT 
        answer.answerid,
        answer.answer,
        answer.questionid,
        answer.userid,
        users.username AS username
      FROM 
        answer
      LEFT JOIN 
        users ON answer.userid = users.userid
         ORDER BY 
        answer.created_at DESC`; ;

    const result = await client.query(sql);
    client.release();

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching answers:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAnswer = async (req, res) => {
  const { answerid } = req.params;
const { userid } = req.user.userid
console.log(userid)
  if (!answerid) {
    return res.status(400).json({ error: "Answer ID is required" });
  }

  try {
    const client = await pool.connect();
    const sql = "DELETE FROM answer WHERE answerid = $1  RETURNING answerid";
    const result = await client.query(sql, [answerid]);

    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    console.error("Error deleting answer:", err.message);
    res.status(500).json({ error: "Database deletion failed" });
  }
};
