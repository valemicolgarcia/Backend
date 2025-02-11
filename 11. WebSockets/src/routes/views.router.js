import { Router } from "express";
const router = Router();

//rutas
router.get("/", (req, res) => {
    res.render("index");
})

//Ejemplo de ejercicio para la siguiente preentrega
//1. Importas el product manager. 
//2. creas una instancia
//3. usas el metodo getProducts

//punto 1 de la segunda preentrega

router.get("/", async (req, res) => {
    try {
        const productos = await manager.getProducts();
        res.render("home", { productos })
    } catch (error) {
        res.status(500).send("Error fatal");
    }
})

export default router;