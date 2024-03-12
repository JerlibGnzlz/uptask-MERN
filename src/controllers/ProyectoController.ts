import { Request, Response } from "express";
import { Proyectmodel } from "../models/ProyectModel";
import { IProyecto } from "../interfaces/proyect.interfaces";
import { equal } from "assert";
import { IUser } from "../interfaces/user.Interfaces";


export const obtenerProyectos = async (req: Request, res: Response) => {


    const proyecto = await Proyectmodel.find(
        { "creador": req.usuario })

    try {
        return res.status(201).json({ message: "Creador de varios Proyectos", proyecto });
    } catch (error) {
        console.log(error)
    }

}


export const nuevoProyecto = async (req: Request, res: Response) => {


    const proyecto = new Proyectmodel(req.body)

    const usuario = req.usuario as IUser
    proyecto.creador = usuario.id

    try {
        await proyecto.save()

        return res.status(201).json({ message: "Proyecto creado con Exito", proyecto, usuario });

    } catch (error) {
        console.error("Error al crear el proyecto:", error);
        return res.status(500).json({ message: "Hubo un error al crear el proyecto" });
    }

}

export const obtenerProyecto = async (req: Request, res: Response) => {


    const { id } = req.params

    const proyecto = await Proyectmodel.findById(id)

    const usuario = req.usuario as IUser;

    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== usuario.id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    }
    return res.json({ message: "Nombre del proyecto", proyecto });
}

export const editarProyecto = async (req: Request, res: Response) => {

    const { id } = req.params
    const { data } = req.body

    const proyecto = await Proyectmodel.findByIdAndUpdate(id, req.body, { new: true })

    const usuario: IUser = req.usuario as IUser;

    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== usuario.id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    }
    try {
        return res.json({ message: "Editar proyecto", proyecto });

    } catch (error) {
        console.log(error)
    }

}

export const eliiminarProyecto = async (req: Request, res: Response) => {

    const { id } = req.params

    const proyecto = await Proyectmodel.findByIdAndDelete(id)

    const usuario: IUser = req.usuario as IUser;


    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== usuario.id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    }

    try {
        return res.status(201).json({ message: "Proyecto Eliminado", proyecto });
    } catch (error) {
        console.log(error)
    }
}


export const agregarColaborador = async (req: Request, res: Response) => {


}


export const eliminarColaborador = async (req: Request, res: Response) => {


}

export const obtenerTareas = async (req: Request, res: Response) => {


}