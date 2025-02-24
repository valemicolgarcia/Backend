import { Router } from "express";
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import passport from "passport";
const router = Router();


// ruta google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }), async (req, res) => {
    //no hay que completar nada porque todo el trbajo lo hace passport
})

//ruta google callback

router.get("/googlecallback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/profile");
})


//logout
router.get("/logout", async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    res.redirect("/login");
})


export default router;