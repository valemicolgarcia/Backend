import passport from "passport";
import UserModel from "../models/user.model";

//nueva estrategia con google
import GoogleStrategy from "passport-google-oauth20";

const initializePassport = () => {
    //nueva estrategia de google
    passport.use("google", new GoogleStrategy({
        clientID: "COMPLETAR",
        clientSecret: " COMPLETAR",
        callbackURL: "http://localhost:3000/api/sessions/googlecallback"

    }, async (accesToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ email: profile._json.email });
            if (!user) {
                let newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    age: 21,
                    email: profile._json.email,
                    password: ""
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

    //serializar y deserializar

    passport.serializeUser((user, done) => {
        done(null, user._id);

    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })
}


export default initializePassport;