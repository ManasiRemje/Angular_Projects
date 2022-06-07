import mongoose from "mongoose";
import PO_DB from "./purchaseOrder.schema";
import { IPO, IPOData } from "./purchaseOrder.types";


const createPO = (po: IPOData) => PO_DB.create(po);

const getAllPurchaseOrders = () => PO_DB.find().
    populate('customerID').
    populate('products').
    populate('products.product').
    populate('storageLocation').
    populate('assignedSalesPerson').
    populate('assignedManifacturer').
    populate('assignedManifacturer.shift.$.furnaceID').
    populate('assignedStorePerson').
    populate('assignedAccountant').
    populate('orderStatus').
    exec();


const updateManifacturer = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: {
            assignedManifacturer: po.assignedManifacturer,
            orderStatus: "62452d4d22167930cb614c1c"
        }
    });

const updateStorePerson = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: {
            storageLocation: po.storageLocation,
            orderStatus: "62452d5a22167930cb614c1e",
            assignedStorePerson: po.assignedStorePerson
        }
    });

const updateAccountant = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: {
            totalPrice: po.totalPrice,
            assignedAccountant: po.assignedAccountant,
            paymentStatus: true
        }
    });

const updateDriver = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: {
            orderStatus: "62452d7622167930cb614c20",
            isDelievered: true,
            assignedDriver: po.assignedDriver
        }
    });

const updateManager = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: { orderStatus: "62452d7d22167930cb614c22" }
    });

const updateApproveOrder = (po: IPO) => PO_DB.updateOne({ _id: po._id },
    {
        $set: { isApprove: true }
    });

const getOrderByStatus = (status: string) => PO_DB.find({ orderStatus: new mongoose.Types.ObjectId(status) }).
    populate('products').
    populate('products.product').
    populate('orderStatus').
    exec();

const getPOByID = (id: string) => PO_DB.findOne({ _id: id }).
    populate('products').
    populate('products.product').
    populate('orderStatus').
    exec();

const getIsApprove = (status: string) => PO_DB.find({ isApprove: status });



export default {
    createPO,
    getPOByID,
    getAllPurchaseOrders,
    updateManifacturer,
    updateStorePerson,
    updateAccountant,
    updateManager,
    updateDriver,
    updateApproveOrder,
    getOrderByStatus,
    getIsApprove
}

