import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { generarId } from "../helpers/generarID";
import { encryptPassword, isCorrectPass } from "../utils/bycript";
import { IUser } from "../interfaces/user.Interfaces";
import { generarJWT } from "../helpers/gerarJWT";

export const registrar = async (req: Request, res: Response) => {
  /**
   * EVITAR REGISTROS DUPLICADO
   */
  const { nombre, email, password } = req.body as IUser

  const existeUsuario = await UserModel.findOne({ email }, { new: true });

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

    const usuario = new UserModel({ nombre, email, password: passHash });
    usuario.token = generarId()
    const usuarioAlmacenado = await usuario.save()
    return res.status(201).json({ message: "Usuario creado con exito", usuarioAlmacenado });

  } catch (error) {
    console.log(error);
  }
};

export const autenticar = async (req: Request, res: Response) => {

  const { nombre, email, password } = req.body as IUser

  const usuario = await UserModel.findOne({ email }, { new: true });

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
      console.log(usuario._id)

      const stringId: string = usuario._id.toString();
      const tokenUsuario = generarJWT(stringId);

      const data = {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        tokenUsuario
      }

      const error = new Error("Session y Token Valido");
      return res.status(200).json({ message: error.message, data });

    } else {
      const error = new Error("El password es Incorrecto");
      return res.status(403).json({ message: error.message });
    }
  } catch (error) {
    console.log(error)
  }
}
export const confirmar = async (req: Request, res: Response) => {
  const { token } = req.params
  const usuarioConfirmar = await UserModel.findOne({ token })

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ message: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true
    usuarioConfirmar.token = ""
    await usuarioConfirmar.save()
    res.json({ message: "Usuario Confirmado Correctamente", usuarioConfirmar })
  } catch (error) {
    console.log(error)
  }

}

export const olvidePassword = async (req: Request, res: Response) => {

  const { email } = req.body

  const usuario = await UserModel.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario No existe");
    return res.status(404).json({ message: error.message, usuario });
  }

  try {
    usuario.token = generarId()
    await usuario.save()
    res.json({ message: "Hemos enviado un email con las Instrucciones" })
  } catch (error) {
    console.log(error)
  }
}

export const comprobarToken = async (req: Request, res: Response) => {

  const { token } = req.params


  const tokenValido = await UserModel.findOne({ token });

  if (tokenValido) {
    res.json({ message: "Token valido y el usuario Existe" })
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ message: error.message, tokenValido });

  }

}

export const nuevoPassword = async (req: Request, res: Response) => {
  const { token } = req.params
  const { password } = req.body

  const usuario = await UserModel.findOne({ token });

  const passHash = await encryptPassword(password)
  try {

    if (usuario) {
      usuario.password = passHash
      usuario.token = ""
      await usuario.save()
      res.json({ message: "Password modificado Correctamente" })
    } else {
      const error = new Error("Token no valido o contraseña");
      return res.status(404).json({ message: error.message });

    }
  } catch (error) {
    console.log(error)
  }
}

export const perfil = async (req: Request, res: Response) => {
  const { usuario } = req
  res.json(usuario)

}
