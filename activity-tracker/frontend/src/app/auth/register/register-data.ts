export interface IRegister{
    name: string,
    email: string,
    password: string
}

export interface IRegisterResponse{
    data: IRegisterData,
}

export interface IRegisterData{
    message:string,
}