require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(express.json());

const userRouter = require("./routes/userRoutes");
const qrRouter = require("./routes/qrRoutes");
const textRouter = require("./routes/textRoutes");

app.use("/users", userRouter);
app.use("/qr", qrRouter); // Add QR routes to middleware chain.
app.use("/text", textRouter); // Add Text File routes to middleware chain.

module.exports = app;
