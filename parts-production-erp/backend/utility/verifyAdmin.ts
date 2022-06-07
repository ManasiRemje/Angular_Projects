import { generate } from "generate-password";
import shortid from "shortid";
import userDB from "../app/modules/user/user.schema";
import { ObjectId } from "mongodb";
import { ROLES } from "./dbConstant";
import { sendMail } from "./sendMail";
import { createUserID } from "./generateCredentials";
import { hash } from "bcryptjs";
export const verifyAdmin = async () => {
    try {
        const result = await userDB.findOne({ userRole: 'admin' })
        if (!result) {
            const userData = {
                userID: createUserID('chinmay'),
                password: generate(),
                role: ROLES.ADMIN,
                name: 'chinmay',
                email: 'chinmayshikhare73@gmail.com'
            }
            await sendMail(userData.userID, userData.password, userData.email);
            const hashedPassword = await hash(userData.password, 10);
            const data = { ...userData, ['password']: hashedPassword };
            await userDB.create(data);
            console.log("Created First Admin/Manager");
        }
        else {
            console.log(`Admin/Manager Already present`)
        }
    }
    catch (e) {
        console.log(e);
    }
}