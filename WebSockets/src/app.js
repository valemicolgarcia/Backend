/*  CLASE 10 - WEBSOCKETS*/

//1. Que es websocket
//2. Socket.I

//websocket es un protocolo de comunicacion bidireccional en tiempo real
// a diferencia de http, donde el cliente envia solicitud y el servidor responde, los websockets 
//permite una comunicacion continua y en tiempo real entre el cliente y el servidor

//la comunicacion se realiza entre dos endpoints, y cada endpoint se conoce como socket

//como funciona?

//paso 1: el cliente tiene que enviar una peticion HTTP al servidor y esto se conoce como apreton de manos (handshake)

//paso 2: el servidor recibe la peticion, responde el saludo. y a esto se le conoce como abrir la conexion

//paso 3: a partir de este momento, el canal queda abierto de manera bidireccional


//levantamos un servidor
import express from "express";
const app = express();
const PUERTO = 8080;
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js"


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//configuramos express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//rutas
app.use("/", viewsRouter);

//importamos socket.io
//1. importamos el metodo server de la libreria socket.io
import { Server } from "socket.io";


//listen
//2. me voy a guardar una referencia de mi servidor de express
const httpServer = app.listen(PUERTO, () => console.log(`Escuchando en el puerto: ${PUERTO}`));

//3. generamos una instancia de Socket.io desde el lado del backend
const io = new Server(httpServer);

//creamos un array de usuarios:
const usuarios = [
    { id: 1, nombre: "vale", apellido: "garcia" },
    { id: 1, nombre: "tito", apellido: "garcia" },
    { id: 1, nombre: "tino", apellido: "garcia" },
    { id: 1, nombre: "vicky", apellido: "garcia" }

]

io.on("connection", (socket) => {
    console.log("Un cliente se conecto conmigo");

    //como hago para interpreto el mensaje que me manda el front?
    socket.on("mensaje", (data) => {
        console.log(data);
    });

    //ahora el servidor le va a enviar un mensaje al cliente
    socket.emit("saludito", "Hola front, como estas?");

    //enviamos un array de ususaios al front
    socket.emit("usuarios", usuarios);

})





