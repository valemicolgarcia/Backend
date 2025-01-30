//PRACTICA INTEGRADORA

//CODEREST

//Instalar express, express-handlebars, mongoose y multer

import express from "express";
//import { ExpressHandlebars } from "express-handlebars";
import { engine } from "express-handlebars";
import multer from "multer";
import routerImagenes from "./routes/imagen.router.js";
import "./database.js";

const app = express();
const PUERTO = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));

//MULTER
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "./src/public/img");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }
)
app.use(multer({ storage }).single("image"));
//lo que le paso a single debe coincidir con la clave que esta puesta en upload.handlebars
//esta linea: <input type="file" name="image">



//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");




//rutas
app.use("/", routerImagenes);

app.listen(PUERTO, () => console.log("Escuchando en el puerto " + PUERTO));


