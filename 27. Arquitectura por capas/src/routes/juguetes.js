import { Router } from "express";
const router = Router();

//Importar el controlador:
import JugueteController from "../controllers/juguetes.controller.js";
const jugueteController = new JugueteController();

//no hace la logica, solo dirige. cada ruta llama a una funcion en el controlador
router.post("/", jugueteController.crearJuguete);
router.get("/", jugueteController.obtenerJuguetes);

export default router;
