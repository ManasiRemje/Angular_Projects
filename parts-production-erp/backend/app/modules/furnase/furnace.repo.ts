import furnaceDB from "./furnace.schema";
import { IFurnace } from "./furnace.types";

const createFurnace = (furnace: IFurnace) => furnaceDB.create(furnace);

const getFurnace = () => furnaceDB.find({ isDeleted: false });

const getDeletedFurnace = () => furnaceDB.find({ isDeleted: true });

const updateFurnace = (furnace: IFurnace) => furnaceDB.updateOne({ _id: furnace._id }, furnace);

const deleteFurnace = (name: string) => furnaceDB.updateOne({ name: name }, { isDeleted: true });

export default {
    createFurnace,
    getFurnace,
    getDeletedFurnace,
    updateFurnace,
    deleteFurnace
}