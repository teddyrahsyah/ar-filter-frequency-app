import S3 from "aws-sdk/clients/s3.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// Uploads a file to S3 Bucket
export function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);
	const uploadParams = {
		Body: fileStream,
		Bucket: bucketName,
		Key: file.originalname,
		ContentType: file.mimetype,
	};

	return s3.upload(uploadParams).promise();
}
