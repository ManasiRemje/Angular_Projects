export interface IUserResponse{
    data: IUser;
}

export interface IUser{
    _id:string;
    name:string;
    cycles: Array<ICycles>;
}

export interface ICycles{
    isBlocked:boolean;
    to: number;
    subCycles: Array<ISubCycles>;
    _id:string
}

export interface ISubCycles{
    from:number;
    to:number;
    tasks: Array<ITasks>;
    _id:string
}

export interface ITasks{
    status: IStatus;
    taskId: ITaskId;
}

export interface IStatus{
    title: string;
}

export interface ITaskId{
    category: string;
    isOptional: boolean;
    title: string;
    _id: string;
}

export interface IPostResponse{
    data: IPost;
    error: string;
}

export interface IPost{
    _id:string;
    message: string;
}