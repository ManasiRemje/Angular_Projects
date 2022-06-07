import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IExclude } from "../routes/routes.types";

const { verify } = jwt;

export const permit = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user || !roles.some(role => res.locals.user.role === role)) {
                throw { statusCode: 403, message: 'Forbidden' };
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
};

export const authorize = (excludedPaths: IExclude[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (excludedPaths.find(ep => ep.path === req.url && ep.method === req.method)) return next();
            const token = req.headers.authorization;
            if (!token) throw { statusCode: 401, message: 'Unauthorized' };
            const JWT_SECRET = process.env.JWT_SECRET || '';
            const payload = verify(token, JWT_SECRET);
            if (!payload) throw { statusCode: 401, message: 'Unauthorized' };
            res.locals.user = payload;
            next();
        } catch (error) {
            next(error);
        }
    };
};