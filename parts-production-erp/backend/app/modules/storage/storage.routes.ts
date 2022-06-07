import { NextFunction, Router, Request, Response } from "express";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import { createStorageValidator } from "./storage.validations";
import storageServices from "./storage.services";
import { ROLES } from "../../../utility/dbConstant";

const router = Router();

router.post("/create",
    permit([ROLES.ADMIN]),
    createStorageValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await storageServices.createStorage(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await storageServices.getAllStorage();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/deleted-storage",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await storageServices.getDeletedStorage();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.put("/update-storage",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await storageServices.updateStorage(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })

router.put("/delete-storage/:name",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;
            const result = await storageServices.deleteStorage(name);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })

export default router;