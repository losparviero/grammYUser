#!/usr/bin/env node

/*!
 * grammYUser
 * Copyright (c) 2023
 *
 * @author Zubin
 * @username (GitHub) losparviero
 * @license AGPL-3.0
 */

// User [Plugin]

async function user(ctx, next) {
  const mysql = require("mysql2");
  if (!process.env.DB_URL) {
    throw new Error("Database URL not found.");
  }
  const connection = mysql.createConnection(process.env.DB_URL);
  if (!connection) {
    throw new Error(
      "Error establishing database connection.\nPlease check network settings."
    );
  }

  // Command: Start
  if (ctx.message && ctx.message?.text === "/start") {
    connection.query(
      `
SELECT * FROM users WHERE userid = ?
`,
      [ctx.from.id],
      (error, results) => {
        if (error) throw error;
        if (results.length === 0) {
          connection.query(
            `
    INSERT INTO users (userid, username, firstName, lastName, firstSeen)
    VALUES (?, ?, ?, ?, NOW())
  `,
            [
              ctx.from.id,
              ctx.from.username,
              ctx.from.first_name,
              ctx.from.last_name,
            ],
            (error, results) => {
              if (error) throw error;
              console.log("New user added to database.");
            }
          );
        } else {
          console.log("User exists in database.");
        }
      }
    );
  }
  // Recent Interaction
  if (ctx.message && ctx.message?.text != "/start") {
    connection.query(
      `
  UPDATE users SET lastSeen = NOW() WHERE userid = ?
  `,
      [ctx.from.id],
      (error, results) => {
        if (error) throw error;
      }
    );
  }
  await next();
}

bot.use(user);
