import { Router } from "express";
import { registrar, autenticar } from "../controllers/UsuarioController";

const router = Router();

router.post("/", registrar);

router.post("/login", autenticar);

export default router;
