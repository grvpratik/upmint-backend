import { Request, Response, NextFunction } from "express";
import { slugify } from "../lib/utils";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const articlePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, description, imageUrl, content } = req.body;

	const slug = slugify(name);
	// res.json({
	// 	name: title,
	// 	nameSlug: slug,
	// 	description,
	// 	bannerImage: imageUrl,
	// 	content,
	// });

	const article = await prisma.post.create({
		data: {
			name,
			nameSlug: slug,
			description,
			bannerImage: imageUrl,
			content,
		},
	});
	res.json(article);
};

export const articleGet = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const articles = await prisma.post.findMany();

	res.json({
		total: articles.length,
		result: articles,
	});
};
export const articleDelete = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const articles = await prisma.post.delete({
		where: {
			nameSlug:req.params.slug
		}
	})

	res.json(articles);
};

export const articleDetails = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const slugId = req.params.slug;
	console.log(slugId);
	
		const response = await prisma.post.findFirstOrThrow({
			where: {
				nameSlug: slugId,
			},
		});
		res.json(response);
	 
};

export const articleUpdate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, description, bannerImage, content } = req.body;
	console.log({ name, description, bannerImage, content });
	console.log(req.params.slug);
	const isPresent = await prisma.post.findUnique({
		where: {
			nameSlug: req.params.slug,
		},
	});
	console.log(isPresent, "IS PRESENT");
	if (!isPresent)
		return new NotFoundException(
			"article  not found",
			ErrorCode.ARTICLE_NOT_FOUND
		);
	const slug = slugify(name);
	const updatedResult = await prisma.post.update({
		where: {
			id: isPresent.id,
		},
		data: {
			name,
			nameSlug: slug,
			bannerImage,
			description,
			content,
		},
	});

	res.json(updatedResult);
};
