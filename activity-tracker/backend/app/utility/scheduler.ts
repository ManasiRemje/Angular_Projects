import { RecurrenceRule, scheduleJob } from "node-schedule";

import { IActivity } from "../modules/activity/activity.types";
import { IStatus } from "../modules/status/status.types";

import userRepo from "../modules/user/user.repo";
import UserModel from "../modules/user/user.schema";

import { ROLES, STATUS } from "./constants";

export const blockScheduler = () => {
    const rule = new RecurrenceRule();
    rule.year = 1;
    const job = scheduleJob(rule, async () => {
        const year = new Date().getFullYear();

        const users = await UserModel.find({
            "role": ROLES.USER,
            "cycles.isBLocked": false,
            "cycles.to": { $lte: year }
        })
            .populate('cycles.subCycles.tasks.taskId')
            .populate('cycles.subCycles.tasks.status');

        const ids: string[] = [];

        for (const user of users) {
            let areTasksComplete = true;
            const cycleIndex = user.cycles?.findIndex(cycle => cycle.to < year) as number;
            user.cycles?.[cycleIndex].subCycles.forEach(subCycle => {
                subCycle.tasks.forEach(task => {
                    if (!(task.taskId as IActivity).isOptional) {
                        const status = task.status as IStatus;
                        areTasksComplete = status._id?.toString() === STATUS.COMPLETE && areTasksComplete;
                    }
                });
            });
            if (!areTasksComplete) ids.push(user._id.toString());
        }
        await userRepo.blockUsers(ids)
    });
};