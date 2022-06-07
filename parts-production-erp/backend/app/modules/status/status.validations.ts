import { body } from "express-validator";
import { validate } from "../../../utility/validations";


export const createStatusValidator = [
    body('name').isString().isLength({ min: 1 }).trim().withMessage("name is required"),
    validate
]