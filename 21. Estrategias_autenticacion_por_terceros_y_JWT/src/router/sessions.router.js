import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { generateToken } from "../utils/jsonwebtoken.js";

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
/*
import passport from "passport";
//al authenticate le pasamos el nombre de la estretagia que le pusimos
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failedregister" }), async (req, res) => {
    res.redirect("/login");
})

router.get("/failedregister", (req, res) => {
    res.send("tenes un registro fallido");
})
    */

//ruta para hacer el login VERSION 1

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

//login con passport VERSION 2
/*
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

*/

//logout VERSION 1

router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    res.redirect("/login");
})

// version con github ----------------------------------------
/*
router.get("/github", passport.authenticate("github", { scope: ["user: email"] }), async (req, res) => {

})

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    //la estrategia de passport github nos retornara el usuario, entonces lo agregamos a nuestro objeto de sesion
    req.session.user = req.user;
    res.redirect("/profile");

})
*/

//REGISTRO CON JSONWEBTOCKEN----------------------------------------------------------------
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        const existeUsuario = await UserModel.findOne({ email: email });

        if (existeUsuario) {
            return res.status(400).send("El email ya esta usado en nuestra base de datos");
        }
        //creamos un nuevo usuario
        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age
        });

        //generamos un token
        const token = generateToken({
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.first_name,
            apellido: nuevoUsuario.last_name
        });

        res.status(201).send({ mensaje: "Usuario creado con exito", token });




    } catch (error) {
        console.log("error en el register");
        res.status(500).send("error en el servidor");
    }
})

//login para jsonwebtoken
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await UserModel.findOne({ email: email });
        if (!usuario) {
            return res.status(400).send("no se encontro el usuario");
        }

        if (!isValidPassword(password, usuario)) {
            return res.status(401).send("Credenciales incorectas");
        }
        //si la contra es correcta, generamos el token

        const token = generateToken({
            id: usuario._id,
            first_name: usuario.first_name,
            apellido: usuario.last_name,
            email: usuario.email
        });

        res.send({ mensaje: "Todo perfecto, podes pasar", token });



    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
})


export default router;