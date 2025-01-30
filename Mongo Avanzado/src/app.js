/** MONGO AVANZADO 1 */

//1) Indexacion
//2) Manejo de populations en mongo DB
//3) PRE

import mongoose from "mongoose";
import UsuarioModel from "./models/usuario.model.js";

//
//esta conecta con mognoose
/*
const main = async () => {
    await mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0");
    //vcerifico si puedo ver todos mis usuarios

    const respuesta = await UsuarioModel.find({ "edad": { $lt: 19 } }).explain("executionStats");
    console.log(respuesta);

}

*/
//main();

// usamos el metodos explain() para ver las estadisticas de la consulta
//el parametro que la pasamos es "executionStats", que me permite obtener el detalle de los tiempos de rta

//resultados de la consulta
//nReturned: 25000
//executionTimeMillis: 8 milisegundos

//buscamos por nombre: carlos
//nReturned: 111
//executionTimeMillis: 11 milisegundos

//pero aplicando el index a nombre, el tiempo fue de 1milisegundo

//si busco a menores de 19 anios, cuanto me retornaria?
//nReturned: 384
//executionTimeMillis: 8 milisegundos

//y si aplico el indice?
//nReturned: 384,
//executionTimeMillis: 2,

//conclusion: hace que la rta llegue mucho mas rapido

//manejo de poluations en mongoDB
//populate es una funcion de mongoose que nos permite relacionar documentos de dif colecciones

//ejercicio con cursos y alumnos aplicando populations

//------------------------------------------------------------
//ejercicio con cursos y alumnos aplicando populations

import AlumnoModel from "./models/alumno.model.js";
import CursoModel from "./models/curso.model.js";

const main = async () => {
    await mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0");

    /*
    const respuesta = await CursoModel.find();
    console.log(respuesta);
    */

    //buscamos un alumno
    const juanPerez = await AlumnoModel.findById("679c008ea7b4d56330b35afc");

    //buscamos un curso
    const cursoBackend = await CursoModel.findById("679bfd72a7b4d56330b35af3");

    //verificamos por consola
    console.log(juanPerez);
    console.log(cursoBackend);

    //ahora voy a ingresar el curso al alumno
    juanPerez.cursos.push(cursoBackend); //solo ocurre en la memoria de la app, no ocurre en la persistencia de la base de datps

    //actualizo el documento de mongodb para que los camnios no solo se vean en la app
    await AlumnoModel.findByIdAndUpdate(juanPerez._id, juanPerez);

    //ahora.. si quier ver al alumno con sus cursos,yo puedo hacer esto

    const alumnoConCursos = await AlumnoModel.findById("679c008ea7b4d56330b35afc");//.populate("cursos");

    console.log(JSON.stringify(alumnoConCursos, null, 2));



}

main();