import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

export const generarJWT = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET as string, {
        expiresIn: "30d"
    })
}