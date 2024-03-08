import { Router } from "express";
import { registrar, autenticar, confirmar } from "../controllers/UsuarioController";

const router = Router();

router.post("/", registrar);

router.post("/login", autenticar);

router.get("/confirmar/:token", confirmar);

export default router;
