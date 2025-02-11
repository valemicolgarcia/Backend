// CLASE 4 - NODE Y NPM

//MODULOS: archivo de js que contiene un conjunto de funcines que nos permiten resolver una tarea en particular

//A) modulos escritos oor nosotros

//con common js

//const saludos = require("./saludos.js");
//saludos.temprano();
//saludos.tarde();
//saludos.noche();

//como creamos un package.json?
//inicializar el proyecto a partir de npm
//si pones npm init --yes se configura todo por defecto, sino seguir la imagen

import { temprano, tarde, noche } from "./saludos.js";

temprano();
tarde();
noche();

//modulos nativos de node js

//son los que vienen por defecto con node js. y ya contienen un conjunto de funciones q nos permite
//resolver alguna tarea en particular

//algunos de los mas conocidos
//fs: trabajar con archivos(txt, json)
//http: lo usamos para crear servidor
//path: rutas de archivos
//crypto: lo usamos para encriptar datos
//timers: para trabajar con tareas asincronicas
//console: para mostrar mensajes en consola

//C) Modulos de terceros

//bcrypt para encriptar contrase;as
//express: minimalista
//mongoose

//vamos a instalar un modulo de terceros:
//npm install express
//npm install mongoose (en vez de poner install podemos poner i)

//una dependencia es un paquete o modulo externo que mi proyecto necesita para funcionar correctamente

//paquete: conjunto de modulos que resuelven una tarea en particular

//dependencias de desarrollo: solo me acomanian en la etapa de elaboracion del codigo

//nodemon(reinicia el servidor frente a cualq cambio del codigo)
//npm i nodemon -D

//  "scripts": {
//   "start": "node index.js",
//  "dev": "nodemon index.js"
//},

console.log("holis"); //como configuramos nodemon cada vez que guardamos se actualiza

// hay una forma de hacerlo sin nodemon, con algo de node -- revisar la clase grabada

//instalamos sas de forma global

//npm i sass -g

//si quiero desinstalar dependencias lo hacemos:

//npm uninstall express
//puedo instalar los dos juntos

//npm install express mongoose

// npm install mongoose@2.0.0 esto me instala version vieja

//npm install (lee el package.json y crea el node_modules de dependencias)


