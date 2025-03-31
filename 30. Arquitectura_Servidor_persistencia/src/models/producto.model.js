import mongoose from "mongoose";
const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
});

const ProductoModel = mongoose.model("productos", productoSchema);
export default ProductoModel;
