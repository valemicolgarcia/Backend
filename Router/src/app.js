import express from "express";
const app = express();
const PUERTO = 8080;
import mascotasRouter from "./routes/mascotas.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//me permite tomar datos complejos querys o datos de un formukario

//rutas
app.use("/", mascotasRouter);
app.use("/", usuariosRouter);

//podes poner el apipe


//este queda siempre en la app
app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto de mar del plata");
})

app.use(express.static("Public"));