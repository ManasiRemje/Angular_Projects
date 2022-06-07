import { IProducts } from "../products/products.types";

export interface IPOProduct {
    _id?: string,
    product: IProducts,
    quantity: number,
    dimensions: string
}

export interface IPOData {
    customerID: string
    products: {
        product: string,
        quantity: number,
        dimensions: string
    }[],
    assignedSalesPerson?: string,
    totalPrice?: number
}

export interface IPO {
    _id?: string,
    customerID: string,
    products: IPOProduct[],
    orderStatus: string,
    totalPrice: number,
    isApprove: boolean,
    paymentStatus: string,
    storageLocation: string,
    isDelievered: boolean,
    assignedSalesPerson: string,
    assignedManifacturer: string,
    assignedStorePerson: string,
    assignedAccountant: string,
    assignedDriver: string
}

