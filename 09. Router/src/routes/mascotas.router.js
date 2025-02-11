import { Router } from "express";
const mascotasRouter = Router();


//array para almacenar mascostas
const mascotas = [];

app.get("/api/pets", (req, res) => {
    res.send(mascotas);
});

app.post("/api/pets", (req, res) => {
    const nuevaMascota = req.body;
    mascotas.push(nuevaMascota);
    res.send({ status: "success", mensaje: "Mascota creada correcramente" });
})

export default mascotasRouter; //exportamos el router