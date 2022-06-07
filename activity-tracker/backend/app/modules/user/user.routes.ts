import { Request, Response, NextFunction, Router } from "express";

import { CreateUserValidator, GetResetPassword, LoginValidator, ResetPasswordValidator, PostActivityValidator, BlockUnblockValidator } from "./user.validations";
import userService from "./user.service";

import { ResponseHandler } from "../../utility/response";
import { ROLES } from "../../utility/constants";
import { permit } from "../../utility/authorize";
import { multerMiddleware } from "../../utility/multer";

const router = Router();

// User registration
router.post(
    "/register",
    CreateUserValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.register(req.body);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    }
);

// User login
router.post(
    "/login",
    LoginValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.authenticate(req.body);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    }
);

// Verify Token
router.post(
    "/verify-token",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(new ResponseHandler({ _id: res.locals.user._id, role: res.locals.user.role }));
        } catch (error) {
            next(error);
        }
    }
);

// Post reset password
router.post(
    "/reset-password",
    GetResetPassword,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getResetPassword(req.body.email);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    }
);

// Post new password
router.post(
    "/new-password",
    ResetPasswordValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.postResetPassword(
                req.body.resetToken,
                req.body.password
            );
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    }
);

// Get User Cycle Data
router.get('/',
    permit([ROLES.USER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getUserCycleData(res.locals.user._id);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    }
);

// Post User Activity
router.post('/activity',
    permit([ROLES.USER]),
    multerMiddleware(),
    PostActivityValidator,
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const file = req.file as Express.Multer.File;
            const result = await userService.postActivity(
                res.locals.user._id,
                file,
                req.body
            );
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    });

// New cycle
router.post('/cycle',
    permit([ROLES.USER]),
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await userService.createCycle(res.locals.user._id);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    });

// Get Users
router.get('/all-users',
    permit([ROLES.ADMIN]),
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await userService.getUsers(req.query);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    });

// Block User
router.post('/block/:cycleId',
    permit([ROLES.ADMIN]),
    BlockUnblockValidator,
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await userService.block(req.params.cycleId);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    });

// Unblock User
router.post('/unblock/:cycleId',
    permit([ROLES.ADMIN]),
    BlockUnblockValidator,
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await userService.unblock(req.params.cycleId);
            res.send(new ResponseHandler(result));
        } catch (error) {
            next(error);
        }
    });

export default router;