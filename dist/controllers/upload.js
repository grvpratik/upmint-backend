"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const __1 = require("..");
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const putObjectURL = (filename, content) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `${filename} `,
        ContentType: content,
    });
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(__1.s3Client, command);
    console.log("URL->", url);
    return url;
});
const objectURL = (key) => __awaiter(void 0, void 0, void 0, function* () {
    // const command = new GetObjectCommand({
    // 	Bucket: process.env.AWS_BUCKET,
    // 	Key: key,
    // });
    // console.log("KEY",key)
    // const url = await getSignedUrl(s3Client, command);
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}+`;
    console.log(url);
    return url;
});
const imageUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const url = yield putObjectURL(fileName, contentType);
    const publicUrl = yield objectURL(fileName);
    // console.log("public url=>", publicUrl);
    return res.status(201).send({
        success: true,
        url: url,
        publicUrl,
    });
});
exports.imageUpload = imageUpload;
