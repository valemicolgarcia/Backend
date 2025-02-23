//passport avanzado

import express from "express";
const app = express();
const PUERTO = 8080;

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta
app.post("/login", (req, res) => {
    let { usuario, pass } = req.body;
    if (usuario === "tinki" && pass === "winki") {
        //si las credenciales coiniciden con las esperadas generamos el token
        let token = jwt.sign({ usuario, pass }, "coderhouseSecret", { expiresIn: "24h" });
        //lo enviamos
        res.send({ mensaje: "Login exitoso!", token });

    } else {
        res.send({ mensaje: "Login fallido" });
    }


})

//ruta login
app.listen(PUERTO, () => console.log(`Escuchando en el 8080`));