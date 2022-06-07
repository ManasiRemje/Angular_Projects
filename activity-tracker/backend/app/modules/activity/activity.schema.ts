import { Schema, model, Document, SchemaTypes } from "mongoose";
import { IActivity } from "./activity.types";

class ActivitySchema extends Schema {
    constructor() {
        super({
            category: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            subCycleNumber: {
                type: Number,
                required: true
            },
            isOptional: {
                type: Boolean,
                required: true
            },
        }, { timestamps: true });
    }
};

type ActivityDocument = Document & IActivity;
const ActivityModel = model<ActivityDocument>('Activity', new ActivitySchema());
export default ActivityModel;