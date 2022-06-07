export interface IUser{
    data: Array<IUserData> | any;
}

export interface IUserData{
    _id:string;
    name:string;
    email:string;
    configuration: IConfig;
}

export interface IConfig{
    currentCabinetSize:number;
    maxFileSize:number;
    maxFileCount:number;
    _id:string;
}

export interface IPopup{
    data: Array<IUserData> | any;
}

export interface IPopupData{
    _id:string;
    name:string;
    email:string;
    configuration: IConfigPopup;
    request: IChange
}

export interface IConfigPopup{
    currentCabinetSize:number;
    maxFileSize:number;
    maxFileCount:number;
    currentFileCount:number;
    _id:string;
}

export interface IChange{
    changeConfigTo: IChangeConfigTo;
    status:string;
}

export interface IChangeConfigTo{
    maxFileSize: number;
    maxFileCount:number;
    _id:string;
}