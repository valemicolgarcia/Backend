/* MONGOOSE*/

//Temas de hoy

//1. Diferentes clientes para bases de datos
//2. Mongo DB atlas
//3. DBaas (database as a service)
//4. configuracion e instalacion de mongoose
//5. crud en nuestra aplicacion

//instalamos mongoose: npm i mongoose

import express from "express";
import clientesRouterfrom from "./routes/clientes.router.js";
import clientesRouter from "./routes/clientes.router.js";
import mongoose from "mongoose";

const app = express();
const PUERTO = 8080;

import "./database.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/clientes", clientesRouter);


//listen

app.listen(PUERTO, () => console.log("Escuchando en el puerto " + PUERTO));



