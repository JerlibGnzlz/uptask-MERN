import { Router } from "express";
import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from "../controllers/UsuarioController";

const router = Router();

router.post("/", registrar);

router.post("/login", autenticar);

router.get("/confirmar/:token", confirmar);

router.post("/olvidePassword", olvidePassword);

router.route("/olvidePassword/:token").get(comprobarToken).post(nuevoPassword)

export default router;
