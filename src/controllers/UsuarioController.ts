import { Request, Response } from "express";
import { Usermodel } from "../models/UserModel";


export const registrar = async (req: Request, res: Response) => {


    try {
        const { nombre, email, password } = req.body

        const usuario = new Usermodel(req.body)

        if (nombre === "" || email === "" || password === "") {
            res.status(400).json({ message: "Todos los campos son rqueridos", usuario })
            return
        } else {

            const usuarioAlmacenado = await usuario.save()
            return usuarioAlmacenado
        }

    } catch (error) {
        console.log(error)
    }
};

