import { join } from "path";
import { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API || '');

import userRepo from "./user.repo";
import { ICredentials, ICycle, IFilters, IUser, IUserTask } from "./user.types";
import activityService from "../activity/activity.service";
import { ROLES, STATUS } from "../../utility/constants";
import { createDirectory } from "../../utility/fileOps";
import { IActivity } from "../activity/activity.types";
import { IStatus } from "../status/status.types";

const createNewCycle = async () => {

    const todaysYear = new Date().getFullYear();
    const cycleEndYear = todaysYear + 8;

    const activities = await activityService.fetchAll();

    const subCycleActivities: { subCycle1: IUserTask[], subCycle2: IUserTask[], subCycle3: IUserTask[] } = { subCycle1: [], subCycle2: [], subCycle3: [] }

    const subCycleActivitiesData = activities.reduce((subCycleActivities, currentActivity) => {
        switch (currentActivity.subCycleNumber) {
            case 1:
                subCycleActivities.subCycle1.push({
                    taskId: currentActivity._id,
                    certificationDate: null,
                    certificationUrl: null,
                    status: STATUS.PENDING,
                });
                break;
            case 2:
                subCycleActivities.subCycle2.push({
                    taskId: currentActivity._id,
                    certificationDate: null,
                    certificationUrl: null,
                    status: STATUS.PENDING,
                });
                break;
            case 3:
                subCycleActivities.subCycle3.push({
                    taskId: currentActivity._id,
                    certificationDate: null,
                    certificationUrl: null,
                    status: STATUS.PENDING,
                });
                break;
            default: ;
        }
        return subCycleActivities;
    }, subCycleActivities);

    const cycle: ICycle = {
        from: todaysYear,
        to: cycleEndYear,
        isBlocked: false,
        subCycles: [
            {
                from: todaysYear,
                to: todaysYear + 2,
                tasks: subCycleActivitiesData.subCycle1
            },
            {
                from: todaysYear + 3,
                to: todaysYear + 5,
                tasks: subCycleActivitiesData.subCycle2
            },
            {
                from: todaysYear + 6,
                to: cycleEndYear,
                tasks: subCycleActivitiesData.subCycle3
            }
        ],
    };

    return cycle;
};

const register = async (user: IUser) => {
    const { email, password } = user;
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw { statusCode: 421, message: 'User already exists' };

    const hashedPassword = await hash(password, 12);

    const todaysYear = new Date().getFullYear();
    const cycleEndYear = todaysYear + 8;

    const userData: IUser = {
        ...user,
        password: hashedPassword,
        cycles: [await createNewCycle()]
    };

    const result = await userRepo.create(userData);

    createDirectory(join('files', result._id.toString()));

    return { _id: result?._id, message: "User registered successfully" };
};

const authenticate = async (credentials: ICredentials) => {
    const { email, password } = credentials;
    const user = await userRepo.findByEmail(email);
    if (!user) throw { statusCode: 421, message: 'User does not exists' };

    if (user.role?.toString() === ROLES.USER &&
        user.cycles?.[user.cycles?.length - 1].isBlocked) throw { statusCode: 400, message: "Your account has been blocked" };

    const doMatch = await compare(password, user.password);
    if (!doMatch) throw { statusCode: 421, message: 'Invalid password' };

    const tokenData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
    };

    const token = sign(tokenData, process.env.JWT_SECRET || '', { expiresIn: '24h' });
    return { token, userId: user._id, role: user.role, name: user.name, tokenExpiry: Date.now() + (1000 * 60 * 60 * 24) };
};

const getResetPassword = async (email: string) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw { statusCode: 421, message: 'User does not exists' };
    if (
        user.resetToken &&
        user.resetTokenExpiry &&
        Date.now() <= user.resetTokenExpiry
    ) throw { statusCode: 400, message: 'An email with the reset link has already been sent to the registered email. Kindly check your inbox' };

    user.resetToken = randomBytes(32).toString('hex');
    user.resetTokenExpiry = Date.now() + (1000 * 60 * 60);

    const result = await user.save();
    if (result._id && result.resetToken) {
        await sgMail.send({
            to: user.email,
            from: 'manish.sawlani@coditas.com',
            subject: 'Password Reset',
            html: `<html>
                <body>
                    <p>Please <a href="http://localhost:4200/auth/reset-password/${result.resetToken}">click here</a> to reset your password.</p>
                </body>
            </html>`
        });
        return { _id: result._id, message: "Email sent!" };
    }
    throw { statusCode: 500, message: 'Something went wrong!' };
};

const postResetPassword = async (resetToken: string, password: string) => {
    const user = await userRepo.findByToken(resetToken);
    if (
        !user ||
        user.resetToken && (resetToken !== user.resetToken) ||
        user.resetTokenExpiry && (Date.now() >= user.resetTokenExpiry)
    ) throw { statusCode: 400, message: 'Reset token invalid' };

    user.password = await hash(password, 12);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    const result = await user.save();
    if (result._id) {
        await sgMail.send({
            to: user.email,
            from: 'manish.sawlani@coditas.com',
            subject: 'Attention: Password Reset',
            text: `Your password has successfully been reset.`,
        });
        return { _id: result._id, message: "Password reset successful!" };
    }
    throw { statusCode: 500, message: 'Something went wrong!' };
};

