import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { BlockChain } from "@prisma/client";

import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import ProjectSchema from "../schema/project";

export const projectsGet = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const projects = await prisma.project.findMany();
	res.json({
		total: projects.length,
		result: projects,
	});

	// await prisma.profile.deleteMany()
	// await prisma.user.deleteMany();
};

export const projectsSearch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const searchString = req.query.q ? req.query.q.toString() : "";
	const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
	const size = req.query.size ? parseInt(req.query.size.toString()) : 10;
	const chain = req.query.network
		? req.query.network.toString().toUpperCase()
		: "";
console.log(chain)
	const network =
		chain === BlockChain.SOLANA ||
		chain === BlockChain.BITCOIN ||
		chain === BlockChain.ETHEREUM
			? chain
			: undefined;
	console.log(network);
	const search = await prisma.project.findMany({
		where: {
			blockchain: network, // Assuming blockchain is a string field

			OR: [
				{
					name: {
						contains: searchString, // Using contains to find projects with names containing the provided string
					},
				},
				{
					description: {
						contains: searchString, // Using contains to find projects with descriptions containing the provided string
					},
				},
			],
		},
		skip: (page - 1) * size, // Calculate the number of records to skip
		take: size, // size the number of records returned per page
	});

	const count = search.length;
	res.json({ count, search });
};

export const projectsPost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	
	// await prisma.tagsOnProjects.delete({
	// 	where: {
	// 		projectId_tagsId: {
	// 			projectId: "clvlc7m070000epdyxxt7rmlt",
	// 			tagsId: "clvlc7m070003epdy3j10jiyl",
	// 		},
	// 	},
	// });
	const parsed = ProjectSchema.parse(req.body);
	// console.log(parsed);
	const {
		nameSlug,
		name,
		description,
		blockchain,
		imageUrl,
		bannerUrl,

		whitelist,
		featured,
		verified,

		mintInfo: mintInfoData,
		social: socialData,
		tags: tagsData,
	} = parsed;
//here tag is array of string
	    const tags = await Promise.all(
				tagsData.map(async (tagName:string) => {
					const existingTag = await prisma.tags.findUnique({
						where: { name: tagName },
					});
					if (existingTag) {
						return existingTag;
					} else {
						return prisma.tags.create({
							data: { name: tagName },
						});
					}
				})
			);
	// console.log(req.body);
	// const chain = blockchain ? blockchain.toUpperCase() : null;
	// const network =
	// 	chain === BlockChain.SOLANA ||
	// 	chain === BlockChain.BITCOIN ||
	// 	chain === BlockChain.ETHEREUM
	// 		? chain
	// 		: undefined;

	const project = await prisma.project.create({
		data: {
			nameSlug,
			name,
			description,
			blockchain,
			imageUrl,
			bannerUrl,

			whitelist,
			featured,
			verified,

			mintInfo: {
				create: mintInfoData, // Create MintInfo if provided
			},
			social: {
				create: socialData, // Create Social if provided
			},
			tags: {
				connect: tags.map((tag) => ({ id: tag.id })),
			},
		},
		include: {
			tags: true,
		},
		// Exclude the rating field from being included in the created project
	});
	res.json(project);
};

export const projectsPatch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const projectsDelete = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await prisma.project.findFirstOrThrow({
			where: {
				nameSlug: req.params.id,
			},
		});
		res.json(product);
	} catch (err) {
		// console.log(err);
		throw new NotFoundException(
			"Project not found.",
			ErrorCode.PROJECT_NOT_FOUND
		);
	}
};
