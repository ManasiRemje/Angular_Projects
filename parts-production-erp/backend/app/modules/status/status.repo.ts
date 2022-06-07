import statusDB from "./status.schema";
import { IStatus } from "./status.types";

const createStatus = (status: IStatus) => statusDB.create(status);

const getStatus = () => statusDB.find();

export default {
    createStatus,
    getStatus
}