import { body } from "express-validator";
import { validate } from "../../../utility/validations";

export const createCustomerValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).isString().isLength({ min: 1 }).trim().withMessage("name is required"),
    body('phoneNumber').isNumeric().withMessage("phone number is reuired"),
    body('address').isString().isLength({ min: 1 }).trim().withMessage("address is required"),
    validate
]