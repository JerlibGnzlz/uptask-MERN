import { Router } from "express";
import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from "../controllers/TareaController"
import { checkAuth } from "../middlewares/checkAuth";



export const TareaRouter = Router()

TareaRouter.post("/", checkAuth, agregarTarea)

TareaRouter.route("/:id")
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)

TareaRouter.post("/estado/:id", checkAuth, cambiarEstado)