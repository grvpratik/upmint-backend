import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/root";


export const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(error.statusCode).json({
		message: error.message,
		errorCode: error.errorCode,
		errors: error.error,
	});
};

// import { NextFunction, Request, Response } from "express";
// import { BadRequestsException } from "../exceptions/bad-request";

// const ErrorHandler = (err:BadRequestsException, req:Request, res:Response, next:NextFunction) => {
// 	console.log("Middleware Error Hadnling");
// 	const errStatus = err.statusCode || 500;
// 	const errMsg = err.message || "Something went wrong";
// 	res.status(errStatus).json({
// 		success: false,
// 		status: errStatus,
// 		message: errMsg,
// 		stack: process.env.NODE_ENV === "development" ? err.stack : {},
// 	});
// };

// export default ErrorHandler;
