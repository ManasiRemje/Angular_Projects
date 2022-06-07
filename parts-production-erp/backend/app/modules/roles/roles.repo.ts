import roleDB from "./roles.schema";
import { IRoles } from "./roles.types";

const createRole = (role: IRoles) => roleDB.create(role);

const getRole = () => roleDB.find();

export default {
    createRole,
    getRole
}
