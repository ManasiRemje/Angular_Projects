import { NextFunction, Router, Request, Response } from "express";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import productsServices from "./products.services";
import { createProductValidator } from "./products.validations";

const router = Router();

router.post("/create",
    permit(['62442a219025e1deab324055']),
    createProductValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await productsServices.createProduct(req.body);
            res.send(new responseHandler(result));
        } catch (e) {
            next(e);
        }
    });

router.get("/display",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await productsServices.getAllProducts();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/deleted-products",
    permit(['62442a219025e1deab324055']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await productsServices.getDeletedProducts();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

export default router;