import { NextFunction, Request, Response } from "express";
import { ERROR } from "../constants";

export function routeNotFound(request: Request, response: Response, next: NextFunction) {
    response.status(404);
    logging.error(ERROR.ROUTE_NOT_FOUND);
    next();
}
