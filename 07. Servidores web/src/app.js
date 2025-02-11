//TEMAS DE HOY:
//puse npm init --yes y me creo package.json

//Que es un servidor
//protocolo http
//modulo nativo http
//express js
//objeto request
//presentamos el ej del after de maniana

//1. SERVIDOR
//como usuario de la web hago peticiones al servidor, y el servidor responde
//el cliente es el servidor

//servidor: software o hardware que almacena o administra recursos web, como imagenes, archivos
//sitios web, datos. Su funcon es responder a las peticiones de los clientes. es importante aclara 
//que un servidor puede responder a mnultiples peticiones. a esta relacion se la conoce como modelo: cliente - servidor

//el cliente hace un pedido = request
//servidor responde = response

//bajo que protocolo se comunican el cliente y el servidor? --> HTTP
//HTTP: protocolo de transferencia de hipertexto.
//Es un protocolo de comunicacion que definen las reglas para que se comuniquen los dispositivos

//instalamos nodemon: npm install nodemon -D

//CREAMOS SERVIDOR

//PRIMER PASO 1. Importar modulo de node HTTP
//hoy practicamos con common: 
const http = require("http");
//si quiero hacerlo con ES modules: import http from 'http';

//SEGUNDO PASO 2. Creamos servidor web. Para eso vamos a utilizar el metodo createSDerver del modulo HTTP
//Este metodo recibe como parametro una funcion callback que va a ser ejecutada cd vez que se realice una peticion
//al servidor. esta funcion callback recibe dos parametros: request y response

const server = http.createServer((request, response) => {
    console.log("Se realizo una peticion al servidor");
    response.end("Holaaaaaaa soy vale me quiero ir de vacaciones a algun ladooooo");
})// la funcion callback se ejecuta cada vez que se accede al servidor

//TERCER PASO 3. Ponemos a escuchar al serviodor en un puerto de la computadora.

const PUERTO = 8080;
//Puerto: ubicacion especial del so en la cual puedo acceder a una aplicacion o proceso especifico

//server.listen(PUERTO, () => {
//console.log("Escuchando en el puerto 8080");
//console.log(`Escuchando en el http://localhost:${PUERTO}`);
//});

//para hacer con NODEMON: "dev": "nodemon src/app.js"
//para hacer con NODEWATCH: "dev": "node --watch src/app.js"

//poner en la terminal: npm run dev

//--------------------------
//TRABAJAMOS CON EXPRESS
//1) instalacion: npm i express
//2) importamos el modulo: 
const express = require("express");
//para hacerlo con ES Modules: import express from 'express'

//3)creamos una aplicacion de express
const app = express();

//4)Creamos todas las rutas que necesitemos:

//ruta saludo
app.get("/saludo", (req, res) => {
    res.send("Hola, bienvenido al mundo de express");
});

app.get("/productos", (req, res) => {
    res.send("Seccion Productos");
})

app.get("/contactos", (req, res) => {
    res.send("Seccion contacto");
})

//Creamos nuestra ruta usuarios

const arrayUsuarios = [
    { id: 1, nombre: "vale", apellido: "garcia" },
    { id: 2, nombre: "bau", apellido: "garcia" },
    { id: 2, nombre: "tibu", apellido: "garcia" },
    { id: 2, nombre: "joaco", apellido: "garcia" },
    { id: 2, nombre: "mile", apellido: "garcia" },
    { id: 2, nombre: "mica", apellido: "garcia" }
]

app.get("/users", (req, res) => {
    res.send(arrayUsuarios);
})

//voy a retornar usuario por su id . ese id lo capturo por los parametros dinamicos de la url

//req.params: aca se guardan todos los parametros que se envian
///:id parametro dinamico
app.get("/users/:id", (req, res) => {
    //primero tengo que capturar ese ID que viene de la URL
    //let id = req.params.id;
    let { id } = req.params; //desestructuracion de lo que viene en params

    console.log(typeof id);

    //TODO LO QUE CAPTURAMOS DE PARAMETROS VIENE EN STRING
    // == compara valores
    // = compara estrictamente igual

    //segundo, voy a buscar en el array el usuario que coincida
    let usuarioBuscado = arrayUsuarios.find(personas => personas.id == id);

    //tercero, si lo encuentro lo retorno
    if (usuarioBuscado) {
        res.send(usuarioBuscado);
    } else {
        res.send("El usuario buscado no existe en ningun mundo");
    }
})


//enviar mas de un dato por la url
//Req.query: me permite hacer mutiples consultas que se pueden hacer a determinado endpoint.

//creamos una ruta para guardar nombre y apellido:
app.get("/clientes", (req, res) => {
    //let nombre = req.query.nombre;
    //let apellido = req.query.apellido;
    let { nombre, apellido } = req.query;
    res.send(`Bienvenido ${nombre} ${apellido}`);
})

//RUTA RAIZ:
app.get("/", (req, res) => {
    res.send("Bienvenidos a la app");
})

//Ponemos a escuchar a la app --> en general se deja esto al final
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})




