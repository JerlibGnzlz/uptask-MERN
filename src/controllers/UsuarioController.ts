import { Request, Response } from "express";


export const registrar = (req: Request, res: Response) => {
    res.json({ message: "CREAR usuario" });
};

