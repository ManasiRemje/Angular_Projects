import { Schema, model, Document } from "mongoose";
import { IRole } from "./role.types";

class RoleSchema extends Schema {
    constructor() {
        super({
            title: {
                type: String,
                required: true
            }
        }, { timestamps: true });
    }
};

type RoleDocument = Document & IRole;
const RoleModel = model<RoleDocument>('Role', new RoleSchema());
export default RoleModel;