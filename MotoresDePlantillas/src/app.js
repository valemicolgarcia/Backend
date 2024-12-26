/* CLASE 9 - motores de plantillas */

import express from "express";
import viewsRouter from "./routes/views.router.js"
const app = express();
const PUERTO = 8080;
//1. Importamos el metodo del motor de plantillas
import { engine } from "express-handlebars";



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Configuramos el motor de plantillas:
app.engine("handlebars", engine());
//aca registramos a express-handlebars como motor de plantillas para express
//el primer argumento es la extension del archivo y el segundo es el metodo del motor
app.set("view engine", "handlebars");
//establecemos a handlebars como motor predeterminado
app.set("views", "./src/views");


//rutas
app.use("/", viewsRouter);


//practicamos multer
//1. instalamos: npm i multer
//2. importamos el modulo
import multer from "multer"; //esto ponerlo arriba de todo

//si queremos que los archivos se guarden en la carpeta correcta, con formato y el nombre original, tenemos
//que configurar un storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img")
    }, //donde se guarda
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } //nombre del archivo
})


//creamos el objeto upload
//const upload = multer({ dest: "./src/public/img" });
const upload = multer({ storage }); //ya que el storage tiene toda la configuracion

//creamos una ruta para cargar una imagen desde postman
app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("Imagen cargada");
})


//Listen
app.listen(PUERTO, () => console.log("Escuchando en el 8080"));