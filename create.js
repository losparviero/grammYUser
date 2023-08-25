#!/usr/bin/env node
// create.js

require("dotenv").config();
const mysql = require("mysql2");
const input = require("input");

async function create() {
  let userChoice = await input.confirm(
    "Welcome! ✨\ngrammYUser is a middlware for the grammY framework to manage users.\nIf you're just starting, first create a database on Planetscale or your favorite SQL db of choice.\nNext, ensure that you have added the DB_URL in the .env\nWould you like to create a table?"
  );

  if (!process.env.DB_URL) {
    throw new Error(
      "Database URL not found.\nEnsure you have added DB_URL to .env"
    );
  }

  if (!userChoice) {
    process.exit();
  } else {
    const connection = mysql.createConnection(process.env.DB_URL);
    if (!conncection) {
      throw new Error(
        "Error establishing connection to db.\nPlease check your network settings."
      );
    }

    const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid BIGINT UNSIGNED,
    username CHAR(255),
    firstName CHAR(255),
    lastName CHAR(255),
    firstSeen DATETIME,
    lastSeen DATETIME,
    isBlacklisted TINYINT(1)
  )
`;

    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log(
          'Table "users" created successfully.\nYou have initialized the db.'
        );
      }
      connection.end();
    });
  }
}

create();
