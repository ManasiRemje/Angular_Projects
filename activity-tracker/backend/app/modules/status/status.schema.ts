import { Schema, model, Document } from "mongoose";
import { IStatus } from "./status.types";

class StatusSchema extends Schema {
    constructor() {
        super({
            title: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
        }, { timestamps: true });
    }
};

type StatusDocument = Document & IStatus;
const StatusModel = model<StatusDocument>('Status', new StatusSchema());
export default StatusModel;