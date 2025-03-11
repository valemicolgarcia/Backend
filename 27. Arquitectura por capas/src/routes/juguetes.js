import { Router } from "express";
const router = Router();
import JugueteController from "../controllers/juguetes.controller.js";
const JugueteController = new JugueteController();

//importar el controlador
router.post("/", jugueteController.crearJuguete);
router.get("/", jugueteController.obtenerJuguetes);

export default router;
