import { Request, Response, NextFunction } from "express";

export function loggingHandler(request: Request, response: Response, next: NextFunction) {
    logging.log(`Incoming - METHOD [${request.method}] - URL [${request.url}] - IP: [${request.socket.remoteAddress}]`);

    // Listener function
    response.on("finish", () => {
        logging.log(
            `Incoming - METHOD [${request.method}] - URL [${request.url}] - IP: [${request.socket.remoteAddress}] - STATUS: ${response.statusCode} `
        );
    });

    // Tells express continue on to the next piece of middleware
    next();
}
