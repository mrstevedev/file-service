import { NextFunction, Request, Response } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import { UploadFileS3 } from "../decorators/upload";
import { MESSAGE } from "../constants";
import { Authorize } from "../decorators/authorize";

@Controller("/api")
export class UploadController {
    @Route("post", "/upload-file")
    @Authorize()
    @UploadFileS3()
    public uploadFileToS3(request: Request, response: Response, next: NextFunction) {
        logging.info(MESSAGE.MESSAGE_UPLOADED_SUCCESSFULLY);
        return response.status(200).json({ url: request.generateAndUploadFileToS3 });
    }
}

export default UploadController;
