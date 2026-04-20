const express = require("express");
const conn = require("../db/connection");
const route = express.Router();

route.post("/", (req, res) => {
  const { product_name, quantity } = req.body;

  // 1. Use ISO format (YYYY-MM-DD) for SQL compatibility
  const date_in = new Date().toISOString().slice(0, 10);

  const findQuery = "SELECT * FROM products WHERE product_name = ?";

  conn.query(findQuery, [product_name], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Internal server error", err });

    if (result.length > 0) {
      // PRODUCT EXISTS: Update quantity
      const newQuantity = Number(quantity) + result[0].quantity;

      // CRITICAL: Added WHERE clause so you don't overwrite the whole DB
      const updateQuery =
        "UPDATE products SET quantity = ? WHERE product_name = ?";

      conn.query(
        updateQuery,
        [newQuantity, product_name],
        (err, updateResult) => {
          if (err)
            return res.status(500).json({ message: "Update failed", err });

          return res.status(200).json({
            message: "Product quantity updated successfully",
            result: updateResult,
          });
        },
      );
    } else {
      // PRODUCT DOES NOT EXIST: Insert new
      const insertQuery =
        "INSERT INTO products (product_name, date_in, quantity) VALUES (?,?,?)";

      conn.query(
        insertQuery,
        [product_name, date_in, quantity],
        (err, insertResult) => {
          if (err)
            return res.status(500).json({ message: "Insert failed", err });

          // 2. You MUST send a response here
          return res.status(201).json({
            message: "New product added successfully",
            result: insertResult,
          });
        },
      );
    }
  });
});
//get all products
route.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  conn.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server err", err });
    } else {
      res.status(200).json({ result });
    }
  });
});

//get single product
route.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE product_id=?";

  conn.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server err", err });
    } else {
      res.status(200).json({ result });
    }
  });
});
//update product which will be used to
//  update date out
// (when all products ran out of stock)
//  removing date out when same
// product is brought back
route.put("/:id", (req, res) => {
  const { id } = req.params;
  const { product_name, date_in, date_out, quantity } = req.body;
  const query =
    "UPDATE products SET product_name =?, date_in=?, date_out=?, quantity=? WHERE product_id=?";

  conn.query(
    query,
    [product_name, date_in, date_out, quantity, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Internal server err", err });
      } else {
        res.status(200).json({ result });
      }
    },
  );
});
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE product_id =?";
  conn.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error", err });
    } else {
      res
        .status(204)
        .json({ message: `The user with id:'${id}' deleted successfully` });
    }
  });
});
module.exports = route;
