import MongoDBDAO from "../dao/mongoDBDAO.js";
import MemoryDAP from "../dao/memoryDAO.js";

const productoServices = new MongoDBDAO();

class ProductoController {
  async getProductos(req, res) {
    try {
      const productos = await productoServices.obtenerProductos();
      res.send(productos);
    } catch (error) {
      res.send("error en el getProductos del controller");
    }
  }
  async postProducto(req, res) {
    //const {nombre, categoria, precio} = req.body;
    try {
      const producto = await productoServices.crearProducto(req.body);
      res.send(producto);
    } catch (error) {
      res.send("error en el post de producto en el controller");
    }
  }
}
export default ProductoController;
