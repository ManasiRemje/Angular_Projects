import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuth } from "../app/routes/routes.types";

const { verify } = jwt;

export const authorize = (excludedPath: IAuth[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (excludedPath.find(
                ep => ep.path === req.url && ep.method === req.method)) {
                return next();
            }
            const token = req.headers.authorization;
            const { SECRET_KEY } = process.env;
            if (token && SECRET_KEY) {
                const payload = verify(token, SECRET_KEY);
                res.locals['userData'] = payload;
                next();
            }
            else {
                throw { message: "Not Authorized" }
            }
        } catch (e) {
            next(e);
        }
    }
}