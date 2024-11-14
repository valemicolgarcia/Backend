//plantillas literales
//funciones
//scope
//clausulas - closures
//clases y POO



//DATOS EXTRA
//no se usa mas VAR!!!!!!!!!! conceptualmente esta re mal

//PLANTILLAS LITERALES
//forma de concatenar strings o cadena de caracteres mas sencilla y legible

let mascota = "Fatiga";
let mascotaEdad = 5;
console.log("Nuestro perro " + mascota + " tiene " + mascotaEdad + " anios");

//ahora

console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad} anios`);

//funciones

//1. FUNCIONES DECLARATIVAS

//declaramos la funcion
function saludar() {
    //cuerpo de la funcion
    console.log("Hola curso de Backend");
}

//invocamos la funcion
saludar();


//DATO
//se puede invocar antes de declarar en js gracias al "hoisting" (elevacion), que es el proceso interno que 
//realiza el lenguaje durante la lectura del codigo, en donde eleva las declaracion (SOLO EN FUNCIONES DECLARATIVAS)

//2. FUNCIONES EXPRESIVAS

let nuevoSaludo = function (curso) {
    console.log("El mejor curso del mundo es " + curso)
}

nuevoSaludo("backend")

//DATO
//las funciones anonimas siempre estuvieron en JS, incluso en sus primeras versiones
//Lo que si llega son las FUNCIONES FLECHA

//3. FUNCIONES FLECHA

let ultimoSaludo = () => {
    console.log("Fuerza german");
}

ultimoSaludo();
let curso = "Backend"
//se puede de forma mas resumida
let chau = curso => console.log("Chauuuu"); //le pongo llaves si quiero escrbir mas de una linea

chau("backendinio");

//4. SCOPE: alcance que tienen las variables dentro de nuestro programa. 
//En JS tenemos dos tipos de Scope
//GLOBAL: las variables declaradas en este scope pueden ser accedidas desde cualq parte del programa
//LOCAL: solo accedidas desde el bloque en el que fueron declaradas(Se declaran dentro de un bloque de llaves)

let global = 2024; //VARIABLE GLOBAL

function saludito() {

    console.log("Hola, estamos en el año " + global);
    let curso = "BackendI"; //VARIABLE LOCAL, no la puedo usar afuera
    console.log("Curso de" + curso);

}

saludito();
console.log(curso);

//CLOSURES

//Los cierres o clausulas en JS es un concepto que se refiere a la capacidad 
//de una funcion anidad de acceder a las variables de su funcion padre, incluso cuando 
//la funcion padre ya termino la ejecucion

function padre() {
    let deudaHector = 3000000;
    function anidada() {
        console.log(deudaHector);
    }
    return anidada;
}

let clausula = padre();
clausula();


//CLASES
//Las clases son moldes que nos permiten crear objetos con caracteristicas similares
//primer letra de las clases en mayuscula
class Persona {
    //constructor (que se ejecuta cuando creamos un objeto de esta clase)
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        //la palabra reservada this hace referencia al objeto que se esta creando
        //cada vez que creamos un objeto a partir de una clase, decimos que estamos creando una instancia de esa clase
    }
}

//ahora vamos a crear una instancia de la clase persona

let coky = new Persona("Vale", 20);

console.log(coky);

