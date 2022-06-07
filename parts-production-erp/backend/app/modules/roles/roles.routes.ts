import { NextFunction, Router, Response, Request } from "express";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import rolesServices from "./roles.services";
import { createRoleValidator } from "./roles.validations";

const router = Router();

router.post("/create",
    permit(['62442a219025e1deab324055']),
    createRoleValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await rolesServices.createRole(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await rolesServices.getRole();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


export default router;