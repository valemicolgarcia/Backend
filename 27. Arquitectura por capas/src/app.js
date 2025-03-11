import express from "express";
const app = express();
const PUERTO = 8080;
import "./database.js";
import jugueteRouter from "./routes/juguetes.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hola");
});

//rutas

app.listen(PUERTO, () => console.log("todo funciona"));
