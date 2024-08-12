const bcrypt = require('bcryptjs');
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;
  const profileImage = req.file ? req.file.path : null;

  if (!username || !email || !firstname || !password || !lastname) {
    return res.status(400).json({ msg: "Please provide all information" });
  } else if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters!" });
  }

  try {
    const client = await pool.connect();

    const { rows: existingUsers } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const { rows: existingUsername } = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUsers.length > 0) {
      client.release();
      return res.status(401).json({ msg: "User already exists" });
    }

    if (existingUsername.length > 0) {
      client.release();
      return res.status(401).json({ msg: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO users (username, email, firstname, lastname, password, profileimage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid";
    const { rows: result } = await client.query(sql, [
      username,
      email,
      firstname,
      lastname,
      hashedPassword,
      profileImage,
    ]);
    req.body.id = result[0].userid;
    client.release();

    res.status(201).json({ id: result[0].userid, message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Please provide all information" });
  }

  try {
    const client = await pool.connect();

    const { rows: existingEmail } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingEmail.length == 0) {
      return res.status(401).json({ message: "Email does not exist" });
    }
    const user = existingEmail[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { userid, username, profileimage:profileImage } = user;
    const token = jwt.sign(
      { userid, username, email ,profileImage},
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    client.release();

    return res.status(200).json({ username, token: token });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.check = (req, res) => {
  const { username, userid,  profileImage } = req.user;
  res.status(200).json({ message: "valid user", username, userid, profileImage });
};
