import { Router } from "express";
const router = Router();

//ejemplo 1: espero un nombre de un cliente
router.get("/nombre/:cliente([a-z]+)", async (req, res) => {
    //aca en esta situacion estoy esperando un parametro por url, el nombre especificamente de un cliente.
    //que pasa si el usuario ingresa numeros o caracteres especiales en ligar de palabras comunes y corrientes?

    if (req.params.cliente) {
        res.send("Cliente valido: " + req.params.cliente);
    } else {
        res.send("Cliente invalido");
    }

})

//otra forma
router.get("email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = req.params.email;
    if (patronCorreo.test(email)) {
        res.send("email valido");
    } else {
        res.send("email invalido");
    }
})


//3 validando parametros
//supongamos que al crecer mi aplicacion, voy a tener que generar muchas rutas que reciben el mismo parametro. por ejemplo

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //voy a obtener un recurso a partir del parametro cliente
    req.send("Obteniendo recurso para el cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //voy a enviar un recurso a partir del parametro cliente
    req.send("Enviando recurso para el cliente: " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //voy a actualizar un recurso a partir del parametro cliente
    req.send("Actualizando recurso para el cliente: " + req.params.cliente);
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //voy a actualizar un recurso a partir del parametro cliente
    req.send("Eliminando recurso para el cliente: " + req.params.cliente);
})

//nos encontramos que en los cuatro metodos hay lineas de codigo que van a ser iguales y se van a repetir
//a. obtener el parametro cliente
//b. buscar el parametro en la base de datos
//c. una vez validado, continuar con la operacion que corresponda

//esto lo simplificamos creando un middleware llamado "router.param"

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"];
    if (clientes.includes(cliente)) {
        req.cliente = cliente;
        next();
    } else {
        res.status(404).send("Cliente no encontrado");
    }
})

export default router;
