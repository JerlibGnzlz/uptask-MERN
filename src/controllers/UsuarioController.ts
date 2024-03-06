import { Request, Response } from "express";
import { Usermodel } from "../models/UserModel";
import { generarId } from "../helpers/generarID"


export const registrar = async (req: Request, res: Response) => {

    /**
     * EVITAR REGISTROS DUPLICADO
     */
    const { email } = req.body
    const existeUsuario = await Usermodel.findOne({ email })

    if (!email)
    {
        const error = new Error("Todos los campos son requeridos")
        return res.status(400).json({ msg: error.message })
    }

    if (existeUsuario)
    {
        const error = new Error("El usuario ya existe")
        res.status(400).json({ message: error.message, existeUsuario })
    }

    try
    {
        const usuario = new Usermodel(req.body)
        usuario.token = generarId()
        usuario.confirmado = false
        const usuarioAlmacenado = await usuario.save()
        res.json({ usuarioAlmacenado })

    } catch (error)
    {
        console.log(error)
    }

};


