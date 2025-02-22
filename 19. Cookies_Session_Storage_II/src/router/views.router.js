import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
    res.render("login");

})

router.get("/register", (req, res) => {
    if (req.session.user) {
        res.redirect("/profile");
    }
    res.render("register");
})

router.get("/profile", (req, res) => {
    //verifico si el usuario esta logueado
    if (!req.session.user) {
        return res.redirect("/login");
    }
    res.render("profile", { user: req.session.user });
})


export default router;