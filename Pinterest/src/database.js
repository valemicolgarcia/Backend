import mongoose from "mongoose";

mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la bd con exito!!!! archivo datbase"))
    .catch((error) => console.log("error: " + error));

