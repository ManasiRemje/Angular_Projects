import { Request, Response, NextFunction } from "express";
import { responseHandler } from "./response";

export const permit = (permittedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals['userData'];
        if (!permittedRoles.includes(role)) {
            return res.send(new responseHandler({ message: "Only Authorized Person Can Access This Page" }));
        }
        next();
    }
}

