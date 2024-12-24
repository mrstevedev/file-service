import { Request, Response, NextFunction } from "express";

export function corsHandler(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Origin", "http://localhost:3000"); // or https://localhost:8082/
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Credentials", "true");

    /**
     * An OPTIONS request is an HTTP method that is used to retrieve
     * information about the communication options available for a resource
     * on a web server. When a client sends an OPTIONS request,
     * the server responds with a list of HTTP methods which are supported by the resource,
     * as well as any additional headers that can be used with those methods.
     */

    if (request.method === "OPTIONS") {
        response.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        response.status(204).json({});
    }

    // Tells express continue on to the next piece of middleware
    next();
}
