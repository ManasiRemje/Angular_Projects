import { Schema, model, Document } from "mongoose";
import { ICustomer } from "./customer.types";

class customerSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        }, { timestamps: true })
    }
}


type customerType = Document & ICustomer;
const customerDB = model<customerType>('customer', new customerSchema());
export default customerDB;