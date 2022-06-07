export interface IData{
    data: IReceivedUsers;
}

export interface IReceivedUsers{
    users: Array<IUsers>;
}

export interface IUsers{
    _id:string;
    name:string;
    status:string;
    cycleId:string;
}