import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

//ruta para registrar nuevo usuario
/*
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body; //levanto los datos del fomrulario
    try {
        //verificamos si el correo elec ya esta registrado
        const existeUsuario = await UserModel.findOne({ email: email });
        if (existeUsuario) {
            return res.status(400).send("El email ya esta registrado");

        }
        //creamos un nuevo usuario
        const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password: createHash(password), age });
        res.redirect("/login");


    } catch (error) {
        console.log(error);
        res.send("Error fatal");
    }
})

*/

//version de registro usando passpor4t
//no olvidar de importar passport
import passport from "passport";
//al authenticate le pasamos el nombre de la estretagia que le pusimos
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failedregister" }), async (req, res) => {
    res.redirect("/login");
})

router.get("failedregister", (req, res) => {
    res.send("tenes un registro fallido");
})
//ruta para hacer el login

/*
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await UserModel.findOne({ email: email });
        if (usuario) {
            // if (usuario.password === password) {
            if (isValidPassword(password, usuario)) {
                req.session.user = {
                    email: usuario.email,
                    age: usuario.age,
                    first_name: usuario.first_name,
                    last_name: usuario.last_name
                }
                res.redirect("/profile");

            } else {
                res.send("Contrasenia invalida");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {

    }
})
*/

//login con passport
router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {
    //aca creamos la sesion
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect("/profile");
})

router.get("/faillogin", (req, res) => {
    res.send("fallo el login");
})

//logout
router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    res.redirect("/login");
})
export default router;