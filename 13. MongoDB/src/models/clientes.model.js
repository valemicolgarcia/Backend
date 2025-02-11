//1) Importamos mongoose
import mongoose from "mongoose";

//dejar cte con el nombre de la colleccion
const clientesCollection = "clientes";

//definimos el schema: este es un objeto que nos permite definir la forma de los documentos
//configuramos el nombre de los campos y los tipos de datos que almacenaran

const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
})

//definimos el modelo
const ClientesModel = mongoose.model(clientesCollection, clienteSchema);

export default ClientesModel;