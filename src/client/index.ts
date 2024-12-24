require("dotenv").config();

export const aws_s3_bucket = "user-service-s3-bucket";
export const aws_s3_region = "us-west-1";
export const aws_s3_access_key = process.env.AWS_S3_ACCESS_KEY;
export const aws_s3_secret_key = process.env.AWS_S3_SECRET_KEY;

// Get list of access keys from CLI
// aws iam list-access-keys --user [Username]
