import { hash } from "bcryptjs";
import { Model } from "mongoose";

import RoleModel from "../modules/role/role.schema";
import UserModel from '../modules/user/user.schema';
import StatusModel from '../modules/status/status.schema';
import ActivityModel from '../modules/activity/activity.schema';

import { IUser } from "../modules/user/user.types";

import { ROLES } from "./constants";
import { activities, roles, status } from "./data";
import { blockScheduler } from "./scheduler";

const modelData = [
    { model: RoleModel, data: roles },
    { model: StatusModel, data: status },
    { model: ActivityModel, data: activities },
];

const populate = async (model: Model<any>, data: any) => {
    const result = await model.find();
    if (result.length) return;
    model.insertMany(data);
};

const createAdmin = async () => {
    const admins = await UserModel.find({ role: ROLES.ADMIN });
    if (admins.length) return;
    const hashedPassword = await hash('123456', 12);
    const admin: IUser = {
        email: 'manish.sawlani@coditas.com',
        name: 'Manish Sawlani',
        password: hashedPassword,
        role: ROLES.ADMIN
    };
    await UserModel.create(admin);
};

const initDB = async () => {
    try {
        for await (const model of modelData) {
            await populate(model.model, model.data); // Uncomment when role data is entered
        }
        await createAdmin(); // Uncomment after adding constants data file
        blockScheduler();
        console.log('Database initialized');
    } catch (error) {
        throw error;
    }
};

export default initDB;