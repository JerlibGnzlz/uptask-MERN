import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"
import { Usermodel } from "../models/UserModel";
import { token } from "morgan";


const { JWT_SECRET } = process.env

declare global {
    namespace Express {
        interface Request {
            usuario?: any;
        }
    }
}


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    function esJwtPayload(obj: any): obj is JwtPayload {
        return typeof obj === 'object' && 'id' in obj;
    }

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[ 1 ]

            const decoded = jwt.verify(token, JWT_SECRET as string)
            // console.log(decoded)
            if (esJwtPayload(decoded)) {

                req.usuario = await Usermodel.findById(decoded.id).select("-password -confirmado -token")
                console.log(req.usuario)
            }
            return next()

        } catch (error) {
            return res.status(404).json({ message: "Hubo un Error" })
        }

        if (!esJwtPayload) {
            res.status(404).json({ message: "Token no valido" })
        }
    }
    next()
}


