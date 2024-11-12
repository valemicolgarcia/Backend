//TIPADO DINAMICO
//le puedo cambiar el tipo de dato en ejecucion
let nombre = "Francisco" //declaro la variable
nombre = 2
nombre = true

//DEBILMENTE TIPADO
//permite operaciones e/ distintos tipos sin requerir una conversion explicita
console.log('5' * '5'); //me da 25


//copia de variable --> se copia el valor solamente, no se copia la direccion de memoria
//copia de objeto --> se copia la direccion de memoria, los dos objetos apuntan a la misma direccion
//para copiar el valor de un objeto tengo que poner {...usuario}

let usuario1 = { nombre: "", apellido: "" }
let usuario2 = { ...usuario1 }

let nombre1 = "Franciso";
let nombre2 = nombre1;

nombre2 = "Pepe";

console.log(nombre1);
console.log(nombre2);

// con structuredClone(se copia todo lo del objeto por valor)



