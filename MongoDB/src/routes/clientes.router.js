import { Router } from "express";
import ClientesModel from "../models/clientes.model.js";

const clientesRouter = Router();

//get
clientesRouter.get("/", async (req, res) => {
    try {
        const clientes = await ClientesModel.find();
        res.send(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: "error en el servidor del get" });
    }

})



//post
clientesRouter.post("/", async (req, res) => {
    try {
        const cliente = new ClientesModel(req.body);
        await cliente.save();
        res.send({ mensaje: "Cliente generado exitosamente", cliente })
    } catch (error) {
        res.status(500).json({ mensaje: "error en el post en el servidor" });
    }
})

//put:actualizamos el cliente por su id

clientesRouter.put("/:id", async (req, res) => {
    try {
        const cliente = await ClientesModel.findByIdAndUpdate(req.params.id, req.body);
        //no olvidarse de validar si se encuentra el usuario (condicional si hay cliente deci que lo actualizamos en caso contrario deci q no habia)
        res.send("Todo bien! ya te lo actualizamos");
    } catch (error) {
        res.status(500).send('todo mal, no se actualizo');

    }
})


//delete: vamos a eliminar un cliente por su id
clientesRouter.delete("./:id", async (req, res) => {
    try {
        const cliente = await ClientesModel.findByIdAndDelete(req.params.id);
        //validar si encuentra el usuario, agregar
        res.send("Cliente eliminado");
    } catch (error) {
        res.status(500).send("error en el delete de clientes");
    }
})

export default clientesRouter;