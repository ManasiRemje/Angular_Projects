export interface ILogin {
    data: IData;
}

export interface IData {
    token: string,
    Role: string,
}

export interface ISendData {
    email: string,
    password: string
}