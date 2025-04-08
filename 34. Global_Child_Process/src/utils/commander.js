//procesamiento de argumentos con commander
//npm i commander

import { Command } from "commander";
const program = new Command();

//1- Comando //2- La descripcion //3- Valor por default

program
  .option("-p <port>", "Puerto en el que se inicia el servidor", 8080)
  .option("--mode <mode>", "modo de trabajo", "desarrollo");
program.parse();

console.log("opciones", program.opts());

//node src/utils/commander.js -p 5000 --mode firulais

export default program;
