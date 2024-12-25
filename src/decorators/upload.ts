import { Request, Response, NextFunction } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ERROR, MESSAGE } from "../constants";

export function UploadFileS3() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        // Only for express middleware
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            if (!req.file) return res.status(404).json({ message: MESSAGE.MESSAGE_NO_FILE_FOUND });
            try {
                const s3Params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: req.file?.originalname
                };

                // 1. Generate Presigned Upload URL.
                const client = new S3Client({ region: process.env.AWS_S3_REGION });
                const command = new PutObjectCommand(s3Params);

                const preSignedUrl = await getSignedUrl(client, command, { expiresIn: 360 });

                // 2. Upload File to AWS S3 Bucket.
                const response = await fetch(preSignedUrl, { method: "PUT", body: req.file?.buffer });

                if (response.status !== 200) throw new Error(ERROR.FILE_UPLOAD_FAILED);

                req.generateAndUploadFileToS3 = MESSAGE.MESSAGE_UPLOADED_SUCCESSFULLY;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
