import { IActivity } from "../activity/activity.types"
import { IStatus } from "../status/status.types"

export interface ICredentials {
    email: string,
    password: string,
};

export interface IUserTask {
    certificationUrl: string | null,
    certificationDate: Date | null,
    taskId: string | IActivity,
    status: string | IStatus,
    createdAt?: Date,
    updatedAt?: Date
};

export interface ISubCycle {
    _id?: string,
    from: number,
    to: number,
    tasks: IUserTask[],
    createdAt?: Date,
    updatedAt?: Date
};

export interface ICycle {
    _id?: string,
    from: number,
    to: number,
    subCycles: ISubCycle[],
    isBlocked: boolean,
    createdAt?: Date,
    updatedAt?: Date
};

export interface IUser {
    _id?: string
    name: string,
    email: string,
    password: string,
    role?: string,
    cycles?: ICycle[],
    resetToken?: string | null,
    resetTokenExpiry?: number | null,
    createdAt?: Date,
    updatedAt?: Date
};

export interface IFilters {
    page?: number,
    itemsPerPage?: number,
    year?: number
};