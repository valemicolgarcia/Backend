import ProductoModel from "../models/producto.model.js";

class MongoDBDAO {
  async crearProducto(datosProducto) {
    try {
      const producto = new ProductoModel(datosProducto);
      return await productp.save();
    } catch (error) {
      throw new Error("error al crear el producto en mongodb");
    }
  }
  async obtenerProductos() {
    try {
      return await ProductoModel.find();
    } catch (error) {
      throw new Error("error al crear el producto en mongodb");
    }
  }
}
export default MongoDBDAO;
