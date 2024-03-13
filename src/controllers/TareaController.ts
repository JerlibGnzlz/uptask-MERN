import { Request, Response } from "express"
import { ProyectModel } from "../models/ProyectModel"
import { IUser } from "../interfaces/user.Interfaces"
import { TaskModel } from '../models/TareasModel';
import { IProyecto } from '../interfaces/proyect.interfaces';



export const agregarTarea = async (req: Request, res: Response) => {

    const { proyecto } = req.body

    const existeProyecto = await ProyectModel.findById(proyecto)

    if (!existeProyecto) {
        const error = new Error("El proyecto no existe");
        return res.status(404).json({ msg: error.message });
    }


    const usuario = req.usuario as IUser;

    if (existeProyecto.creador.toString() !== usuario.id.toString()) {
        const error = new Error("No tienes los permisos para añadir tareas");
        return res.status(401).json({ msg: error.message });
    }

    try {
        const tareaAlmacenada = await TaskModel.create(req.body)
        return res.status(201).json({ message: "Tarea creada con exito", tareaAlmacenada });
    } catch (error) {

    }
}


export const obtenerTarea = async (req: Request, res: Response) => {


    const { id } = req.params

    const usuario = req.usuario as IUser;

    try {

        const tarea = await TaskModel.findById(id).populate("proyecto")

        if (!tarea) {
            const error = new Error("Tarea no encontrada");
            return res.status(404).json({ msg: error.message });
        }

        return res.json({ message: "Tarea encontrada", tarea });
    } catch (error) {
        console.error("Error al obtener la tarea:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }

}

export const actualizarTarea = async (req: Request, res: Response) => {

}

export const eliminarTarea = async (req: Request, res: Response) => {

}


export const cambiarEstado = async (req: Request, res: Response) => {

}