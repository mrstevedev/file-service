/**
 * Node.js Typescript RESTful API Server
 * @version 1.0.0
 * @author Steven Pulido
 * @license MIT
 * @description RESTful API Server to upload/download files on AWS S3
 */

import http from "http";
import express from "express";
import helmet from "helmet";
import "./logging/logging";
import "reflect-metadata";
import { FIREBASE_CONFIG } from "./config/config";

import { server } from "./config/config";

import { corsHandler } from "./middleware/corsHandler";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { declareHandler } from "./middleware/declareHandlers";
import { fileUploadHandler } from "./middleware/fileUploadHandler";
import { rateLimiterUsingThirdParty } from "./middleware/rateLimiter";
import { defineRoutes } from "./modules/routes";
import { initializeApp } from "firebase-admin/app";

import MainController from "./controllers/main";
import UploadController from "./controllers/upload";
import { getAuth } from "firebase-admin/auth";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = getAuth(firebaseApp);
export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.log("-----------------------------------------------");
    logging.log("Initializing API");
    logging.log("-----------------------------------------------");
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.log("-----------------------------------------------");
    logging.log("Logging & Configuration");
    logging.log("-----------------------------------------------");
    application.use(helmet());
    application.use(corsHandler);
    application.use(declareHandler); // now in every function req will have the declared vars
    application.use(loggingHandler);
    application.use(fileUploadHandler);
    application.use(rateLimiterUsingThirdParty);

    logging.log("-----------------------------------------------");
    logging.log("Define Controller Routing");
    logging.log("-----------------------------------------------");
    defineRoutes([MainController, UploadController], application);

    logging.log("-----------------------------------------------");
    logging.log("Define Controller Routing");
    logging.log("-----------------------------------------------");
    // application.use(routeNotFound);

    logging.log("-----------------------------------------------");
    logging.log("Start Server");
    logging.log("-----------------------------------------------");

    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log("-----------------------------------------------");
        logging.log("Server started:", server.SERVER_HOSTNAME + ":" + server.SERVER_PORT);
        logging.log("-----------------------------------------------");
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
