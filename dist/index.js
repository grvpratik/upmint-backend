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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const secrets_1 = require("./secrets");
const routes_1 = __importDefault(require("./routes"));
const error_1 = require("./middleware/error");
const client_s3_1 = require("@aws-sdk/client-s3");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.prisma = new client_1.PrismaClient();
exports.s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_SECRET_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
app.use("/api", routes_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("get request here");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    return;
}));
app.use(error_1.errorMiddleware);
app.listen(secrets_1.PORT, () => {
    console.log(`Server 💽 listening on PORT ${secrets_1.PORT}`);
});
