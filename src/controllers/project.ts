import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { BlockChain } from "@prisma/client";

import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import ProjectSchema from "../schema/project";

// GET /projects/search
export const projectsSearch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Extract search parameters from query string
	const searchString = req.query.search ? req.query.search.toString() : "";
	const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
	const size = req.query.size ? parseInt(req.query.size.toString()) : 10;
	const chain = req.query.network
		? req.query.network.toString().toUpperCase()
		: "";

	// Validate and format blockchain network
	const network =
		chain === BlockChain.SOLANA ||
		chain === BlockChain.BITCOIN ||
		chain === BlockChain.ETHEREUM
			? chain
			: undefined;

	// Decode search string
	const decodedSearch = decodeURIComponent(searchString);

	// Perform search using Prisma
	const search = await prisma.project.findMany({
		where: {
			blockchain: network,
			name: {
				contains: decodedSearch,
				mode: "insensitive",
			},
		},
		skip: (page - 1) * size,
		take: size,
	});

	// Return search results
	const count = search.length;
	res.json({ count, result: search });
};

// POST /projects
export const projectsPost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Validate incoming project data
	const parsed = ProjectSchema.parse(req.body);

	// Extract project data from parsed object
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

	// Find or create tags associated with the project
	const tags = await Promise.all(
		tagsData.map(async (tagName: string) => {
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

	// Create the project in the database
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
				create: mintInfoData,
			},
			social: {
				create: socialData,
			},
			tags: {
				connect: tags.map((tag) => ({ id: tag.id })),
			},
		},
		include: {
			tags: true,
		},
	});

	// Return the created project
	res.json(project);
};

// DELETE /projects/:id

//PATCH /projects/:id

export const projectsPatch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const parsed = ProjectSchema.parse(req.body);

	// Extract project data from parsed object
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

	// Find or create tags associated with the project
	const tags = await Promise.all(
		tagsData.map(async (tagName: string) => {
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

	// Create the project in the database
	const project = await prisma.project.update({
		where: {
			nameSlug: req.params.slug,
		},
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
				update: mintInfoData,
			},
			social: {
				update: socialData,
			},
			tags: {
				connect: tags.map((tag) => ({ id: tag.id })),
			},
		},
		include: {
			tags: true,
		},
	});

	// Return the created project
	res.json(project);
};

export const projectsDetails = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const slugId = req.params.slug;
	console.log(slugId);

	const response = await prisma.project.findFirstOrThrow({
		where: {
			nameSlug: slugId,
		},
	});
	res.json(response);
};

export const projectsDelete = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const projects = await prisma.project.delete({
		where: {
			nameSlug: req.params.slug,
		},
	});

	res.json(projects);
};

// GET /tags
export const tagsList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Retrieve all tags from the database
	const tags = await prisma.tags.findMany();
	res.json(tags);
};

// GET /tags/:name/projects
export const projectsByTag = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const chain = req.query.network
		? req.query.network.toString().toUpperCase()
		: "";
	const network =
		chain === BlockChain.SOLANA ||
		chain === BlockChain.BITCOIN ||
		chain === BlockChain.ETHEREUM
			? chain
			: undefined;
	// Find projects associated with a specific tag
	const projects = await prisma.project.findMany({
		where: {
			AND: [
				{ tags: { some: { name: req.params.name } } }, // Filter projects by tag name
				{ blockchain: network }, // Filter projects by blockchain
			],
		},
	});

	res.json({
		total: projects.length,
		projects,
	});
};
