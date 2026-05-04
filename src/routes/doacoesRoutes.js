import express from "express";
const router = express.Router();

import {
  listarDoacoes,
  criarDoacao,
  atualizarDoacao,
  deletarDoacao,
} from "../controllers/doacoesController.js";

router.get("/", listarDoacoes);
router.post("/", criarDoacao);
router.put("/:id", atualizarDoacao);
router.delete("/:id", deletarDoacao);

export default router;
