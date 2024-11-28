//CALCULADORA DE EDAD

//actividad
//npm i moment@1.6.0 

//importamos la dependencia
import moment from "moment";

//variables para la f3echa actual
let fechaActual = moment();

//variable para la fecha de nacimiento
let fechaNacimiento = moment("2004-02-13");


if (fechaNacimiento.isValid()) {
    let diasPasados = fechaActual.diff(fechaNacimiento, "days");
    //Mostramos el resultado: 
    console.log(`Pasaron ${diasPasados} dias desde que naci`);
} else {
    console.log("Todo es invalido!");
}