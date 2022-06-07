import { IProducts } from "./products.types";
import productsRepo from "./products.repo";

const createProduct = (product: IProducts) => productsRepo.createProduct(product);

const getPrice = (id: string) => productsRepo.getPrice(id);

const getAllProducts = () => productsRepo.getAllProducts();

const getDeletedProducts = () => productsRepo.getDeletedProducts();

const getProductByID = (id: string) => productsRepo.getProductByID(id);

export default {
    createProduct,
    getAllProducts,
    getDeletedProducts,
    getPrice,
    getProductByID
}
