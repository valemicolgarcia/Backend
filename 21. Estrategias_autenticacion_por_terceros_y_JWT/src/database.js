import mongoose from "mongoose";
mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conectados con exito"))
    .catch(() => console.log("tenemos un probloema"));