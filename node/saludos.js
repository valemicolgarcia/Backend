const temprano = () => {
    console.log("Buenos Dias");
}

const tarde = () => {
    console.log("Buenas Tardes");
}

const noche = () => {
    console.log("Buenas Noches");
}

//Existen dos formas de trabajar con modulos en NodeJS
//Common JS y la ES Modules

//Importamos con common
//module.exports = {
//  temprano,
// tarde,
//noche
//}

export { temprano, tarde, noche };
