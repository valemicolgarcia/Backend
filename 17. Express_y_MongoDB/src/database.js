import mongoose from "mongoose";

mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Repaso?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("nos conectamos a la bd"))
    .catch((error) => console.log("todo anda mal", error));