// CLASE 7 EXPRESS AVANZADO

//Temas de hoy:

//1. CODIGOS DE ESTADO
//2. Que es una api
//3. API Rest
//4. Metodos de la peticion
//5. Postman
//6. Practicamos GET - POST - PUT - DELETE

//1. CODIGOS DE ESTADO: Cada vez que hacemos una peticion al servidor, este no solamente nos responde con informacion, tambien nos puede informar
//el estado de la peticion por medio de estos numeritos de 3 cifras

//Los codigos se dividen en 5 clases:

//1xx: Son respuestas informativas, es decir que me indica que el servidor recibio la solicitud y se continua con el proceso
//2xx: son respuestas exitosas
//3xx: redirecciones, el cliente necesita realizar algunas acciones adicionales para completar la solicitud
//4xx: errores del cliente, indican que hubo un error por parte del cleinte al realizar la peticion (ejemplo 404 no encontrado)
//5xx: errores del servidor, indican que hubo un error por parte del servidor al procesar la solicitud.

//Los mas usados son:
//200: Ok
//400: bad request
//401: Unauthorized
//403: Forbidden. (prohibido): el servidor no puede responder a la solicitud del cleinte porque sus credenciales no tiene autorizacion para ese contenido
//404: Not found: recurso no encontrado.
//500: Internal server error


//API: es el acronimo application programming interface (interfaz de programacion de aplicaciones)
//es un conjunto de reglas que permiten que dos equipos puedan integrarse y trabajar juntos

//REST: XML, JSON (especifico como se va a mandar la estructura de la informacion)

//CRUD: create - read - update - delete
//ADM: administración o tareas administrativas relacionadas con el mantenimiento y gestión del sistema, los usuarios, y los recursos.

//LEVANTAMOS NUESTRO SERVIDOR:
import express from "express";
const app = express();
const PUERTO = 8081;

//middleware
app.use(express.json());
//aca le digo al servidor que voy a trabajar con json
app.use(express.urlencoded({ extended: true }));
//aca nos permite gestionar multiples datos desde el cliente

//Rutas:
app.get("/", (req, res) => {
    res.send("Hola amigo");
})



const clientes = [
    { id: "1", nombre: "Lionel", apellido: "Messi" },
    { id: "2", nombre: "Anto", apellido: "Messi" },
    { id: "3", nombre: "Cristiano", apellido: "Ronaldo" }
]

//1=creamos una ruta que nos triaga a todos nuestros clientes
app.get("/clientes", (req, res) => {
    res.send(clientes);
})

//2=creamis yba ruta qye 
//toda la info viene en el request
//
app.get("/clientes/:id", (req, res) => {
    let id = req.params.id;
    const clienteBuscado = clientes.find(cliente => cliente.id === id);

    if (clienteBuscado) {
        return res.send(clienteBuscado);
    } else {
        return res.send("No se encuentra el cliente con ese ID");
    }
})

//3. Creamos una ruta post para almacenar un nuevo cliente

app.post("/clientes", (req, res) => {
    const nuevoCliente = req.body;

    clientes.push(nuevoCliente);
    console.log(clientes);
    res.send("Cliente creado");
});

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})


//USO DE POSTMAN