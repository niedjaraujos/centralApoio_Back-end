const express = require("express");
const router = express.Router();
const controller = require("../controllers/abrigosController");

console.log(controller);

router.get("/", controller.listarAbrigos);
router.post("/", controller.criarAbrigo);
router.put("/:id", controller.atualizarAbrigo);
router.delete("/:id", controller.deletarAbrigo);

module.exports = router;
