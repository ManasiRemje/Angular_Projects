import customerDB from "../customer/customer.schema";
import userDB from "./user.schema";
import { ICustomer, IUser } from "./user.types";

const createUser = (user: IUser) => userDB.create(user);

const login = (userID: string) => userDB.findOne({ userID: userID});

const getUserData = () => userDB.find({ isDeleted: false }).populate('role').exec();

const getDeletedUserData = () => userDB.find({ isDeleted: true });

const createCustomer = (customer: ICustomer) => customerDB.create(customer);

const allCustomers = () => customerDB.find();

const updateUser = (user: IUser) => userDB.updateOne({ userID: user.userID }, user);

const deleteUser = (userID: string) => userDB.updateOne({ userID: userID }, { isDeleted: true });

export default {
    createUser,
    login,
    getUserData,
    createCustomer,
    updateUser,
    deleteUser,
    getDeletedUserData,
    allCustomers
}