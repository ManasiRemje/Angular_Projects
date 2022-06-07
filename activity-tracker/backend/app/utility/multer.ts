import { join } from "path";
import { NextFunction, Request, Response } from "express";
import multer, { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

const storage = (userId: string) => diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, join('files', userId));
    },
    filename: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, uuid() + '-' + file.originalname);
    }
});

export const multerMiddleware = () => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const fileStorage = storage(res.locals.user._id);
    multer({ storage: fileStorage })
        .single('certificate')(req, res, () => { next() });
};