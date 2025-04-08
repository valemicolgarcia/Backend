//PROCESS GLOBAL - CHILD PROCESS

//1. Objeto process
//2. manejo de argumentos
//3. commander JS
//4. manejo de variables de entorno
//5. child process

console.log(process);

//algunos de los elementos importantes:

console.log(process.cwd()); //directorio actual del proceso
console.log(process.pid); //obtengo el id del proceso
console.log(process.version); //version de node js
//process.exit();
console.log("texto adicional"); //esto no se ejecuta nunca debido al exit

//manejo de argumentos
//process.argv = muestra los argumentos pasados por CLI
console.log(process.argv);

//levantamos un mini servidor
import express from "express";
const app = express();

//mongodb+srv://valemicolgarcia:<db_password>@cluster0.rslwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import configObject from "./config/config.js";
import UserModel from "./models/usuarios.model.js";
import mongoose from "mongoose";

const { mongo_url } = configObject;
mongoose
  .connect(mongo_url)
  .then(() => console.log("conectados"))
  .catch(() => console.log("eroror "));

//rutas
app.get("/", async (req, res) => {
  try {
    const usuarios = await UserModel.find();
    res.send(usuarios);
  } catch (error) {
    res.status(600).send("error");
  }
});
