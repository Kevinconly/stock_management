const express = require("express");
const conn = require("../db/connection");
const route = express.Router();


//get all stockout made
route.get("/", (req, res) => {
  const query = "SELECT * FROM stock_out";
  conn.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ result });
    }
  });
});

//perform stock out
route.post("/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT product_id, product_name, quantity FROM products WHERE product_id =?";
  conn.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error", err });
    } else if (result.length < 1) {
      res.status(404).json({ message: "There is no such product in database" });
    } else {
      const date_out = new Date().toISOString().slice(0, 10);
      const query = "INSERT INTO stock_out (product_id, date_out) VALUES(?,?)";
      console.log(id);
      conn.query(query, [id, date_out], (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error", err });
        } else {
          const update_product_quantity =
            "UPDATE products SET quantity = quantity -1 WHERE product_id=?";
          conn.query(update_product_quantity, [id], (err, result) => {
            if (err) {
              res.status(500).json({ message: "Internal server error", err });
            } else {
              res
                .status(201)
                .json({
                  message: "Insert successful and product quantity updated",
                  result,
                });
            }
          });
        }
      });
    }
  });
});

module.exports = route;
