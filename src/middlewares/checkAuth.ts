import { Response, Request, NextFunction } from "express"


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log("desde AUTH")
    return next()
}


