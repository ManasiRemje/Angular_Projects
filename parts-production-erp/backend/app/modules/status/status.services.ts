import statusRepo from "./status.repo";
import { IStatus } from "./status.types";


const createStatus = (status: IStatus) => statusRepo.createStatus(status);

const getStatus = () => statusRepo.getStatus();

export default {
    createStatus,
    getStatus
}