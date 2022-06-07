import furnaseRepo from "./furnace.repo"
import { IFurnace } from "./furnace.types";



const createFurnace = (furnace: IFurnace) => furnaseRepo.createFurnace(furnace);

const getFurnise = () => furnaseRepo.getFurnace();

const getDeletedFurnace = () => furnaseRepo.getDeletedFurnace();

const updateFurnace = (furnace: IFurnace) => furnaseRepo.updateFurnace(furnace);

const deleteFurnace = (name: string) => furnaseRepo.deleteFurnace(name);

export default {
    createFurnace,
    getFurnise,
    getDeletedFurnace,
    updateFurnace,
    deleteFurnace
}