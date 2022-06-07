import { Schema, model, Document } from "mongoose";
import { stringify } from "querystring";
import { IStatus } from "./status.types";

class statusSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true,
                unique: true
            }
        }, { timestamps: true })
    }
}

type statusType = Document & IStatus;
const statusDB = model<statusType>('status', new statusSchema());
export default statusDB; 