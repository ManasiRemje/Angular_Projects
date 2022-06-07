import { Schema, model, Document } from "mongoose";
import { stringify } from "querystring";
import { IRoles } from "./roles.types";

class roleSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true,
                unique: true
            }
        })
    }
}

type roleType = Document & IRoles;
const roleDB = model<roleType>('role', new roleSchema());
export default roleDB;