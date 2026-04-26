const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const abrigos = require("./routes/abrigosRoutes");

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use("/abrigos", abrigos);

module.exports = app;
