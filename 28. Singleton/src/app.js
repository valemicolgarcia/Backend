import { Connection } from "mongoose";
import { ConnectionDB } from "./connectionDB";

const firstInstance = ConnectionDB.getInstance();
const secondInstance = ConnectionDB.getInstance();
const thirdInstance = ConnectionDB.getInstance();

//vemos que solo te deja crear una sola instancia
