import express from "express";
const router = express.Router();

import {
  listarAbrigos,
  criarAbrigo,
  atualizarAbrigo,
  deletarAbrigo,
} from "../controllers/abrigosController.js";

import { autenticarUsuario } from "../middlewares/authMiddleware.js";

router.get("/", listarAbrigos);
router.post("/", criarAbrigo);
router.put("/:id", atualizarAbrigo);
router.delete("/:id", autenticarUsuario, deletarAbrigo);

export default router;
