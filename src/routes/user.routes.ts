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

const router = Router();

router.post("/", registrar);

router.post("/login", autenticar);

router.get("/confirmar/:token", confirmar);

router.post("/olvidePassword", olvidePassword);

router.route("/olvidePassword/:token").get(comprobarToken).post(nuevoPassword)

router.get("/perfil", checkAuth, perfil)

export default router;
