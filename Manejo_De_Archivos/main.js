//CLASE 5 - MANEJO DE ARCHIVOS

//1. FILE SYSTEM
//2. MANEJO DE ARCHIVOS de forma asincronica
//3. MANEJO DE ARCHIVOS con callback
//4. MANEJO DE ARCHIVOS con promesas
//4. DATOS COMPLEJOS 
//5. Desafio no entregable

//File system: es un manejador de archivos que ya viene incorporado con node.js
//me permite realizar operaiocnes de crear, leer, actualizar y borrar archivos (CRUD)

//COMO USARLO?

//hoy usamos Common JS

//1. Primer paso: tenemos que importar el modulo

const fs = require("fs");
console.log(fs);
console.log(typeof fs);

//2. TRABAJAMOS DE FORMA SINCRONICA------------------------------

const ruta = "./ejemploa.txt";

//A --> crear un archivo
fs.writeFileSync(ruta, "Hola soy vale, ejemplo sincronico");

//B --> Leer un archivo:
//primero verificamos que el archivo existe antes de intentar leerlo

if (fs.existsSync("./holachau.txt")) {
    let contenido2 = fs.readFileSync("./holachau.txt", 'UTF-8');
    console.log(contenido2);
} else {
    console.log("El archivo no existe")
}


let contenido = fs.readFileSync(ruta, 'UTF-8');
//primer parametro path, segundo es la codificacion
console.log(contenido);

console.log(fs.existsSync("./holachau.txt")); //False

//C --> actualizar contenidos: 

//Para actualizar puedo ir pisando la data del archivo
fs.writeFileSync(ruta, "Hola, estamos actualizando la info");

//agregar contenido al final
fs.appendFileSync(ruta, "texto agregado al final");
//Appnedfile me permite agregar mas contenido al final, si no encuentra el archivo en esa ruta lo va a crear

//D --> elimino un archivo
fs.unlinkSync(ruta);

//3. TRABAJAMOS CON CALLBACK --------------------------------

const ruta2 = "./ejemploB.txt";
//creamos el archivo
fs.writeFile(ruta2, "Nuevo archivo, ahora con callback", (error) => {
    if (error) return console.log("No se pudo crear el archivo");
    //Leemos el archivo
    fs.readFile(ruta2, "utf-8", (error, contenido) => {
        if (error) return console.log("No se puede leer, algo esta mal");
        console.log(contenido);
        //queremos agregar mas info:
        fs.appendFile(ruta2, " y le sumo mas contenido", (error) => {
            if (error) return console.log("No podemos agregar mas contenido");

            //eliminar archivo
            fs.unlink(ruta2, (error) => {
                if (error) return console.log("No podemos eliminar el archivo :(");
            })



        })
    })
})

//en la funcion flecha tenemos que gestionar el error
//si no ponemos los return se rompe todo el codigo porque sigue intentando con el resto de las sentencia y tira error todo
//callback es poco escalable, porque tengo muchos anidados, es muy probable que te equivoques

//4. TRABAJAMOS CON PROMESAS

//para trbajar con promesas tenemos que usar la propiedad promises del modulo fs

const ruta3 = "./ejemplo3.txt";
const operacionesAsincronicas = async () => {
    //crear un archivo:
    await fs.promises.writeFile(ruta3, "Nuevo archivo! ahora con promesas");

    //Leer un archivo
    let respuesta = await fs.promises.readFile(ruta3, "utf-8");
    console.log(respuesta);

    //si quiero agregar contenido adicional:
    await fs.promises.appendFile(ruta3, ", agregamos este contenido adicional");

    //releer:
    respuesta = await fs.promises.readFile(ruta3, "utf-8");
    console.log(respuesta);

    //eliminamos el archivo:
    await fs.promises.unlink(ruta3);

}

//invocar la funcion
operacionesAsincronicas();

//MANEJO DE DATOS COMPLEJOS

//Array de personas
const arrayPersonas = [
    { nombre: "vale", apellido: "garcia", edad: 20 },
    { nombre: "bauti", apellido: "garcia", edad: 20 },
    { nombre: "joaco", apellido: "gavernet", edad: 21 },
    { nombre: "tibu", apellido: "barrios", edad: 21 },
    { nombre: "dolo", apellido: "garro", edad: 24 },
]

const archivoGente = "./archivoGente.json";

//como guardamos esta informacion?

const guardarDatos = async () => {
    await fs.promises.writeFile(archivoGente, JSON.stringify(arrayPersonas, null, 2));
}
//con null 2 agrego el tabulado

guardarDatos();

//como recuperamos?

const leerDatos = async () => {
    let respuesta = await fs.promises.readFile(archivoGente, "utf-8");
    const arrayNuevo = JSON.parse(respuesta); //asi creamos objeto real
    console.log(arrayNuevo);
    //console.log(respuesta);
}

leerDatos();



