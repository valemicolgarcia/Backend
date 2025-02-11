import mongoose from "mongoose";

//nos conectamos con mongodb Atlas
mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conectados a la base de datos con exito"))
    .catch((error) => console.log("TENEMOS UN ERROR: " + error)
    );
//voy a connect, drivers pero saco la uri y la pego, cambiar CONTRASENIA
