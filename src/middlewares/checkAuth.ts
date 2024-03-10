import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"
import { Usermodel } from "../models/UserModel";
import { token } from "morgan";


const { JWT_SECRET } = process.env

declare global {
    namespace Express {
        interface Request {
            usuario?: object;
        }
    }
}


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {


    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            const token = req.headers.authorization.split(" ")[ 1 ]

            const decoded = jwt.verify(token, JWT_SECRET as string)

            if (typeof decoded === 'object') {

                req.usuario = await Usermodel.findById(decoded.id).select("-password -confirmado -token")

                next()
            }
        } catch (error) {
            res.status(404).json({ message: "Token de autorización no proporcionado" })
        }
    } else {
        res.status(401).json({ message: "Hubo un Error" });
    }

}


