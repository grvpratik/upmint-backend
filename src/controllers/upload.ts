import { NextFunction, Request, Response } from "express";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client } from "..";

const FILE_SIZE_LIMIT: number = 5 * 1024 * 1024;

const putObjectURL = async (filename: string, content: string) => {
	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET,
		Key: `${filename} `,
		ContentType: content,
	});
	const url = await getSignedUrl(s3Client, command);
	console.log("URL->", url);
	return url;
};
const objectURL = async (key: any) => {
	// const command = new GetObjectCommand({
	// 	Bucket: process.env.AWS_BUCKET,
	// 	Key: key,
	// });
	// console.log("KEY",key)
	// const url = await getSignedUrl(s3Client, command);
	const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}+`;
	console.log(url);
	return url;
};

export const imageUpload = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { fileName, contentType, fileSize } = req.body;
	console.log(fileName, contentType, fileSize);
	if (!fileName) {
		return res.status(400).send({
			success: false,
			message: "Filename is required",
		});
	}
	if (!contentType) {
		return res.status(400).send({
			success: false,
			message: "Content-type is required",
		});
	}
	if (fileSize > FILE_SIZE_LIMIT) {
		return res.status(400).send({
			success: false,
			message: "Exceeded file size limit",
		});
	}

	const url = await putObjectURL(fileName, contentType);

	const publicUrl = await objectURL(fileName);
	// console.log("public url=>", publicUrl);
	return res.status(201).send({
		success: true,
		url: url,
		publicUrl,
	});
};
