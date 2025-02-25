//creando un custom router

import { Router } from "express";
const router = Router();


class Router1 {
    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
        //devuelve el objeto router
        return this.router;
    }
    get(path, ...callbacks) {
        //definimos una ruta get en el router.
        //el primer argumento es la ruta
        //los siguientes son los callback que se van a ir ejecutando
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks));


    }
    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (req, res, next) => {
            try {
                await callback(req, res, next);
            } catch (error) {
                res.status(500).send("error");
            }
        })
    }

    //custom responses:
    generateCustomResponse(req, res, next) {
        res.sendsSuccess = payload => res.send({ status: "success", payload });
        res.sendServerError = error => res.status(500).send({
            status: "error", error
        });
        res.sendUserError = error => res.status(400).send({
            status: "error", error
        });
        next();
    }
}


export default Router1;