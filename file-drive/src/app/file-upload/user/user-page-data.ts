export interface IFolder {
    folderName: string;
}

export interface IFile{
    folder: string;
    fileName: string;
}

export interface IConfig{
    currentStorageSize: number;
    currentNoOfFiles: number;
    storageSizeLimit: number;
    noOfFilesLimit: number;
}

export interface ISettings{
    storageSizeLimit: number;
    noOfFilesLimit: number;
    currentStorageSize: number;
    currentNoOfFiles: number;
}

export interface IRequest{
    data: Array<IStatus>;
}

export interface IStatus{
    _id: string;
    request: IChange;   
}

export interface IChange{
    changeConfigTo: IChangeConfigTo;
    status: string;
}

export interface IChangeConfigTo{
    maxFileCount:number;
    maxFileSize:number;
    _id:string;
}


export interface ISettingsConfig{
    data: Array<IGetCofig>;
}

export interface IGetCofig{
    _id:string;
    configuration: IConfiguration;
}

export interface IConfiguration{
    maxFileCount:number;
    maxFileSize:number;
    currentFileCount:number;
    currentCabinetSize:number;
    id:string;
}