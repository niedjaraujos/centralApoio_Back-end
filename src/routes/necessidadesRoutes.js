import express from "express";
const router = express.Router();

import {
  listarNecessidades,
  criarNecessidade,
  atualizarNecessidade,
  deletarNecessidade,
} from "../controllers/necessidadesController.js";

router.get("/", listarNecessidades);
router.post("/", criarNecessidade);
router.put("/:id", atualizarNecessidade);
router.delete("/:id", deletarNecessidade);

export default router;
