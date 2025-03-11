import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://valemicolgarcia:<coderhouse>@cluster0.rslwa.mongodb.net/Juguetes?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectados a la BD"))
  .catch((error) => console.log("Tenemos un error: ", error));

//
