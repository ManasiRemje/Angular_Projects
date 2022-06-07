import rolesRepo from "./roles.repo";
import { IRoles } from "./roles.types";

const createRole = (role: IRoles) => rolesRepo.createRole(role);

const getRole = () => rolesRepo.getRole();

export default {
    createRole,
    getRole
}