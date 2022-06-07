import { Schema, model, Document } from "mongoose";
import { IProducts } from "./products.types";

class productSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required:false
            },
            material: {
                type: String,
                required:true
            },
            defaultDimensionsPrice: {
                type: Number,
                required:true
            },
            isDeleted: {
                type: Boolean,
                default: false
            }
        }, { timestamps: true })
    }
}

type productType = Document & IProducts;
const productDB = model<productType>('product', new productSchema());
export default productDB;