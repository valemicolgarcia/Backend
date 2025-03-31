import express from "express";
const app = express();
const PUERTO = 8080;
import productosRouter from "./routes/producto.router.js"
import './database.js';

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use

app.listen(PUERTO, () => console.log(`Escuchando en el ${PUERTO}`));
