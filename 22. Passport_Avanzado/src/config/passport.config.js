//trabajemos con la estrategia passport-jwt

//1. instalamos: npm i passport - passport-jwt
//2. recuerden instalar cookie parser

import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy; //core de la estrategia
const ExtractJwt = jwt.ExtractJwt; //extractor de jwt ya sea de headers, cookies, etc.

//creamos el cookie extractor
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"];
        //tomamos la cookie que necesitamos
    }
    return token;
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}


//no olvidar configurar la app.js
export default initializePassport;
