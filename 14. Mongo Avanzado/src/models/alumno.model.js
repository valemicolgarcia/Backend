import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },
    apellido: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    edad: Number,
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cursos"
    }]
})

//middleware pre de mongoose:

alumnoSchema.pre("findOne", function (next) {
    this.populate("cursos");
    next();
});

const AlumnoModel = mongoose.model("alumnos", alumnoSchema);

export default AlumnoModel;

