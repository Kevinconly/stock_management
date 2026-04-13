require("dotenv").config();
const mysql = require("mysql2");
const conn = require("../db/connection");
const bcrypt = require("bcrypt");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const SECRETE = process.env.SECRETE | 1234;

//  SING UP
route.post("/signup", (req, res) => {
  const getUserEmailFromDb = "SELECT user_email FROM users WHERE user_email=?";
  const { user_email, user_name, user_password } = req.body;
  conn.query(getUserEmailFromDb, [user_email], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: `Failed to get user with this email: '${user_email}'`,
        err,
      });
    } else if (result.length > 0) {
      res.status(200).json({
        message: `This Email is already signed up, login instead`,
        result,
      });
    } else {
      const hashedPassword = await bcrypt.hash(user_password, 12);
      const insertUserIntoDatabase =
        "INSERT INTO users (user_email, user_name, user_password, created_date) VALUES (?,?,?,?)";
      const date_created = new Date();
      conn.query(
        insertUserIntoDatabase,
        [user_email, user_name, hashedPassword, date_created],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: `Failed to add User`, err });
          } else {
            res.status(201).json({ message: `User registred successfully` });
          }
        },
      );
    }
  });
});

//LOGIN

route.post("/login", (req, res) => {
  const { user_email, user_password } = req.body;
  const check_email_in_db = "SELECT * FROM users WHERE user_email = ?";
  conn.query(check_email_in_db, [user_email], async (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server err", err });
    } else if (result.length === 0) {
      res.status(403).json({ message: "Email not registred yet" });
    } else {
      const user = result[0];
      try {
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) {
          res.status(401).json({ message: "Wrong password" });
        } else {
          const token = jwt.sign(
            {
              id: user.user_id,
              email: user.user_email,
            },
            SECRETE,
            { expiresIn: "1d" },
          );
        }

        return res.status(200).json({
          message: "Login successful",
          token: token,
        });
      } catch (error) {
        console.log("Failed to login", error)
        return res.status(500).json({ message: "Authentication failed" });
      }
    }
  });
});

module.exports = route;
