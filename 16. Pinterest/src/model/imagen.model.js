//definimos el documento que se va a mostrar en la aplicacion

import mongoose from "mongoose";

const imagenSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String
})

const ImagenModel = mongoose.model("imagenes", imagenSchema);

export default ImagenModel;
