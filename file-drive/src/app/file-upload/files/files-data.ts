export interface IFiles{
    data: { message : string } | Array<IData> | any;
}

export interface IData{
    id:string;
    fileName:string;
    fileType:string;
}

export interface IDelete{
    fileName:string;
    folderName:string;
}