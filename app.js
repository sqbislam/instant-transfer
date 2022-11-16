
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(express.json());

const userRouter = require("./routes/userRoutes")
const qrRouter = require("./routes/qrRoutes")

app.use("/users", userRouter);
app.use("/qr", qrRouter); // Add catalog routes to middleware chain.


module.exports = app;



