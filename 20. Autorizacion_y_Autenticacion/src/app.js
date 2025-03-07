
//autorizacion y autenticacion
//continuamos el proyecto de sesiones y cookies 2



import express from "express";
const app = express();
const PUERTO = 3000;
import session from "express-session";
import { engine } from "express-handlebars";
import MongoStore from "connect-mongo";
import "./database.js";
import viewsRouter from "./router/views.router.js";
import sessionsRouter from "./router/sessions.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

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


    //3. utilizando mongoStorage
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100
    })

}));

//cambios de passport: una vez que sumas la estrategia local
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
/////////////

//rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);



app.listen(PUERTO, () => console.log('escuchando en el 3000'));