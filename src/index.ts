import  express,{Express,Request,Response} from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorHandler } from "./error";



const app:Express = express();
app.use(express.json());

app.get('/api',rootRouter)

app.get("/", async (req: Request, res: Response) => {
	try {
		res.status(200).send("get request here");
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
	return;
});








app.use(errorHandler);

app.listen(3001, () => {
	console.log(`Server 💽 listening on PORT ${(PORT)}`);
});
