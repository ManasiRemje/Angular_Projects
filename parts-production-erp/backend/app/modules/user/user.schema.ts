import { Schema, model, Document } from "mongoose";
import { ICustomer, IUser } from "./user.types";

class userSchema extends Schema {
    constructor() {
        super({
            userID: {
                type: String,
                required: false,
                unique: true
            },
            name: {
                type: String,
                required: true
            },
            role: {
                type: Schema.Types.ObjectId, ref: 'role',
                required: true
            },
            email: {
                type: String,
                required: true,
                unique:true
            },
            password: {
                type: String,
                required: false
            },
            isDeleted: {
                type: Boolean,
                default: false
            },
            shift: {
                time: { type: String, required: false },
                furnaceID: { type: Schema.Types.ObjectId, ref: 'furnase', required: false }
            }
        }, { timestamps: true })
    }
}

type userType = Document & IUser;
const userDB = model<userType>('user', new userSchema());
export default userDB;



