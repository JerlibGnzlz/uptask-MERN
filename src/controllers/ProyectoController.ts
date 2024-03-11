import { Request, Response } from "express";
import { Proyectmodel } from "../models/ProyectModel";
import { IProyecto } from "../interfaces/proyect.interfaces";


export const obtenerProyectos = async (req: Request, res: Response) => {

    const { email } = req.params as IProyecto

    const proyecto = await Proyectmodel.findOne({ email })

}


export const nuevoProyecto = async (req: Request, res: Response) => {

    interface Usuario {
        id: string;
    }

    const { nombre, descripcion, cliente } = req.body as IProyecto

    const proyecto = new Proyectmodel(req.body)

    const usuario = req.usuario as Usuario
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


}

export const editarProyecto = async (req: Request, res: Response) => {


}

export const eliiminarProyecto = async (req: Request, res: Response) => {


}


export const agregarColaborador = async (req: Request, res: Response) => {


}


export const eliminarColaborador = async (req: Request, res: Response) => {


}

export const obtenerTareas = async (req: Request, res: Response) => {


}