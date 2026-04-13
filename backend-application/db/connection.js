require("dotenv").config();
const mysql = require("mysql2");

const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const conn = mysql.createConnection({
  host: requireEnv("DB_HOST"),
  user: requireEnv("DB_USERNAME"),
  password: requireEnv("DB_PASSWORD"),
  database: requireEnv("DB_NAME"),
});

module.exports = conn;
