import { NextFunction, Request, Response } from "express";
const multer = require("multer");
const upload = multer();

export function fileUploadHandler(request: Request, response: Response, next: NextFunction) {
    upload.single("file")(request, response, function (err: any) {
        if (err instanceof multer.MulterError) {
            return response.status(500).json({ error: err.message });
        } else if (err) {
            return response.status(500).json({ error: err.message });
        }
    });
    next();
}
