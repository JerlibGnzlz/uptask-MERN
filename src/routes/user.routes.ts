import { Router } from "express";
import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from "../controllers/UsuarioController";
import { checkAuth } from "../middlewares/checkAuth";




export const userRoutes = Router();

userRoutes.post("/", registrar);

userRoutes.post("/login", autenticar);

userRoutes.get("/confirmar/:token", confirmar);

userRoutes.post("/olvidePassword", olvidePassword);

userRoutes.route("/olvidePassword/:token")
    .get(comprobarToken)
    .post(nuevoPassword)

userRoutes.get("/perfil", checkAuth, perfil)



