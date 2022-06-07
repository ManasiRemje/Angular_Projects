import { body } from "express-validator";
import { validate } from "../../../utility/validations";

export const createProductValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).isString().isLength({ min: 1 }).trim().withMessage("name is required"),
    body('material').matches(/^[A-Za-z\s]+$/).isString().notEmpty().withMessage("Material is Required"),
    body('price').isFloat({ min: 1 }).isLength({ min: 1 }).trim().withMessage("Price is required"),
    body('defaultDimensionsPrice').isLength({ min: 1 }).trim().isNumeric().withMessage('Default price is required'),
    validate
]


