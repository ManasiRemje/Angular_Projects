import { Types } from "mongoose";

import UserModel from "./user.schema";
import { IFilters, IUser, IUserTask } from "./user.types";

import { ROLES } from "../../utility/constants";

const create = (user: IUser) => UserModel.create(user);

const findByEmail = (email: string) => UserModel.findOne({ email: email });

const findById = (id: string) => UserModel.findById(id).populate("cycles.subCycles.tasks.taskId");

const findByToken = (token: string) => UserModel.findOne({ resetToken: token });

const getUserCycleData = (userId: string) => UserModel.findById(userId)
    .populate("cycles.subCycles.tasks.taskId")
    .populate("cycles.subCycles.tasks.status")
    .select("name cycles");

const postActivity = (userId: string, task: IUserTask) => UserModel.updateOne(
    {
        _id: userId,
    },
    {
        $set: {
            "cycles.$[].subCycles.$[].tasks.$[t].certificationUrl": task.certificationUrl,
            "cycles.$[].subCycles.$[].tasks.$[t].certificationDate": task.certificationDate,
            "cycles.$[].subCycles.$[].tasks.$[t].status": task.status
        }
    },
    { arrayFilters: [{ "t.taskId": task.taskId }] }
);

const blockUsers = async (ids: string[]) => {
    const year = new Date().getFullYear();
    const result = await UserModel.updateMany({
        "_id": { $in: ids },
        "role": ROLES.USER,
        "cycles.isBLocked": false,
        "cycles.to": { $lte: year }
    }, {
        $set: {
            "cycles.$.isBlocked": true
        }
    });
};

const getUsers = ({ page, itemsPerPage, year }: IFilters) => {
    let query = UserModel.find({ role: ROLES.USER });

    if (year) {
        query = UserModel.find({
            role: ROLES.USER,
            $or: [
                {
                    $and: [

                        { "cycles.from": { $lte: +year } },
                        { "cycles.to": { $gte: +year } }
                    ]
                },
                { "cycles.to": { $lte: +year } }
            ]
        });
    }

    query.populate("cycles.subCycles.tasks.status").populate("cycles.subCycles.tasks.taskId").select({
        "name": 1,
        "cycles": 1
    });

    if (page && itemsPerPage) {
        query.skip((+page - 1) * +itemsPerPage).limit(+itemsPerPage)
    }

    return query;
};

const setBlocked = (cycleId: string, isBlocked: boolean) => UserModel.findOneAndUpdate({
    "cycles._id": cycleId
}, {
    $set: {
        "cycles.$.isBlocked": isBlocked
    }
});

const getUserCount = () => UserModel.count({ role: ROLES.USER });

export default {
    create,
    findByEmail,
    findById,
    findByToken,
    getUserCycleData,
    postActivity,
    blockUsers,
    getUsers,
    setBlocked,
    getUserCount
};