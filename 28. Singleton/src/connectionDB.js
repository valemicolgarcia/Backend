const urlMongo =
  "mongodb+srv://valemicolgarcia:<db_password>@cluster0.rslwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class ConnectionDB {
  static #instance;

  constructor() {
    mongoose.connect(urlMongo);
  }
  static getInstance() {
    if (ConnectionDB.#instance) {
      console.log("Ya existe una instancia de la base de datos");
      return ConnectionDB.#instance;
    } else {
      this.#instance = new ConnectionDB();
      console.log("ahora estas conectado a la base de datos");
      return this.#instance;
    }
  }
}

export { ConnectionDB };
