import JugueteModel from "../models/juguetes.js";
class JugueteService {
  async crearJuguete(datosJuguete) {
    try {
      const juguete = new JugueteModel(datosJuguete);
      return await juguete.save();
    } catch (error) {
      throw new Error("error al crear el jugeute");
    }
  }
  async obtenerJuguetes() {
    try {
      return await JugueteModel.find();
    } catch (error) {
      throw new Error("error al obtener los juguetes");
    }
  }
}

export default JugueteService;
