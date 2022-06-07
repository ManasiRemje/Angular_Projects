import { body } from "express-validator";
import { validate } from "../../../utility/validations";

export const createRoleValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).isString().isLength({ min: 1 }).trim().withMessage("name is required"),
    validate
]