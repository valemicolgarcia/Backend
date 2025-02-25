//clase 6 - ruteo avanzado y politicas

//temas de hoy:
//1. expresiones regulares
//2. restringiendo parametros
//3. validando parametros
//4. custom router
//5. custom response

////////////////////////////////////////////////

//1. expresiones regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto
//ejemplo: validar si el texto ingresado por el usuario corresponde a un email,
//que tenga el formato "nombre@dominio.com"

//ejemplo con correo electronico

let correoIngresado = "lionel@messi.com";
let correoFalso = "tinkiwinki";
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(patronCorreo.test(correoIngresado));
console.log(patronCorreo.test(correoFalso));

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;
let telfonoIngresado = "(223)669-3878";
let telefonoFalso = "1234";

console.log(patronTelefono.test(telfonoIngresado));
console.log(patronTelefono.test(telefonoFalso));


//levantamos un servidor:
import express from "express";
const app = express();
import clientesRouter from "./routes/clientes.router.js";
const PUERTO = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/clientes", clientesRouter);
app.use("/users", userRouter.getRouter());

//CUSTOM ROUTER
import UserRouter from "./routes/user.router.js";
const userRouter = new UserRouter();

/////////////////////////////
app.get("*", (req, res) => {
    res.status(404).send("Recurso no encontrado");
})
////////////////////////////


//rutas
app.listen(PUERTO, () => console.log('Trabajando en el 8080'));
