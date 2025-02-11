// CLASE 2 - Nuevas funcionalidades de ECMASCRIPT

// Desestructuracion: 

const pelicula = {
    titulo: "El padrino",
    director: "Francis",
    genero: "Drama",
    lanzamiento: 1972
}

let titulo = pelicula.titulo;
console.log(titulo)

//ahora:

//desestructuracion con objeto
let { director, genero, lanzamiento } = pelicula; //si quiero traer desde objeto usamos {}


console.log(director);
console.log(genero);
console.log(lanzamiento);

director = "Clint"; //le asigno un nuevo valor, pero no modifico el objeto orinal, sino que modifico la variable de la desestructuracion

//desestructuracion con array

const numeros = [1, 2, 3, 4, 5];

//Antes:

let uno = numeros[0];
let dos = numeros[1];

console.log(uno);
console.log(dos);

//ahora: con la llegada de ES6

let [indCero, indUno, indDos, indTres] = numeros; //por el orden en que declaramos las variables es que se queda con los nros del array

console.log(indCero);
console.log(indUno);
console.log(indDos);


// valores por defecto: JS nos permite asignar valores por default a los parameteos de una funcion

function saludar(nombre = "Invitado") {
    console.log(`Hola ${nombre}`);
}

saludar("dolo"); //hola dolo
saludar(); //hola invitado

saludar("Joaco");

//Trabajo por modulos: 

// si yo quiero importar el array de productos marolio der datos.js hago:

import productosMarolio from "./datos.js";
console.log(productosMarolio);

// CLASES

class Persona {

    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    //comportamiento
    saludar() {
        console.log(`Hola, soy ${this.nombre} de ${this.apellido} !!!!`);
    }
}

const personita = new Persona("Doble", "Luismi", 50);
const pepe = new Persona("Pepe", "Argento", 50);
const vale = new Persona("vale", "garcia", 20);
console.log(personita);

//como hago para que un objeto pueda invocar a un metodo

personita.saludar();
vale.saludar();

class Estudiante extends Persona {
    #promedio; //hago promedio privada
    constructor(nombre, apellido, edad, carrera, promedio) {
        super(nombre, apellido, edad);
        this.carrera = carrera;
        this.#promedio = promedio;
    }
    //puedo acceder a las variables privadas con un get
    get getPromedio() {
        return this.#promedio;
    }
}

const estudiante = new Estudiante("Valeria", "Garcia", 20, "Ingenieria en computacion", 10);
console.log(estudiante);

estudiante.saludar();

//puedo hacer que una propiedad del objeto sea privada?

console.log(estudiante.promedio);

//yo puedo crear variables privadas de las clases, esto permite que algunas variables no sean accesibles
//desde el entorno y solo sea usada de forma interna
// si quiero que la variable sea privada, tengo q agregarle el # antes del nombre de la variable

//asi accedo a las variables privadas
//abajo del constructor tengo que armar los metodos get
console.log(estudiante.getPromedio);

//variables y metodos estaticos

//son variables y metodos asociados a la clase en si. para utilizarlos no requiere que se genere una instancia de la clase

class Contador {
    static cantidad = 0;

    constructor() {
        Contador.cantidad++; //no puedo poner this porque no es instancia
    }
    static obtenerCantidad() {
        return Contador.cantidad;
    }
}

const contador1 = new Contador(); //la variable cant se incrementa
const contador2 = new Contador();
const contador3 = new Contador();

console.log(Contador.obtenerCantidad()); //se obtiene un 3 porque llamo tres veces al constructor

//ES7: esta version fue lanzada en el anio 2016 trajo dos grandes cambios

// - Operador de exponenciacion **
// - Includes: (permite saber si un elem esta adentro de un array o string)

//antes

let base = 4;
let exponente = 3;

let resultado = Math.pow(base, exponente);
console.log(resultado);

//ahora:

let resultado2 = base ** exponente;
console.log(resultado2);

//includes


const losSimpsons = ["Homero", "Marge", "Bart", "Lisa", "Maggie"]

//antes:
console.log(losSimpsons.indexOf("Maggie") > -1); //true

//ahora con es7

console.log(losSimpsons.includes("Maggie"));

let frase = "Hola, soy homero simpson";

//verifico si homero esta en la frase

console.log(frase.includes("homero"));

//cambios en el año 2017

// async y await lo vemos la proxima
//metodos estaticos

const empleado = {
    nombre: "Pepe",
    apellido: "Argento",
    edad: 45,
    puesto: "Vendedor de zapatos"
}

//Object.values: devuelve un array con los valores de las propiedades de un objeto

const resultadoEmpleadoValues = Object.values(empleado);
console.log(resultadoEmpleadoValues);

//Object.entries: devuelve un array de arrays donde cada sub array contiene la clave y valor

const resultadoEmpleadoEntries = Object.entries(empleado);
console.log(resultadoEmpleadoEntries);

//Object.keys : devuelve las claves de un objeto en un array

const resultadoEmpleadoKeys = Object.keys(empleado);
console.log(resultadoEmpleadoKeys);