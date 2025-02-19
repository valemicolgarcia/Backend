import { Router } from "express";
const router = Router();
import TodoModel from "../models/todo.model.js";

//rutas
//recuperamos todas las actividades del dia
router.get("/", async (req, res) => {
    try {
        const todos = await TodoModel.find().lean();
        res.render("todos", { todos });
    } catch (error) {
        res.status(500).send("error en el servidor");
    }
})



//ruta para crear un nuevo to do
router.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    const nuevoToDo = new TodoModel({ title, description });
    try {
        await nuevoToDo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("errorrrrrrrrrrrrrrr");
    }

})

//Rutita para ver el formulario para crear nuevo: 
router.get("/new", (req, res) => {
    res.render("new");
})

//ruta para marcar to do como completado
router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todoBuscado = await TodoModel.findById(req.params.id);
        todoBuscado.completed = true;
        await todoBuscado.save();
        res.redirect("/");

    } catch (error) {
        res.status(500).send("errorrrorooror");
    }
})

//ruta para eliminar actividad
router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.redirect("/");

    } catch (error) {
        res.status(500).send("errorrrorooror");
    }
})



export default router;