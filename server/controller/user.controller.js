// // const bcrypt = require("bcrypt");
// // const pool = require("../config/database"); 
// // const jwt = require("jsonwebtoken");

// // exports.register = async (req, res) => {
// //   const { username, email, firstName, lastName, password } = req.body;

// //   if (!username || !email || !firstName || !password || !lastName) {
// //     return res.status(400).json({ msg: "Please provide all information" });
// //   } else if (password.length < 8) {
// //     return res
// //       .status(400)
// //       .json({ msg: "Password must be at least 8 characters!" });
// //   }

// //   try {
// //     const client = await pool.connect();

// //     const { rows: existingUsers } = await client.query(
// //       "SELECT * FROM users WHERE email = $1",
// //       [email]
// //     );
// //     const { rows: existingUsername } = await client.query(
// //       "SELECT * FROM users WHERE username = $1",
// //       [username]
// //     );

// //     if (existingUsers.length > 0) {
// //       client.release();
// //       return res.status(401).json({ msg: "User already exists" });
// //     }

// //     if (existingUsername.length > 0) {
// //       client.release();
// //       return res.status(401).json({ msg: "Username already exists" });
// //     }

// //     const saltRounds = 10;
// //     const hashedPassword = await bcrypt.hash(password, saltRounds);

// //     const sql =
// //       "INSERT INTO users (username, email, firstName, lastName, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id";
// //     const { rows: result } = await client.query(sql, [
// //       username,
// //       email,
// //       firstName,
// //       lastName,
// //       hashedPassword,
// //     ]);
// //     req.body.id = result[0].user_id;
// //     client.release();

// //     res
// //       .status(201)
// //       .json({ id: result[0].user_id, message: "User registered successfully" });
// //   } catch (err) {
// //     console.error("Error registering user:", err.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // };

// // exports.getUserById = async (req, res) => {
// //   const { id } = req.body;

// //   if (!id) {
// //     return res.status(400).json({ error: "User ID is required" });
// //   }

// //   try {
// //     const client = await pool.connect();

// //     const { rows } = await client.query(
// //       "SELECT * FROM users WHERE user_id = $1",
// //       [id]
// //     );
// //     client.release();

// //     if (rows.length > 0) {
// //       res.status(200).json(rows[0]);
// //     } else {
// //       res.status(404).json({ error: "User not found" });
// //     }
// //   } catch (err) {
// //     console.error("Error fetching user:", err.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // };


// // exports.getAllUsers = async (req, res) => {
// //   try {
// //     const client = await pool.connect();

// //     const { rows } = await client.query("SELECT * FROM users");
// //     client.release();

// //     res.status(200).json(rows);
// //   } catch (err) {
// //     console.error("Error fetching users:", err.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;

// //   if (!email || !password) {
// //     return res.status(401).json({ message: "Please provide all information" });
// //   }

// //   try {
// //     const client = await pool.connect();

// //     const { rows: existingEmail } = await client.query(
// //       "SELECT * FROM users WHERE email = $1",
// //       [email]
// //     );
// //     if (existingEmail.length == 0) {
// //       return res.status(401).json({ message: "Email does not exist" });
// //     }
// //     const user = existingEmail[0];

// //     const passwordMatch = await bcrypt.compare(password, user.password);
// //     if (!passwordMatch) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }
// //     const { user_id, username } = user;
// //     const token = jwt.sign(
// //       { user_id, username, email },
// //       process.env.secretKey,
// //       {
// //         expiresIn: "1h",
// //       }
// //     );

// //     client.release();

// //     return res.status(200).json({ username, token: token });
// //   } catch (error) {
// //     console.error("Error logging in user:", error.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // };


// // exports.check = (req, res) => {
// //   const { username, user_id, email, password } = req.user;
// //   res
// //     .status(200)
// //     .json({ message: "valid user", username, user_id, email, password });
// // };




// const bcrypt = require("bcrypt");
// const pool = require("../config/database");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { username, email, firstname, lastname, password } = req.body;

//   if (!username || !email || !firstname || !password || !lastname) {
//     return res.status(400).json({ msg: "Please provide all information" });
//   } else if (password.length < 8) {
//     return res
//       .status(400)
//       .json({ msg: "Password must be at least 8 characters!" });
//   }

//   try {
//     const client = await pool.connect();

//     const { rows: existingUsers } = await client.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );
//     const { rows: existingUsername } = await client.query(
//       "SELECT * FROM users WHERE username = $1",
//       [username]
//     );

//     if (existingUsers.length > 0) {
//       client.release();
//       return res.status(401).json({ msg: "User already exists" });
//     }

//     if (existingUsername.length > 0) {
//       client.release();
//       return res.status(401).json({ msg: "Username already exists" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const sql =
//       "INSERT INTO users (username, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING userid";
//     const { rows: result } = await client.query(sql, [
//       username,
//       email,
//       firstname,
//       lastname,
//       hashedPassword,
//     ]);
//     req.body.id = result[0].userid;
//     client.release();

//     res
//       .status(201)
//       .json({ id: result[0].userid, message: "User registered successfully" });
//   } catch (err) {
//     console.error("Error registering user:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getUserById = async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     const client = await pool.connect();

//     const { rows } = await client.query(
//       "SELECT * FROM users WHERE userid = $1",
//       [id]
//     );
//     client.release();

//     if (rows.length > 0) {
//       res.status(200).json(rows[0]);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (err) {
//     console.error("Error fetching user:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const client = await pool.connect();

//     const { rows } = await client.query("SELECT * FROM users");
//     client.release();

//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("Error fetching users:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(401).json({ message: "Please provide all information" });
//   }

//   try {
//     const client = await pool.connect();

//     const { rows: existingEmail } = await client.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );
//     if (existingEmail.length == 0) {
//       return res.status(401).json({ message: "Email does not exist" });
//     }
//     const user = existingEmail[0];

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const { userid, username } = user;
//     const token = jwt.sign(
//       { userid, username, email },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     client.release();

//     return res.status(200).json({ username, token: token });
//   } catch (error) {
//     console.error("Error logging in user:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.check = (req, res) => {
//   const { username, userid, email, password } = req.user;
//   res
//     .status(200)
//     .json({ message: "valid user", username, userid, email, password });
// };

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

// exports.getUserById = async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     const client = await pool.connect();

//     const { rows } = await client.query(
//       "SELECT * FROM users WHERE userid = $1",
//       [id]
//     );
//     client.release();

//     if (rows.length > 0) {
//       res.status(200).json(rows[0]);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (err) {
//     console.error("Error fetching user:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const client = await pool.connect();

//     const { rows } = await client.query("SELECT * FROM users");
//     client.release();

//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("Error fetching users:", err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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

// exports.check = (req, res) => {
//   const { username, userid, 
//     profileimage:profileImage  } = req.user; // Extract profileImage from req.user
    
//   res
//     .status(200)
//     .json({ message: "valid user", username, userid, profileImage }); // Include profileImage in the response
// };

// exports.check = (req, res) => {

//   const username =  req.user.username
//   const userid = req.user.userid   
//    // const { username, userid, profileImage } = req.user; // Extract profileImage from req.user
//   res.status(200).json({ message: "valid user", username, userid }); // Include profileImage in the response
// };


exports.check = (req, res) => {
  const { username, userid,  profileImage } = req.user;
  res.status(200).json({ message: "valid user", username, userid, profileImage });
};
