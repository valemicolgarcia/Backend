import passport from "passport";
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }

            req.user = user;
            next();
        })(req, res, next); //invocacion inmediata de la funcion middleware por passporCall
        //en js una funcion se puede invocar agregando parentesis despues de su definicion
    }
}

//ahora vamos a combinar un middleware de autorizacion con passport

export const authorization = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send({ error: "no tenes permiso para pasar aca" });
        }
        next();
    }
}

