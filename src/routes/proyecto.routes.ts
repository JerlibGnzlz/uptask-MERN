import { Router } from "express";
import {
    obtenerTareas,
    agregarColaborador,
    editarProyecto,
    eliiminarProyecto,
    eliminarColaborador,
    nuevoProyecto,
    obtenerProyecto,
    obtenerProyectos
} from '../controllers/ProyectoController';
import { checkAuth } from "../middlewares/checkAuth";

export const ProyectoRouter = Router()

ProyectoRouter.route("/",)
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

ProyectoRouter.route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliiminarProyecto)

ProyectoRouter.get("/tareas", checkAuth, obtenerTareas)
ProyectoRouter.post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
ProyectoRouter.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)
