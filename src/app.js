import express from "express";
import cors from "cors";

const app = express();

import abrigos from "./routes/abrigosRoutes.js";
import doacoes from "./routes/doacoesRoutes.js";
import necessidades from "./routes/necessidadesRoutes.js";
import voluntarios from "./routes/voluntariosRoutes.js";

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

export default app;
