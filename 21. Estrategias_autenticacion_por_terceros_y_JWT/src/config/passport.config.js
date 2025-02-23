//instalamos:npm i passport passport-local
//el segundo es la estrategia elegida

//JWT
//npm install express jsonwebtoken


//importamos los modulos:
import passport from "passport";
import local from "passport-local";
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

const LocalStrategy = local.Strategy;

//passport con github:
//importamos la estrategia nueva: github
import GithubStrategy from "passport-github2";


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
                return done(null, false);
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

    //aca desarrollamos la nueva estrategia con github
    passport.use("github", new GithubStrategy({
        clientID: "Iv23li0VyEFTNFy9orif",
        clientSecret: "6313f9a73b5d83f3b7094e96c1c53d20c89cd719",
        callbackURL: "http://localhost:3000/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("perfil", profile);
        try {
            let user = await UserModel.findOne({ email: profile._json.email });
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 37,
                    email: profile._json.email,
                    password: " "

                }

                let result = await UserModel.create(newUser);
                done(null, result);

            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))

}

export default initializePassport;
