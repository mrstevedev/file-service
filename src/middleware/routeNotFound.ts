import { NextFunction, Request, Response } from "express";
import { ERROR } from "../constants";

export function routeNotFound(request: Request, response: Response, next: NextFunction) {
    const error = new Error(ERROR.ROUTE_NOT_FOUND);
    if (error) {
        logging.error(error);
        response.status(404).json({ error: error.message });
    }
    next();
}
