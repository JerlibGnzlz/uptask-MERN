import { Request, Response } from "express";
import { Usermodel } from "../models/UserModel";
import { generarId } from "../helpers/generarID";
import { encryptPassword, isCorrectPass } from "../utils/bycript";
import { IUser } from "../interfaces/user.Interfaces";

export const registrar = async (req: Request, res: Response) => {
  /**
   * EVITAR REGISTROS DUPLICADO
   */
  const { nombre, email, password } = req.body as IUser

  const existeUsuario = await Usermodel.findOne({ email });

  try {

    if (!email) {
      const error = new Error("Todos los campos son requeridos");
      return res.status(400).json({ msg: error.message });
    }

    if (existeUsuario) {
      const error = new Error("El usuario ya existe");
      return res.status(400).json({ message: error.message, existeUsuario });
    }


    const passHash = await encryptPassword(password)

    const usuario = new Usermodel({ nombre, email, password: passHash });
    usuario.token = generarId()
    const usuarioAlmacenado = await usuario.save()
    return res.status(201).json({ message: "Usuario creado con exito", usuarioAlmacenado });

  } catch (error) {
    console.log(error);
  }
};

export const autenticar = async (req: Request, res: Response) => {

  const { nombre, email, password } = req.body as IUser

  const usuario = await Usermodel.findOne({ email });

  try {

    if (!email || !password) {
      const error = new Error("Todos los campos son requeridos");
      return res.status(400).json({ msg: error.message });
    }

    if (!usuario) {
      const error = new Error("El usuario No existe");
      return res.status(404).json({ message: error.message, usuario });
    }

    if (!usuario?.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ message: error.message });
    }

    const passHash = usuario?.password as string

    const isCorrect = await isCorrectPass(password, passHash)

    if (isCorrect) {
      console.log(usuario)
      return res.json(
        {
          message: "Usuario Logueado",
          _id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
        })
      const data = {
        // token,
      }
    } else {
      const error = new Error("El password es Incorrecto");
      return res.status(403).json({ message: error.message });
    }
  } catch (error) {
    console.log(error)
  }
}

