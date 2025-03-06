//npm i dotenv

import dotenv from "dotenv";
import program from "..utils/commander.js";

const { mode } = program.opts();
//me guardo si es desarrollo o produccion

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
})

const configObject = {
    puerto: process.env.PUERTO, //LE pongo ek nomrbe de la variable que le puse en env.
    mongo_url: process.env.MONGO_URL
}

export default configObject;
