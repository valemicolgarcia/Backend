//NIVELACION DE REPASO
//instalamos: npm i express express-handlebars mongoose
import { engine } from 'express-handlebars';
import express from "express";
import todoRouter from "./routes/todo.router.js";
import "./database.js";

const app = express();

//middleware
app.use(express.json()); //trabajeremos con json para el intercmabio de datos
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//motor de plantillas
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//ruta principal
/*
app.get("/", (req, res) => {
    res.render("todos");
})
    */

app.use("/", todoRouter);

app.listen(8080, () => console.log("viva el verano"));

