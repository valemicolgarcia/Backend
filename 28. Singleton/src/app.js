//PATRONES DE DISENIO Y COMUNICACION FRONT BACK

//1. CADENA DE RESPONSABILIADES (refactoring guru)
//cuando algun elemento envia informacion, a la peticion puede procesarla multiples objetos en el medio
//los middlewares cumplen con este patron de diseño (CADENA DE RESPONSABILIDADES)

//2. DECORADOR
//Permite mantener un objeto inicial generico para poder procesar informacion, pero al ser utilizado este esra abierto a ser transformado a lo largo del flujo del proceso
//en express cuando recibimos un request, el objeto request esta predefinido con ciertas propiedades, sin embargo podemos procesar n middlewares para transformar el request

//PROXY
//sustituto el cual reciba una peticion y constrola el acceso hacia otro proceso. el sustituto recibira todas las peticiones para despues corroborar a quien deberia corresponder dicha peticion y enviarsela
//cuando traemos el router de express, es un sustituto

//MVC (modelo vista controlador)
//Separacion de capas de modelo (persistencia), vista (presentacion), y controlador (negocio)

//SINGLETON
//patron utilizado para tener una instancia global a nivel aplicacion (no queremos que se multipliquen los costos de conexion)
//una instancia de la clase

import express from "express";
const app = express();
const PUERTO = 8080;

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(PUERTO, console.log("conectados"));
