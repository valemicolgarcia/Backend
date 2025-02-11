import { Router } from "express";
//necesito importar el imagenModel
import ImagenModel from "../model/imagen.model.js";
import { promises as fs } from "fs";

const routerImagenes = Router();

//ruta raiz que muestra el muro con las imagenes

routerImagenes.get("/", async (req, res) => { //para que me muestre el index
    const imagenes = await ImagenModel.find().lean();
    res.render("index", { imagenes });
})

//Ruta upload, para acceder al formulario de carga
routerImagenes.get("/upload", (req, res) => {
    res.render("upload");
});

//configuracion de multer para poder acceder a la imagen
//RUTA upload para subir imagenes con multer

routerImagenes.post("/upload", async (req, res) => {
    try {
        const imagen = new ImagenModel();
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename;

        //guardamos la nueva imagen en la base de datos
        await imagen.save();
        res.redirect("/");



    } catch (error) {
        res.status(500).send({ mensaje: "Error en el post de imagen.router.js" });
    }
})


//ruta para eliminar una imagen
routerImagenes.get("/image/:id/delete", async (req, res) => {
    let { id } = req.params;
    const imagen = await ImagenModel.findByIdAndDelete(id);
    //para eliminar archivo que tengo en mi proyecto: filesystem
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");

});


export default routerImagenes;

