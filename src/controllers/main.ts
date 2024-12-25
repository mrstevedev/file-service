import { MESSAGE } from "../constants";
import { Route } from "../decorators/route";
import { Controller } from "../decorators/controller";
import { Request, Response, NextFunction } from "express";

@Controller()
class MainController {
    @Route("get", "/healthcheck")
    public getHealthCheck(request: Request, response: Response, next: NextFunction) {
        logging.info(MESSAGE.MESSAGE_SUCCESS);
        return response.status(200).json({ message: MESSAGE.MESSAGE_SUCCESS });
    }

    @Route("post", "/healthcheck")
    public postHealthcheck(request: Request, response: Response, next: NextFunction) {
        logging.info(MESSAGE.MESSAGE_SUCCESS);
        return response.status(200).json({ message: MESSAGE.MESSAGE_SUCCESS });
    }
}

export default MainController;
