import { IPO, IPOProduct, IPOData } from "./purchaseOrder.types";
import PORepo from "./purchaseOrder.repo";
import productsRepo from "../products/products.repo";
import productDB from "../products/products.schema";

const createPO = async (po: IPOData) => {
    let totalPrice: number = 0;
    const { products } = po;
    let sum = 0;

    for await (const product of products) {
        // not ideal
        const productData = await productsRepo.getProductByID(product.product);
        if (productData)
            sum += productData.price * product.quantity;
    }

    let gst: number = ((18 / 100) * sum);
    totalPrice = gst + sum;
    console.log(totalPrice);
    const data = { ...po, ['totalPrice']: totalPrice };
    return PORepo.createPO(data);
}

const getAllPurchaseOrders = () => PORepo.getAllPurchaseOrders();

const updateManifacturer = (po: IPO, _id: Object) => {
    po.assignedManifacturer = _id.toString();
    return PORepo.updateManifacturer(po);
}

const updateStorePerson = (po: IPO, _id: Object) => {
    po.assignedStorePerson = _id.toString();
    return PORepo.updateStorePerson(po);
}

const updateDriver = (po: IPO, _id: Object) => {
    po.assignedDriver = _id.toString();
    return PORepo.updateDriver(po);
}

const updateAccountant = async (po: IPO, _id: Object) => {
    if (po._id && po) {
        const alldata = await PORepo.getPOByID(po._id);
        if (alldata) {
            const { products } = alldata;
            const sum = products.reduce((sum: number, product: IPOProduct) => {
                sum += product.product.price * product.quantity;
                return sum;
            }, 0);
            let gst: number = ((18 / 100) * sum);
            po.totalPrice = gst + sum;
            console.log(po.totalPrice);
        }
    }
    po.assignedAccountant = _id.toString();
    return await PORepo.updateAccountant(po);
}


const updateManager = (po: IPO) => PORepo.updateManager(po);

const updateApproveOrder = (po: IPO) => PORepo.updateApproveOrder(po);

const getIsApprove = (status: string) => PORepo.getIsApprove(status);

const getOrderByStatus = (status: string) => PORepo.getOrderByStatus(status);

export default {
    createPO,
    getAllPurchaseOrders,
    updateManifacturer,
    updateStorePerson,
    updateAccountant,
    updateManager,
    updateDriver,
    updateApproveOrder,
    getIsApprove,
    getOrderByStatus
}

