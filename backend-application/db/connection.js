require("dotenv").config();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password123",
  database: "mystock",
  connectionLimit: 12,
  waitForConnections: true,
});

if(conn == false){
  console.log('Failed to connect to database')
}else{
  console.log('connection esatablished')
}
module.exports = conn;
