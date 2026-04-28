const express = require("express");
const router = express.Router();
const controller = require("../controllers/voluntariosControllerr");

router.get("/", controller.listarVoluntarios);
router.post("/", controller.criarVoluntario);
router.put("/:id", controller.atualizarVoluntario);
router.delete("/:id", controller.deletarVoluntario);

module.exports = router;
