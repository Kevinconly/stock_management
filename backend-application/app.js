require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const conn = require("./db/connection");

//IMPORT ROUTES
const User = require("./routes/userRoute");

app.use(express.json());
app.use(cors());
app.use("/users", User);

app.listen(PORT, console.log(`app is live at http://localhost:3500`));

