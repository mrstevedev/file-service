import { Request, Response, NextFunction } from "express";
import { ORIGIN, server } from "../config/config";

export function corsHandler(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Origin", ORIGIN); // or request.header("origin")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Credentials", "true");
    response.header("Access-Control-Allow-Methods", "POST, DELETE, GET, OPTIONS");

    next();
}
