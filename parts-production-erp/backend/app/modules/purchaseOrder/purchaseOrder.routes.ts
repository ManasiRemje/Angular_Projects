import { Router, Request, Response, NextFunction } from "express";
import { responseHandler } from "../../../utility/response";
import { createPOValidator, updateAccountantValidator, updateDriverValidator, updateManagerValidator, updateStorePersonValidator } from "./purchaseOrder.validations";
import POServices from "./purchaseOrder.services";
import { permit } from "../../../utility/permit";
import { ROLES } from "../../../utility/dbConstant";

const router = Router();

router.post("/create",
    permit([ROLES.SALESPERSON]),
    createPOValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = await res.locals['userData'];
            console.log(`SalesPerson ID: ${_id}`);
            const data = { ...req.body, assignedSalesPerson: _id }
            const result = await POServices.createPO(data);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


router.get("/display",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await POServices.getAllPurchaseOrders();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// manufacturerupdate
router.put("/manufacturer",
    permit(['62442d60f192c3c376008689']),
    updateAccountantValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = res.locals['userData'];
            console.log(`Manifacturer ID: ${_id}`);
            const result = await POServices.updateManifacturer(req.body, _id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// storePerson-update
router.put("/store-person",
    permit(['62442d86f192c3c37600868d']),
    updateStorePersonValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = res.locals['userData'];
            console.log(`StorePerson ID: ${_id}`);
            const result = await POServices.updateStorePerson(req.body, _id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// accountant-update
router.put("/accountant",
    permit(['62442d6cf192c3c37600868b']),
    updateAccountantValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = res.locals['userData'];
            console.log(`Accountant ID: ${_id}`);
            const result = await POServices.updateAccountant(req.body, _id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// manager
router.put("/manager",
    permit(['62442a219025e1deab324055F']),
    updateManagerValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await POServices.updateManager(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// driver
router.put("/driver",
    permit(['62442d8af192c3c37600868f']),
    updateDriverValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = res.locals['userData'];
            console.log(`Driver ID: ${_id}`);
            const result = await POServices.updateDriver(req.body, _id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


// approve order
router.put("/approve",
    permit(['62442a219025e1deab324055']),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = res.locals['userData'];
            console.log(`Admin ID: ${_id}`);
            const result = await POServices.updateApproveOrder(req.body);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    });

// get orders by status
router.get("/display/:status",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status = req.params.status;
            const result = await POServices.getOrderByStatus(status);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

// get order by status (is approved or not)
router.get("/is-approve/:status",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status = req.params.status;
            const result = await POServices.getIsApprove(status);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });


export default router;
