const express = require("express");
const router = express.Router();
const controller = require("../controllers/doacoesController");

router.get("/", controller.listarDoacoes);
router.post("/", controller.criarDoacao);
router.put("/:id", controller.atualizarDoacao);
router.delete("/:id", controller.deletarDoacao);

module.exports = router;
