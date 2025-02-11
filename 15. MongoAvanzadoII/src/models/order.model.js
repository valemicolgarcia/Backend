import mongoose from "mongoose";

//PAGINACION

//1. Importas
import mongoosePaginate from "mongoose-paginate-v2";


//----------------------
const orderSchema = new mongoose.Schema({
    nombre: String,
    tam: String,
    precio: Number,
    cantidad: Number
})

//-----------------

//paginacion
//2. utilizas el metodo plugin
orderSchema.plugin(mongoosePaginate);

//----------------------------------------
const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;