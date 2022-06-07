export interface IFilter{
    status:string
}

export interface IApprove{
    _id:string;
    status:string;
}

export interface IRequest{
    data: Array<IRequestData>;
}

export interface IRequestData{
    _id:string;
    name:string;
    email:string;
    request: IChangeConfigTo;
    
}

export interface IChangeConfigTo{
        changeConfigTo: IConfigRequest;
        status:string;
}

export interface IConfigRequest{
    maxFileSize:number;
    maxFileCount:number;
    _id:string;
}