import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/error";



const app:Express = express();
app.use(express.json());


export const  prisma = new PrismaClient();
app.use('/api',rootRouter)

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
