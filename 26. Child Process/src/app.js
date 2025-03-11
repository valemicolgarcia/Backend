//CHILD PROCESS
//Tecnica que vamos a utilizar: fork

import express from "express";
//corregit errores porque no anda, fijarse el repo
const app = express();
const PUERTO = 8080;

app.get("/", (req, res) => {
  res.send("hola");
});

import { fork } from "child_process";
//const { fork } = require("child_process");
//no hace falta instalar nada, es un proceso nativo de node

app.get("/suma", (req, res) => {
  const child = fork("./src/operacionesComplejas.js");
  child.send("iniciando");
  child.once("message", (mensaje) => {
    res.send(`el resultado de la operacion es: ${mensaje}`);
  });
});

app.listen(PUERTO, () => console.log(`Estamos bien`));

//tenemos que lograr que el proceso de suma se realiza sin bloquear al resto de los endpoints
//comenzamos con la estructura del forkeo

//1. separamos la funcion que trae problemas a otro modulo.
//2. la modificamos y la dejamos disponible para cuando el padre la solicite
//3. ejecutamos la ruta
