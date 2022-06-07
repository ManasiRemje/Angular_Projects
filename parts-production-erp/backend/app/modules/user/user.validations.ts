import { body } from "express-validator";
import { validate } from "../../../utility/validations";

export const createUserValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).isLength({ min: 1 }).trim().withMessage("name is required / must be alphabetic"),
    body('role').isString().withMessage("Role is Required"),
    body('email').isEmail().withMessage("Email is Required"),
    validate
]


export const loginUserValidator = [
    body('userID').isString().withMessage("UserID is Required"),
    body('password').isString().withMessage("Password is Required"),
    validate
]