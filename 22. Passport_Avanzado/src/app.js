//passport avanzado

import express from "express";
const app = express();
const PUERTO = 8080;

import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import jwt from "jsonwebtoken";
import { authorization, passportCall } from "./utils/util.js";

//middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para passport
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();



//ruta
app.post("/login", (req, res) => {
    let { usuario, pass } = req.body;
    if (usuario === "tinki" && pass === "winki") {
        //si las credenciales coiniciden con las esperadas generamos el token
        // let token = jwt.sign({ usuario, pass }, "coderhouse", { expiresIn: "24h" });

        //lo enviamos - VERSION1 LOCAL STORAGE
        //res.send({ mensaje: "Login exitoso!", token });

        //////////////////////
        //version para roles:
        let token = jwt.sign({ usuario, pass, role: "admin" }, "coderhouse", { expiresIn: "24h" });
        ///////////////////////

        //enviamos desde la cookie - VERSION2
        //esta vez en lugar de enviar el token directamente, se colocara en una cookie para almacenarse del lado del cliente
        res.cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ mensaje: "Login exitoso" });
        //la expresion 60*60*1000 representa una hora en milisegundos
        //la opcioon httpOnly es una medida de seguridad que indica que la cookie solo puede ser accedida mediante el protocolo http




    } else {
        res.send({ mensaje: "Login fallido" });
    }


})

//vamos a generar una ruta privada que requiere que estemos identificados
//session en false aunque no lo tengas instalado
/*
app.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
})
    */
//utilizando el passportCall

app.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    res.send(req.user);
})

//ruta login
app.listen(PUERTO, () => console.log(`Escuchando en el 8080`));
