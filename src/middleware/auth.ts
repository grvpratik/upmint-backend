import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";
export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// 1. extract the token from header
	const token = req.headers.authorization!;
	// console.log(token)
	// console.log(req.headers)
	// 2. if token is not present, throw an error of unauthorized
	if (!token) {
		next(
			new UnauthorizedException(
				"Unauthorized access token required",
				ErrorCode.UNAUTHORIZED
			)
		);
	}
	try {
		// 3. if the token is present, verify that token and extract the payload
		const payload = jwt.verify(token, JWT_SECRET) as any;
		// 4. to get the user from the payload
		const user = await prisma.adminUser.findFirst({
			where: { id: payload.userId },
		});
		if (!user) {
			next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
		}
		// req.user = user;
		next();
	} catch (error) {
		next(new UnauthorizedException("Unauthorized N3", ErrorCode.UNAUTHORIZED));
	}
};
