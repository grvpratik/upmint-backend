import express, { Express, Request, Response } from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/error";
import { S3Client } from "@aws-sdk/client-s3";

const app: Express = express();
app.use(express.json());

app.use(cors<Request>());


export const prisma = new PrismaClient();
export const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_SECRET_ACCESS_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
	},
});
app.use("/api", rootRouter);

app.get("/", async (req: Request, res: Response) => {
	try {
		res.status(200).send("get request here");
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
	return;
});


app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`Server 💽 listening on PORT ${PORT}`);
});
