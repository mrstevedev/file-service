import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            generateAndUploadFileToS3: string | undefined;
        }
    }
}

export function declareHandler(request: Request, response: Response, next: NextFunction) {
    /**
     * Must set these to undefined or
     * get errors if they are used in other functions
     */
    request.generateAndUploadFileToS3 = undefined;

    next();
}
