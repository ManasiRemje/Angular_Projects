import userRepo from "./user.repo";
import { ICustomer, IUser } from "./user.types";
import { generate } from "generate-password";
import jwt from "jsonwebtoken";
import { createUserID } from "../../../utility/generateCredentials";
import { sendMail } from "../../../utility/sendMail";
import { hash, compare } from "bcryptjs";

const { sign } = jwt;

const createUser = async (user: IUser) => {
    const id = createUserID(user.name);
    const password = generate();
    await sendMail(id, password, user.email);

    // console.log(password);

    const hashedPassword = await hash(password, 10);

    let data = { ...user, ['password']: hashedPassword, ['userID']: id };
    console.log(hashedPassword)



    return await userRepo.createUser(data);
}

const login = async (userID: string, password: string) => {
    try {
        const userData = await userRepo.login(userID);
        console.log(userData);

        if (userData) {
            const didMatch = await compare(password, userData.password);
            console.log(didMatch);
            if (didMatch) {
                const { SECRET_KEY } = process.env;
                if (SECRET_KEY) {
                    const token = sign(userData.toObject(), SECRET_KEY, { expiresIn: '20d' });
                    const { role } = userData;
                    const data = { token, role }
                    return data;
                }
            }
        }
        else {
            throw { message: "user not found" }
        }
    }
    catch (e) {
        throw { message: "user not found" }
    }
}

const getUserData = () => userRepo.getUserData();

const getDeletedUserData = () => userRepo.getDeletedUserData();

const createCustomer = (customer: ICustomer) => userRepo.createCustomer(customer);

const updateUser = (user: IUser) => userRepo.updateUser(user);

const deleteUser = (userID: string) => userRepo.deleteUser(userID);

const getCustomers = () => userRepo.allCustomers();

export default {
    createUser,
    login,
    getUserData,
    createCustomer,
    updateUser,
    deleteUser,
    getDeletedUserData,
    getCustomers
}
