import { Schema, model, Document, SchemaTypes } from "mongoose";
import { ROLES, STATUS } from "../../utility/constants";
import { IUser } from "./user.types";

class UserTaskSchema extends Schema {
    constructor() {
        super({
            taskId: {
                type: SchemaTypes.ObjectId,
                ref: 'Activity',
                required: true
            },
            certificationUrl: {
                type: String,
                default: null
            },
            certificationDate: {
                type: Date,
                default: null
            },
            status: {
                type: SchemaTypes.ObjectId,
                ref: 'Status',
                default: STATUS.PENDING
            },
        }, { timestamps: true });
    }
};

class SubCycleSchema extends Schema {
    constructor() {
        super({
            from: {
                type: Number,
                required: true
            }, // Initially from of subCycles[0] is the from of cycles[0]
            to: {
                type: Number,
                required: true
            }, // Initially to of subCycles[0] is from + 3 years of subCycles[0]
            tasks: [
                new UserTaskSchema()
            ], // Populate all the tasks from the tasks collection and set defaults to null
        }, { timestamps: true });
    }
};

class CycleSchema extends Schema {
    constructor() {
        super({
            from: {
                type: Number,
                required: true
            }, // Initially from is the createdAt for cycles[0]
            to: {
                type: Number,
                required: true
            }, // Initially to is createdAt + 9 years for cycles[0]
            subCycles: [
                new SubCycleSchema()
            ],// Add 3 subCycles based on the createdAt for each cycle
            isBlocked: {
                type: Boolean,
                default: false
            }
        }, { timestamps: true });
    }
};

class UserSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            role: {
                type: SchemaTypes.ObjectId,
                default: ROLES.USER
            },
            cycles: [new CycleSchema()],
            resetToken: {
                type: String
            },
            resetTokenExpiry: {
                type: Number
            },
        }, { timestamps: true });
    }
};

type UserDocument = Document & IUser;
const UserModel = model<UserDocument>('User', new UserSchema());
export default UserModel;