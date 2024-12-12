import { Router } from "express";
const usuariosRouter = Router();


const usuarios = [];

app.get("/api/users", () => {
    res.send(usuarios);
})

app.post("/api/users", (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.send({ status: "success", mensaje: "Usuario creado correctamene" });
})

export default usuariosRouter;

// el /api/users lo podes sacar y ponerlo en app que queda mas prlijo 