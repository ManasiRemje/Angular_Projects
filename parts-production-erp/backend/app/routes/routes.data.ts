import { IAuth, Route } from "./routes.types";
import userRouter from "../modules/user/user.routes";
import productRouter from "../modules/products/products.routes";
import purchaseOrderRouter from "../modules/purchaseOrder/purchaseOrder.routes";
import furnaceRouter from "../modules/furnase/furnace.routes";
import storageRouter from "../modules/storage/storage.routes";
import roleRouter from "../modules/roles/roles.routes";
import statusRouter from "../modules/status/status.routes";


export const routes: Route[] = [
    new Route("/user", userRouter),
    new Route("/product", productRouter),
    new Route("/purchase-order", purchaseOrderRouter),
    new Route("/furnace", furnaceRouter),
    new Route("/storage", storageRouter),
    new Route("/role", roleRouter),
    new Route("/status", statusRouter)
]

export const excludedPath: IAuth[] = [
    { method: "POST", path: "/user/login" }
]