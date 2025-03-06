//COMMANDER: para procesamiento de argumentos
//npm i commander
import { Command } from "commander";

const program = new Command();

//1. comando || 2. descripcion || 3. valor por default

program
    .option("-p <port>", "puerto donde se inicia el servidor", 8080) //comando
    .option("--mode <mode> ", "modo de trabajo", "desarrollo")
program.parse(); //parse se usa para cerrar la config de comandos

console.log("opciones", program.opts());

//node src/utils/commander.js -p 5000 --mode firulais

export default program;

