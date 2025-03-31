//patron disenio singleton
//lo usamos para tener una instancia global en toda la aplicacion
//este patron verifica si ya existe una instancia de esta clase, en caso de que si exista retorna esa instancia
//caso contrario la crea

import mongoose from "mongoose";

class BaseDatos {
  static #instancia; // le pertenece a la clase en si, con el # lo hago privado
  constructor() {
    mongoose.connect(
      "mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  }
  static getInstancia() {
    if (this.#instancia) {
      return this.#instancia;
    }
    this.#instancia = new BaseDatos();
    console.log("conectados desde database, DB FUNCIONANDO");
    return this.#instancia;
  }
}

export default BaseDatos;
