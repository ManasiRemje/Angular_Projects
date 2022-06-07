export interface ILogin {
    email: string,
    password: string
}

export interface ILoginResponse {
    data: IData
}

export interface IData {
    token: string,
    Role: string,
}

