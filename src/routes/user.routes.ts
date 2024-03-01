import { Router } from "express";
import { registrar } from "../controllers/UsuarioController";

const router = Router();

router.post("/", registrar);


export default router;
