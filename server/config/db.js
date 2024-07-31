// const { Pool } = require("pg");
// require("dotenv").config();
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   // ssl: {
// //   //   rejectUnauthorized: false, // Set to true if you have a valid certificate
// //   // },
// // });
// const pool = new Pool({
//   user: process.env.USER,
//   // host: process.env.PGHOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });


// const createUserTable = `


// CREATE TABLE IF NOT EXISTS public.users
// (
//     userid integer NOT NULL DEFAULT nextval('users_userid_seq'::regclass),
//     username character varying(20) COLLATE pg_catalog."default" NOT NULL,
//     firstname character varying(20) COLLATE pg_catalog."default" NOT NULL,
//     lastname character varying(20) COLLATE pg_catalog."default" NOT NULL,
//     email character varying(40) COLLATE pg_catalog."default" NOT NULL,
//     password character varying(100) COLLATE pg_catalog."default" NOT NULL,
//     profileimage character varying(255) COLLATE pg_catalog."default",
//     CONSTRAINT users_pkey PRIMARY KEY (userid)
// )


//   )`;

// const createQuestionTable = `


// CREATE TABLE IF NOT EXISTS public.question
// (
//     id integer NOT NULL DEFAULT nextval('question_id_seq'::regclass),
//     questionid character varying(100) COLLATE pg_catalog."default" NOT NULL,
//     userid integer NOT NULL,
//     title character varying(50) COLLATE pg_catalog."default" NOT NULL,
//     description character varying(200) COLLATE pg_catalog."default" NOT NULL,
//     tag character varying(20) COLLATE pg_catalog."default",
//     created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT question_pkey PRIMARY KEY (id),
//     CONSTRAINT question_questionid_key UNIQUE (questionid),
//     CONSTRAINT question_userid_fkey FOREIGN KEY (userid)
//         REFERENCES public.users (userid) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
// )
  
// `;

// const createAnswerTable = `



// CREATE TABLE IF NOT EXISTS public.answer
// (
//     answerid character varying(100) COLLATE pg_catalog."default" NOT NULL,
//     userid integer,
//     questionid character varying(100) COLLATE pg_catalog."default" NOT NULL,
//     answer character varying(255) COLLATE pg_catalog."default" NOT NULL,
//     created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT answer_pkey PRIMARY KEY (answerid),
//     CONSTRAINT answer_questionid_fkey FOREIGN KEY (questionid)
//         REFERENCES public.question (questionid) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION,
//     CONSTRAINT answer_userid_fkey FOREIGN KEY (userid)
//         REFERENCES public.users (userid) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
// )
  

// `;

// async function createTables() {
//   const client = await pool.connect();

//   try {
//     await client.query(createUserTable);
//     console.log("User Table created successfully.");

//     await client.query(createQuestionTable);
//     console.log("Question Table created successfully.");

//     await client.query(createAnswerTable);
//     console.log("Answer Table created successfully.");
//   } catch (err) {
//     console.error("Error creating tables:", err.stack);
//   } finally {
//     client.release();
//   }
// }

// createTables().catch((err) =>
//   console.error("Error during table creation:", err.stack)
// );

// module.exports = pool;





const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST, // or your PGHOST if on a different server
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,  // Adjust as needed for your SSL configuration
  },
});
module.exports = pool;
// const createUserTable = `
// CREATE TABLE IF NOT EXISTS public.users
// (
//     userid SERIAL PRIMARY KEY,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     profileimage VARCHAR(255)
// )`;

// const createQuestionTable = `
// CREATE TABLE IF NOT EXISTS public.question
// (
//     id SERIAL PRIMARY KEY,
//     questionid VARCHAR(100) UNIQUE NOT NULL,
//     userid INTEGER NOT NULL REFERENCES public.users(userid),
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`;

// const createAnswerTable = `
// CREATE TABLE IF NOT EXISTS public.answer
// (
//     answerid VARCHAR(100) PRIMARY KEY,
//     userid INTEGER REFERENCES public.users(userid),
//     questionid VARCHAR(100) REFERENCES public.question(questionid),
//     answer VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`;

// async function createTables() {
//   const client = await pool.connect();
//   try {
//     await client.query(createUserTable);
//     console.log("User Table created successfully.");

//     await client.query(createQuestionTable);
//     console.log("Question Table created successfully.");

//     await client.query(createAnswerTable);
//     console.log("Answer Table created successfully.");
//   } catch (err) {
//     console.error("Error creating tables:", err.stack);
//   } finally {
//     client.release();
//   }
// }

// createTables().catch((err) =>
//   console.error("Error during table creation:", err.stack)
// );


