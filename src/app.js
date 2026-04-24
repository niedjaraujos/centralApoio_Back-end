const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("Servidor da CentralApoio rodando!");
});

module.exports = app;
