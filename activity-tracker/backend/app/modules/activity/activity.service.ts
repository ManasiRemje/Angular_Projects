import activityRepo from "./activity.repo";

const fetchAll = () => activityRepo.find();

export default {
    fetchAll
};