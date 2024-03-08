import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const generarJWT = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "30d"
    })
}