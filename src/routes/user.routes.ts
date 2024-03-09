import { Router } from "express";
import { registrar, autenticar, confirmar, olvidePassword } from "../controllers/UsuarioController";

const router = Router();

router.post("/", registrar);

router.post("/login", autenticar);

router.get("/confirmar/:token", confirmar);

router.post("/olvidePassword", olvidePassword);

export default router;
