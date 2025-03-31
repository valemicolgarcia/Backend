import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://valemicolgarcia:Coderhouse@cluster0.rslwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("conectados"))
  .catch(() => console.log("error"));
