import { Schema, model, Document } from "mongoose";
import { IFurnace } from "./furnace.types";


class furnaseSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true,
                unique: true
            },
            isDeleted: {
                type: Boolean,
                default: false
            }
        }, { timestamps: true })
    }
}


type furnaseType = Document & IFurnace;
const furnaceDB = model<furnaseType>('furnase', new furnaseSchema());
export default furnaceDB;
