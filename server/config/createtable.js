// const createUserTable = `

const pool = require("./db");

const createUserTable = `
CREATE TABLE IF NOT EXISTS public.users
(
    userid SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    profileimage VARCHAR(255)
)`;

const createQuestionTable = `
CREATE TABLE IF NOT EXISTS public.question
(
    id SERIAL PRIMARY KEY,
    questionid VARCHAR(100) UNIQUE NOT NULL,
    userid INTEGER NOT NULL REFERENCES public.users(userid),
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createAnswerTable = `
CREATE TABLE IF NOT EXISTS public.answer
(
    answerid VARCHAR(100) PRIMARY KEY,
    userid INTEGER REFERENCES public.users(userid),
    questionid VARCHAR(100) REFERENCES public.question(questionid),
    answer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(createUserTable);
    console.log("User Table created successfully.");

    await client.query(createQuestionTable);
    console.log("Question Table created successfully.");

    await client.query(createAnswerTable);
    console.log("Answer Table created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err.stack);
  } finally {
    client.release();
  }
}

createTables().catch((err) =>
  console.error("Error during table creation:", err.stack)
);

module.exports = createTables