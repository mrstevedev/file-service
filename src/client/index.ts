require("dotenv").config();

export const aws_s3_bucket = process.env.AWS_S3_BUCKET;
export const aws_s3_region = process.env.AWS_S3_REGION;
export const aws_s3_access_key = process.env.AWS_S3_ACCESS_KEY;
export const aws_s3_secret_key = process.env.AWS_S3_SECRET_KEY;

// Get list of access keys from CLI
// aws iam list-access-keys --user [Username]
