class MemoryDAO {
  constructor() {
    this.productos = [];
  }
  async crearProducto(datosProducto) {
    try {
      this.productos.push(datosProducto);
    } catch (error) {
      throw new Error("Error al crear un producto en memoria");
    }
  }

  async obtenerProductos() {
    try {
      return this.productos;
    } catch (error) {
      throw new Error("error al obtener los productos en memoria");
    }
  }
}
export default MemoryDAO;
