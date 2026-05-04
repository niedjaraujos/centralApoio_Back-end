import express from "express";
const router = express.Router();

import {
  listarVoluntarios,
  criarVoluntario,
  atualizarVoluntario,
  deletarVoluntario,
} from "../controllers/voluntariosController.js";

router.get("/", listarVoluntarios);
router.post("/", criarVoluntario);
router.put("/:id", atualizarVoluntario);
router.delete("/:id", deletarVoluntario);

export default router;
