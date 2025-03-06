//temas de hoy

/* 
//objeto process: cada vez que ejecuta en consola node src/app.js, se crea automaticamente 
//un objeto llamado process que contiene informacion sobre este proceso

//console.log(process);

//algunos elementos importantes
console.log(process.cwd()); //directorio actual del proceso

console.log(process.pid); //obtengo el id del proceso en el sistema operativo

console.log(process.memoryUsage());//me retorna el uso de memoria. los valores estan en bytes

console.log(process.version); //me retorna la version de node

//process.exit(); //me permite salir del proceso
console.log("texto adicional"); //esto no se muestra ya que antes puse exit, no se ejecuta

//manejo de argumentos
console.log(process.argv); //retorna un array con los elementos del sistema, cada uno de los argumentos que pasamos por consola
//ya que en consola yo puse: node src/app.js

//commander: libreria para manejar argumentos en consola
//npm i commander

*/

//levantamos un servidor
import express from "express";
const app = express();
import configObject from "./config/config.js"
import UserModel from "./models/usuario.model.js";

const { mongo_url, puerto } = configObject;

mongoose.connect(mongo_url)
    .then(() => console.log("conectados a la bd"))
    .catch((error) => console.log("tenemos un error" + error))


app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
    } catch (error) {
        res.status(500).send("error");
    }

})

app.listen(8080, () => console.log("todo funcionando"));



//listeners:

//process.on(), es un metodo que te permite registrar escuchadores de eventos (listeners) 
// para eventos especificos en ejecucion

//algunos de los mas conocidos
//"exit": para ejecutar codigo justo antes de la finalizacion del proceso

process.on("exit", (code) => {
    // console.log("este codigo se ejecutara justo antes de la finalizacion del proceso");
    console.log("finalizamos con el siguiente codigo", code);
})

// "uncaughtException" : para atrapar alguna excepcion que no haya sido considerada en algun catch


process.on("uncaughtException", (error) => {
    console.log("tuvimos que capturar un error" + error);
    process.exitCode = 1;

})

//generamos un error:
firulais();

//esta linea me sirve para registrar un error pero no reemplaza al bloque try catch
//ya que en caso de error, la ejecucion del programa se detiene


