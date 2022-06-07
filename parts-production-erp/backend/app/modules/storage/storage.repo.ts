import storageDB from "./storage.schema";
import { IStorage } from "./storage.types";

const createStorage = (storage: IStorage) => storageDB.create(storage);

const getAllStorage = () => storageDB.find({ isDeleted: false });

const getDeletedStorage = () => storageDB.find({ isDeleted: true });

const updateStorage = (storage: IStorage) => storageDB.updateOne({ _id: storage._id }, storage);

const deleteStorage = (name: string) => storageDB.updateOne({ name: name }, { isDeleted: true });

export default {
    createStorage,
    getAllStorage,
    getDeletedStorage,
    updateStorage,
    deleteStorage
}