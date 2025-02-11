import { Router } from "express";
const router = Router();

//creamos un array de productos:
const arrayProductos = [
    { nombre: "Fideos", descripcion: "ricos", precio: 100 },
    { nombre: "Arroz", descripcion: "no se pasa", precio: 100 },
    { nombre: "Helado", descripcion: "frio", precio: 100 },
    { nombre: "Chocolate", descripcion: "dulce", precio: 100 }
]



//Rutas
router.get("/", (req, res) => {
    // res.send("Bienvenidos a la clase 9");
    const usuario = {
        nombre: "vale",
        apellido: "garcia",
        mayorEdad: true
    }
    res.render("index", { usuario, titulo: "Este es un titulo desde el backend", arrayProductos });
}) //solicitud del cliente al servidor


//contacto:
router.get("/contacto", (req, res) => {
    res.render("contacto");
})

//preguntas frecuentes
router.get("/preguntas", (req, res) => {
    res.render("preguntas");
})




export default router;
