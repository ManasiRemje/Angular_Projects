import { Schema, model, Document } from "mongoose";
import { IStorage } from "./storage.types";

class storageSchema extends Schema {
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

type storageType = Document & IStorage;
const storageDB = model<storageType>('storage', new storageSchema());
export default storageDB;