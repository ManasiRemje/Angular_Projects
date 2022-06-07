import { body } from "express-validator";
import { validate } from "../../../utility/validations";

export const createPOValidator = [
    body('customerID').isString().withMessage("Customer id is Required"),
    body('products.*.quantity').isFloat({ min: 1 }).withMessage("Customer id is Required"),
    validate
]

// .custom((value) => {
//     value.forEach(el => {
//         if (el.uid == 0) throw new Error('The el is required');
//         return true;
//     });
//     return true;
// });

export const updateManufacturerValidator = [
    body('_id').isString().withMessage("PO ID is required"),
    validate
]

export const updateStorePersonValidator = [
    body('_id').isString().withMessage("PO ID is required"),
    validate
]

export const updateDriverValidator = [
    body('_id').isString().withMessage("PO ID is required"),
    validate
]

export const updateAccountantValidator = [
    body('_id').isString().withMessage("PO ID is required"),
    validate
]

export const updateManagerValidator = [
    body('_id').isString().withMessage("PO ID is required"),
    validate
]