const getUserCycleData = async (userId: string) => {
    const user = await userRepo.getUserCycleData(userId);
    if (!user) throw { statusCode: 404, message: "User not found" };

    let areTasksComplete = true;
    user.cycles?.[user.cycles?.length - 1].subCycles.forEach(subCycle => {
        subCycle.tasks.forEach(task => {
            if (!(task.taskId as IActivity).isOptional) {
                const status = task.status as IStatus;
                areTasksComplete = status._id?.toString() === STATUS.COMPLETE && areTasksComplete;
            }
        });
    });

    return { ...user?.toObject(), areAllTasksComplete: areTasksComplete };
};

const postActivity = async (userId: string, certificate: Express.Multer.File, data: { certificationDate: Date, cycle: string, subCycle: string, task: string }) => {
    if (!certificate) throw { statusCode: 421, message: 'Please upload a file' };

    const user = await userRepo.findById(userId);

    const cycle = user?.cycles?.find(cycle => cycle?._id?.toString() === data.cycle);
    if (cycle?.isBlocked) throw { statusCode: 400, message: 'User blocked in current cycle' };

    const subCycle = cycle?.subCycles.find(subCycle => subCycle?._id?.toString() === data.subCycle);

    const activity = subCycle?.tasks.find(task => (task.taskId as IActivity)._id?.toString() === data.task);
    if (!activity) throw { statusCode: 400, message: 'Invalid details' };


    if (activity.status.toString() === STATUS.COMPLETE) throw { statusCode: 400, message: 'Task already submitted' };

    const filePath = certificate.path.split('\\').join('/');
    const task: IUserTask = {
        certificationUrl: filePath,
        certificationDate: data.certificationDate,
        taskId: data.task,
        status: STATUS.COMPLETE
    };

    const result = await userRepo.postActivity(userId, task);
    if (!result.modifiedCount) throw { statusCode: 500, message: 'Something went wrong' };
    return { _id: userId, message: "Task updated" };
};

const createCycle = async (userId: string) => {
    const user = await userRepo.findById(userId);
    if (!user) throw { statusCode: 404, message: "User not found" };

    if (user.cycles?.[user.cycles?.length - 1].isBlocked)
        throw { statusCode: 400, message: "User blocked in previous cycle" };

    if ((user.cycles?.[user.cycles?.length - 1].to as number) + 1 !== new Date().getFullYear()) {
        const newCycleYear = (user.cycles?.[user.cycles?.length - 1].to as number) + 1
        throw { statusCode: 400, message: "Try creating cycle in " + newCycleYear };
    }

    let areTasksComplete = true;
    user.cycles?.[user.cycles?.length - 1].subCycles.forEach(subCycle => {
        subCycle.tasks.forEach(task => {
            if (!(task.taskId as IActivity).isOptional) {
                const status = task.status as String;
                areTasksComplete = status.toString() === STATUS.COMPLETE && areTasksComplete;
            }
        });
    });

    if (!areTasksComplete) throw { statusCode: 400, message: "User tasks are not completed" };

    user.cycles?.push(await createNewCycle());
    user.save();
    return { _id: user._id, message: 'New cycle created' }
};

const getUsers = async (filters: IFilters) => {
    const users = await userRepo.getUsers(filters);

    const result = [];

    for (const user of users) {
        let status = "";
        let cycleIndex = (user?.cycles?.length as number) - 1;
        if (!filters.year) throw { statusCode: 400, message: 'Please provide year' };

        const searchYear = +filters.year as number;

        if (searchYear > new Date().getFullYear()) throw { statusCode: 400, message: 'Please enter year less than or equal to the currrent year' };

        const cycles = user?.
            cycles?.filter(cycle =>
                (cycle.from <= searchYear && cycle.to >= searchYear) ||
                cycle.to <= searchYear
            );

        cycleIndex = (cycles?.length as number) - 1;

        let areTasksComplete = true;

        const filteredTasks = [];
        user.cycles?.[cycleIndex].subCycles.forEach(subCycle => {
            subCycle.tasks.forEach(task => {
                if (!(task.taskId as IActivity).isOptional) {
                    const status = task.status as IStatus;
                    if ((task.updatedAt as Date).getFullYear() <= searchYear &&
                        status._id?.toString() === STATUS.COMPLETE) {
                        filteredTasks.push(task);
                    }
                }
                areTasksComplete = filteredTasks.length >= 25
            });
        });

        if (user.cycles?.[cycleIndex].isBlocked) {
            status = 'Blocked';
        }
        else {
            status = areTasksComplete ? 'Complete' : 'Pending';
        }

        result.push({ _id: user?._id, name: user?.name, status: status, cycleId: user?.cycles?.[cycleIndex]._id, });
    }
    return { users: result, userCount: await userRepo.getUserCount() };
};

const block = async (cycleId: string) => {
    const result = await userRepo.setBlocked(cycleId, true);
    const user = await userRepo.findById(result?._id);
    if (result?._id) {
        await sgMail.send({
            to: user?.email,
            from: 'manish.sawlani@coditas.com',
            subject: 'Account Blocked',
            text: `You have been blocked for the current cycle by your admin`
        });
        return { _id: result?._id, message: "User blocked" };
    }
};

const unblock = async (cycleId: string) => {
    const result = await userRepo.setBlocked(cycleId, false);
    const user = await userRepo.findById(result?._id);
    if (result?._id) {
        await sgMail.send({
            to: user?.email,
            from: 'manish.sawlani@coditas.com',
            subject: 'Account Unblocked',
            text: `You have been unblocked for the current cycle by your admin`
        });
        return { _id: result?._id, message: "User unblocked" };
    }
};

export default {
    register,
    authenticate,
    getResetPassword,
    postResetPassword,
    getUserCycleData,
    postActivity,
    createCycle,
    getUsers,
    block,
    unblock
};