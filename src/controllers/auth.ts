import { NextFunction, Request, Response } from "express";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";

export const adminLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body;

	let user = await prisma.adminUser.findFirst({ where: { username } });
	if (!user) {
		throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
	}
	if (!compareSync(password, user.password)) {
		throw new BadRequestsException(
			"Incorrect password",
			ErrorCode.INCORRECT_PASSWORD,
			null
		);
	}

	const token = jwt.sign(
		{
			userId: user.id,
		},
		JWT_SECRET
	);

	res.json({ user, token });
};

export const userLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
