//instalamos:npm i passport passport-local
//el segundo es la estrategia elegida

//importamos los modulos:
import passport from "passport";
import local from "passport-local";
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new LocalStrategy({ //la estrategia local espera el usuario
        passReqToCallback: true,
        //pass.. le permite acceder al objeto request con esta configuracion
        usernameField: "email"
    }, async (req, username, password, done) => {

        const { first_name, last_name, email, age } = req.body;

        try {
            //verifico si ya tengo alguien registrado con ese mail
            let user = await UserModel.findOne({ email });
            if (user) return done(null, false);
            //si no existe un usuario con ese emial en mi bd creo un registro nuevo
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const result = await UserModel.create(newUser);
            return done(null, result);


        } catch (error) {
            return done(error);
        }
    }));
    //passport.use("Google"); //puedo poner mas estrategias
    //agregamos otra estrategia para el login
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //busco el usuario por el email
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("Este usuario no existe");
            }
            //si existe verifico la contrasenia
            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);


        } catch (error) {
            return done(error);
        }
    }))

    //tenemos que serializar y deserializar usuarios.

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })

}

export default initializePassport;
