require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT; // here you ise else port when isn't in .env file
const conn = require("./db/connection");

//IMPORT ROUTES
const User = require("./routes/userRoute");
const auth = require("./routes/Auth")
const productRoute = require('./routes/productRoute')
const stockOut = require('./routes/stock_outRoute')

app.use(express.json());
app.use(cors());
app.use("/users", User);
app.use("/auth", auth)
app.use('/product', productRoute)
app.use('/stock_out', stockOut)

app.listen(PORT, console.log(`app is live at http://localhost:${PORT}`));

