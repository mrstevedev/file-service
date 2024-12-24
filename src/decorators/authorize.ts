import { Request, Response, NextFunction } from "express";
import { ERROR } from "../constants/index";
import { firebaseAuth } from "../server";

export function Authorize() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const authorizationHeader = req.headers["authorization"];
                if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
                    return res.status(401).json({});
                } else {
                    const token = authorizationHeader.split(" ")[1];
                    const decodedToken = await firebaseAuth.verifyIdToken(token, true);
                    if (!decodedToken) return res.status(401).json({ message: ERROR.UNAUTHORIZED_ACCESS });
                }
            } catch (error: unknown) {
                logging.error(error);
                return res.status(401).json({ error: ERROR.UNAUTHORIZED_ACCESS });
            }
            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
