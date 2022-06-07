export interface IResetRequest {
    email: string;
}

export interface IRequestResponse{
    data: IRequestData,
}

export interface IRequestData{
    message:string,
}