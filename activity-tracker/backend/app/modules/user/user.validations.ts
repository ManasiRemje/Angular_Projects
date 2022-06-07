import { body, param, query } from "express-validator";
import validate from "../../utility/validate";

export const CreateUserValidator = [
    body("name").trim().notEmpty().isString().withMessage("Please provide a valid name"),
    body("email").trim().notEmpty().isEmail().withMessage("Please provide a valid email"),
    body("password").trim().notEmpty().isString().withMessage("Please provide a valid password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
    body("confirmPassword").trim().notEmpty().isString().custom((value, { req }) => {
        if (value !== req.body.password) throw 'Passwords do not match';
        return true;
    }),
    validate
];

export const LoginValidator = [
    body("email").trim().notEmpty().isEmail().withMessage("Please provide a valid email"),
    body("password").trim().notEmpty().isString().withMessage("Please provide a valid password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
    validate
];

export const GetResetPassword = [
    body("email").trim().notEmpty().isEmail().withMessage("Please enter a valid email"),
    validate
];

export const ResetPasswordValidator = [
    body("resetToken").trim().notEmpty().isString().withMessage("Invalid reset token"),
    body("password").trim().notEmpty().isString().withMessage("Please provide a valid password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
    body("confirmPassword").trim().notEmpty().isString().custom((value, { req }) => {
        if (value !== req.body.password) throw 'Passwords do not match';
        return true;
    }),
    validate
];

export const PostActivityValidator = [
    body("certificationDate").trim().notEmpty().isDate().withMessage("Please provide a valid certification date"),
    body("cycle").trim().notEmpty().isString().withMessage("Please provide a valid cycle id"),
    body("subCycle").trim().notEmpty().isString().withMessage("Please provide a valid sub cycle id"),
    body("task").trim().notEmpty().isString().withMessage("Please provide a valid task id"),
    validate
];

export const BlockUnblockValidator = [
    param("cycleId").trim().isString().notEmpty().withMessage("Cycle id is missing"),
    validate
];