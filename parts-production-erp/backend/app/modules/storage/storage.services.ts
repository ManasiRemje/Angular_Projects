import storageRepo from "./storage.repo";
import { IStorage } from "./storage.types";


const createStorage = (storage: IStorage) => storageRepo.createStorage(storage);

const getAllStorage = () => storageRepo.getAllStorage();

const getDeletedStorage =()=> storageRepo.getDeletedStorage();

const updateStorage = (storage: IStorage) => storageRepo.updateStorage(storage);

const deleteStorage = (name: string) => storageRepo.deleteStorage(name);

export default {
    createStorage,
    getAllStorage,
    getDeletedStorage,
    updateStorage,
    deleteStorage
}