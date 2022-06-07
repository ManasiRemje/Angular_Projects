import mongoose from "mongoose";
import productDB from "./products.schema";
import { IProducts } from "./products.types";

const createProduct = (product: IProducts) => productDB.create(product);

const getAllProducts = () => productDB.find({ isDeleted: false });

const getDeletedProducts = () => productDB.find({ isDeleted: true });

const getPrice = async (id: string) => {
    let ID = new mongoose.Types.ObjectId(id);
    return await productDB.findOne({ _id: ID });
}

const getProductByID = (id: string) => productDB.findOne({ _id: id });

export default {
    createProduct,
    getAllProducts,
    getDeletedProducts,
    getPrice,
    getProductByID
}