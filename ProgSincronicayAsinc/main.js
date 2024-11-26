// CLASE 3

//TEMAS DE HOY
//1. Enfoque sincronico y asincronico
//2. Callback
//3. Promesas
//4. Async Await

////////////////////////////

//1. Programacion sincronica: es un enfoque o estilo de programacion en el que las tareas se ejecutan secuencialmente 
// en el orden que se escriben

//cada tarea se ejecuta en orden y bloque la ejecucion de la siguiente tarea hasta que se complete

console.log("Primero");
console.log("Segundo");
console.log("Tercero");

function a() {
    console.log("1");
    b();
}

function b() {
    console.log("2");
    c();
}

function c() {
    console.log("3");
}

a();

//PROGRAMACION ASINCRONICA: es un estilo de programacion en donde las tareas se
//ejecutan en segundo plano
// no bloquean la ejecucion de tareas

//Las tareas son independientes y no bloquean el flujo de ejecucion
//Entonces cuando estoy haciendo una peticion a una API no voy a bloquear la ejecicion de mi codigo hasta
//que la peticion se complete. Muy util cuando trabajamos con base de datos y servidores

setTimeout(() => {
    console.log("Primer tarea");
}, 4000) //despues de 4 segundos termina la tarea

console.log("Segunda tarea") //aparece antes esta

// 2. callback

// una funcion callback es una funcion que pasamos como argumento a otra funcion
//hablamos de la funcion que se envia 

//no confundir : la funcion que recibe otra funcion como parametro se llama: FOS (Funcion de orden superior)
//FOS: es la funcion que recibe como parametro otra funcion

function suma(numeroA, numeroB, callback) {
    let resultado = numeroA + numeroB;
    callback(resultado);
}

function mostrarResultado(resultado) {
    console.log("El resultado de su operacion es " + resultado);
}

//invocamos a suma
suma(10, 3, mostrarResultado);
//no se ponen los parentesis en la funcion porque sino se ejecuta directamente

//practicamos con MAP
// El método map() es una función de orden superior en JavaScript, 
//disponible para los arrays. Sirve para crear un nuevo arreglo 
//aplicando una función a cada uno de los elementos del arreglo original. 


let numeros = [1, 2, 3, 4, 5];

let numerosDuplicados = numeros.map((numerito) => numerito * 2)

console.log(numerosDuplicados);

//metodo map: lo hacemos

function mapear(array, callback) {
    let arrayNuevo = [];
    for (let i = 0; i < array.length; i++) {
        arrayNuevo.push(callback(array[i]));
    }
    //El método .push()  JavaScript se utiliza para 
    //agregar uno o más elementos al final de un arreglo. 

    return arrayNuevo;
}

function duplicar(numerito) {
    return numerito * 2;
}

console.log("Nueva funcion map made in casa" + mapear(numeros, duplicar));

//PROMESAS

//Las promesas son objetos que representan un hecho eventual a futuro.
//las vamos a utilizar para operaciones asincronicas que pueden resultar exitosas o fallidas

// las promesas tiene tres estados
//Pendiente (pending): estado incial de la promesa (ocurre cuando la operacion no se completo ni se rechazo todavia)
//Exitoso (fulfilled): la operacion se completa de forma exitosa y se resuelve la promesa
//Fallida (rejected): la operacion sincronica fallo y se rechazo la promesa.

//creacion de una promesa: 

const promesa = new Promise((resolve, reject) => {
    //codigo que queremos ejecutar
    //resolve y reject son funciones que nos provee la promesa para indicar el estado de la misma
    //caso exitoso
    resolve("Exito en la promesa!");

    //caso fallido
    //reject("Error en la promesa");
})

console.log(promesa);

//METODOS THEN Y CATCH: estos metodos me permiten manejar el resultado de la promesa.
// se usan concatenados

//THEN: lo usamos cuando la promesa se resuelve exitosamente
//CATCH: lo usamos cuando se rechaza la promesa
//FINALLY: se ejecuta siempre (se resuelva o se rechace la promesa)

promesa
    .then(() => console.log("Exito infinitoooooooo"))
    .catch(() => console.log("sufrimiento mortal"))
    .finally(() => console.log("se ejecuta siempre re aburrido"));

const productos = [
    { id: 1, nombre: "Mesa", precio: 5000 },
    { id: 2, nombre: "Silla", precio: 15000 },
    { id: 3, nombre: "Vino", precio: 300 }
]


// Voy a crear una promesa que me devuelva un producto por su ID
function buscarProductoPorID(id) {
    return new Promise((resolve, reject) => { // Aquí está la corrección
        setTimeout(() => {
            const producto = productos.find(producto => producto.id === id);
            if (producto) {
                resolve(producto); // Producto encontrado
            } else {
                reject("No existe el producto!!!"); // Producto no encontrado
            }
        }, 2000);
    });
}


buscarProductoPorID(2)
    .then(producto => console.log(producto))
    .catch(error => console.error(error))
    .finally();


//async await

//con la palabra await genero una pausa en la ejecucion del codigo hasta que la promesa
//se resuelva o se rechace

//ejemplo:

async function buscadoraDeProductoPorId(id) { //hago la funcion asincronica 
    const producto = await buscarProductoPorID(id);
    console.log(producto);
}

buscadoraDeProductoPorId(2);

//generalmente cuando trabajamos con asyncawait lo usamos con un bloque try catch:

async function buscadoraDeProductoPorId2(id) {
    try { //intento, si tengo algun error lo va a capturar el catch
        const producto = await buscarProductoPorID(id);
        console.log(producto);

    } catch (error) {
        console.log(error);

    }
}

buscadoraDeProductoPorId2(3);

//alert("Funciona?");

//CONSULTAS A APIS

fetch("https://jsonplaceholder.typicode.com//users")
    .then(respuesta => respuesta.json())
    .then(usuarios => console.log(usuarios))
    .catch(error => console.log("Tenemos un error: ", error));

//Ejemplo con async await:

async function obtenerUsuarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com//users");
    const usuarios = await respuesta.json();
    console.log(usuarios);
}

obtenerUsuarios();