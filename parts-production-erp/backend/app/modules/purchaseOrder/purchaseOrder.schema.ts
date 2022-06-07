import { Schema, model, Document } from "mongoose";
import { IPO } from "./purchaseOrder.types";

class purchaseOrderSchema extends Schema {
    constructor() {
        super({
            customerID: {
                type: Schema.Types.ObjectId,
                ref: 'customer',
                required: true
            },
            products: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: 'product',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                    dimensions: {
                        type: String,
                        required: true
                    }
                }
            ],
            orderStatus: {
                type: Schema.Types.ObjectId,
                ref:'status',
                default: "62452c9c128eb4e5df840966",
                required: false
            },
            totalPrice: {
                type: Number,
                required: false,
                default: 0
            },
            isApprove: {
                type: Boolean,
                default: false
            },
            paymentStatus: {
                type: Boolean,
                default: false
            },
            storageLocation: {
                type: Schema.Types.ObjectId,
                ref: 'storage',
                required: false
            },
            isDelievered: {
                type: Boolean,
                default: false
            },
            assignedSalesPerson: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            },
            assignedManifacturer: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            },
            assignedStorePerson: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            },
            assignedAccountant: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            },
            assignedDriver: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: false
            }
        }, { timestamps: true })
    }
}

type purchaseOrderType = Document & IPO;
const PO_DB = model<purchaseOrderType>('PO', new purchaseOrderSchema());
export default PO_DB;

