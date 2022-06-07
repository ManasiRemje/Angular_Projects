import { NextFunction, Router, Request, Response } from "express";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import statusServices from "./status.services";
import { createStatusValidator } from "./status.validations";

const router = Router();

router.get("/display",
    permit(['62442a219025e1deab324055']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statusServices.getStatus();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


router.post("/create",
    permit(['62442a219025e1deab324055']),
    createStatusValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statusServices.createStatus(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


export default router;