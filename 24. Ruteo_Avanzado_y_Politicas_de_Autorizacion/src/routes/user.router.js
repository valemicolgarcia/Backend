import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //aca colocamos todas las rutas
        this.get("/", (req, res) => {
            res.sendSuccess("hola");
        })
    }
}

export default UserRouter;