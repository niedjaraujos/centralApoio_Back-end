const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const abrigos = require("./routes/abrigosRoutes");
const doacoes = require("./routes/doacoesRoutes");
const necessidades = require("./routes/necessidadesRoutes");
const voluntarios = require("./routes/voluntariosRoutes");

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("<h1>Central Apoio!</h1>");
});

app.use("/abrigos", abrigos);
app.use("/necessidades", necessidades);
app.use("/doacoes", doacoes);
app.use("/voluntarios", voluntarios);

module.exports = app;
