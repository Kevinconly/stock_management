const mysql = require("mysql2");
const conn = require("../db/connection");
const bcrypt = require("bcrypt");
const express = require("express");
const route = express.Router();

//  ADD USER
route.post("/", (req, res) => {
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

//GET ALL USERS

route.get("/", (req, res) => {
  const getallusersquery = "SELECT * FROM users";
  conn.query(getallusersquery, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to get all users", err });
    } else if (result.length < 1) {
      res.status(200).json({ message: "No user Found in database" });
    } else {
      res.status(200).json({ message: "List Of Users:", result });
    }
  });
});

//GET USERS BASED ON THEIR ID'S

route.get("/:id", (req, res) => {
  const { id } = req.params;
  const get_user_based_on_Id_query = "SELECT * FROM users WHERE user_id =?";
  conn.query(get_user_based_on_Id_query, [id], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: `Failed to get user with id: ${id}`, err });
    } else if (result.length < 1) {
      res
        .status(200)
        .json({ message: `There is no user with such Id: 'id: ${id}'` });
    } else {
      res
        .status(200)
        .json({ message: `Details of user with id: ${id}`, result });
    }
  });
});
//UPDATE USER

route.put("/:id", (req, res) => {
  const { id } = req.params;
  const { user_email, user_name } = req.body;
  const checkTheUserValidity = "SELECT * FROM users WHERE user_id=?";
  conn.query(checkTheUserValidity, [id], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Failed to check if user is in database", err });
    } else if (result.length < 1) {
      res
        .status(200)
        .json({ message: `User with id: '${id}' is not in database` });
    } else {
      const check_if_the_email_is_not_in_use =
        "SELECT user_email FROM users WHERE user_email =?";
      conn.query(
        check_if_the_email_is_not_in_use,
        [user_email],
        (err, result) => {
          if (err) {
            res
              .status(500)
              .json({ message: "Failed to check if email is already in use" });
          } else if (result.length > 0) {
            res.status(200).json({
              message:
                "You can't update to this email becouse it is already in use!",
            });
          } else {
            const updat_user_query =
              "UPDATE users SET user_name =?, user_email = ?";
            conn.query(
              updat_user_query,
              [user_email, user_name],
              (err, result) => {
                if (err) {
                  res.status(500).json({
                    message: `Failed to update user with id: ${id}`,
                    err,
                  });
                } else {
                  res
                    .status(200)
                    .json({ message: "User Updated successfully" });
                }
              },
            );
          }
        },
      );
    }
  });
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;
  const checkTheUserValidity = "SELECT * FROM users WHERE user_id = ?";
  conn.query(checkTheUserValidity, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to find user", err });
    } else if (result.length < 1) {
      res.status(400).json({ message: "We couldn't find user with this id" });
    } else {
      const delete_user_query = "DELETE FROM users WHERE user_id =?";
      conn.query(delete_user_query, [id], (err, result) => {
        if (err) {
          res.status(500).json({ message: "Failed to delete user", err });
        } else {
          res
            .status(200)
            .json({ message: `User with id '${id}' was successfully deleted` });
        }
      });
    }
  });
});
module.exports = route;
