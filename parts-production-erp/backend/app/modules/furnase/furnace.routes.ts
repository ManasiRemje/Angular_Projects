import { NextFunction, Router, Request, Response } from "express";
import { ROLES } from "../../../utility/dbConstant";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import furnaseServices from "./furnace.services";
import { createFurnaceValidator } from "./furnace.validations";

const router = Router();

router.post("/create",
    permit([ROLES.ADMIN]),
    createFurnaceValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await furnaseServices.createFurnace(req.body);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    permit(['62442a219025e1deab324055']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await furnaseServices.getFurnise();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/deleted-furnace",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await furnaseServices.getDeletedFurnace();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


router.put("/update-furnace",
    permit(['62442a219025e1deab324055']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await furnaseServices.updateFurnace(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })

router.put("/delete-furnace/:name",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;
            const result = await furnaseServices.deleteFurnace(name);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })


export default router;