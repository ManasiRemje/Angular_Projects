export interface IUser {
    _id?: string,
    userID: string,
    name: string,
    role: string
    email: string,
    password: string,
    shift: { time: string, furnaceID: string }
}


export interface ICustomer {
    _id?: string,
    name: string,
    phoneNumber: string
}