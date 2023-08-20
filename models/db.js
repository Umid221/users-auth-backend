const mysql = require("mysql");
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the database!`);
});

module.exports = connection;
