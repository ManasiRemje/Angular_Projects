import { Router } from "express";


export class Route {
    constructor(
        public path: any = path,
        public route: Router = route
    ) { }
}


export interface IAuth {
    path: string
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"
}
