import { Application, json, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { authorize } from "../../utility/authorization";
import { responseHandler } from "../../utility/response";
import { excludedPath, routes } from "./routes.data";


export const registerRoutes = async (app: Application) => {
    app.use(cors());
    app.use(helmet());
    app.use(json());

    //
    app.use(authorize(excludedPath));

    for (let route of routes) {
        app.use(route.path, route.route)
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.send(new responseHandler(null, err));
    })
}