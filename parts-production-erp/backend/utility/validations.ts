import { NextFunction, Response, Request } from "express";
import { Result, validationResult } from "express-validator";
import { responseHandler } from "./response";

export const validate = (
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(new responseHandler('BAD REQUEST')).status(400);
        }
        next();
    }
)