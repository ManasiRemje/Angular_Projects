import { IExclude, Route } from "./routes.types";

import UserRouter from "../modules/user/user.routes";

export const routes: Route[] = [
    new Route('/user', UserRouter)
];

export const excludedPaths: IExclude[] = [
    { path: '/user/register', method: 'POST' },
    { path: '/user/login', method: 'POST' },
    { path: '/user/reset-password', method: 'POST' },
    { path: '/user/new-password', method: 'POST' },
];