import { NextFunction, Router, Request, Response } from "express";
import { ROLES } from "../../../utility/dbConstant";
import { permit } from "../../../utility/permit";
import { responseHandler } from "../../../utility/response";
import { createCustomerValidator } from "../customer/customer.validations";
import userServices from "./user.services";
import { createUserValidator, loginUserValidator } from "./user.validations";
const router = Router();

router.get("/display",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.getUserData();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/deleted-user",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.getDeletedUserData();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


router.post("/register",
    permit([ROLES.ADMIN]),
    createUserValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.createUser(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.post("/register-customer",
    permit([ROLES.ADMIN]),
    createCustomerValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.createCustomer(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/get-customers",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // add conditional pagination
            const result = await userServices.getCustomers();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.post("/login",
    loginUserValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userID, password } = req.body;
            const result = await userServices.login(userID, password);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

export default router;