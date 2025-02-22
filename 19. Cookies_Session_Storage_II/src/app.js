
//cookies, session y storage, clase 2
//sesiones: vinculo entre el cliente y el servidor, se guarda del lado del servidor, pero el cliente almacena el session_id

//practicamos memory storage: almacenaje en el espacio volatil del servidor

//file storage
//1. instalamos npm i session-file-store
//2. importamos el modulo
//3. inicializamso concectandonos a la session

//despues de ver las ventajas de fileStorage, vamos a trabajar con mongodb
//1. instalamos npm i connect-mongo
//2. importamos MongoStore
//3. lo usamos a nivel middleware


import express from "express";
const app = express();
const PUERTO = 8080;
import session from "express-session";
import FileStore from "session-file-store";
//no olvidar de inicializarlo
//const fileStore = FileStore(session);

import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import "./database.js";
import viewsRouter from "./router/views.router.js";
import sessionsRouter from "./router/sessions.router.js";


//middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    //1. creamos una sesion con memory storage
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    /*
    //2. utilizando file storage
    store: new fileStore({
        path: "./src/sessions",
        ttl: 1000,
        retries: 1
    })
    
    //path: la ruta donde se guardan los archivos de sesion 
    //ttl: time to live: en segundos --> cuanto tiempo tarda en caerse la sesion
    //retries: cantidad de veces que el servidor tratara de leer el archivo
    */

    //3. utilizando mongoStorage
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100
    })

}));

//rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);



//login simple de usuario
/*
app.get("/login", (req, res) => {
    let usuario = req.query.usuario;
    req.session.usuario = usuario;
    res.send("guardamos el usuario por medio de una query");

})

//verificamos el usuario
app.get("/usuario", (req, res) => {
    if (req.session.usuario) {
        return res.send(`El usuario registrado es el siguiente: ${req.session.usuario}`);
    }
    res.send("no tenemos un usuario registrado");
})
*/


app.listen(PUERTO, () => console.log('escuchando en el 8080'));