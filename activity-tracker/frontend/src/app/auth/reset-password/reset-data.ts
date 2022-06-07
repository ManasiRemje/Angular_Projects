export interface IReset {
    resetToken: string,
    password: string,
    confirmPassword: string
}

export interface IResetResponse{
    data: IResetData,
}

export interface IResetData{
    message:string,
}