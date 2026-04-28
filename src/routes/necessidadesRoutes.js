const express = require("express");
const router = express.Router();
const controller = require("../controllers/necessidadesController");

router.get("/", controller.listarNecessidades);
router.post("/", controller.criarNecessidade);
router.put("/:id", controller.atualizarNecessidade);
router.delete("/:id", controller.deletarNecessidade);

module.exports = router;
