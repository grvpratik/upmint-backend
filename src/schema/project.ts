import { string, z } from "zod";
import { BlockChain } from "@prisma/client";
const ProjectSchema = z.object({
name: z.string().nullable(),
	nameSlug: z.string(),
	
	description: z.string().nullable(),
	blockchain: z.nativeEnum(BlockChain).nullable(), // Assuming BlockChain is a string type
	imageUrl: z.string().nullable(),
	bannerUrl: z.string().nullable(),
	// imageArray: z.array(z.string()),

	whitelist: z.boolean(),
	featured: z.boolean(),
	verified: z.boolean(),
	// prevFollower: z.number().nullable(),
	// currFollower: z.number().nullable(),
	// accountCreated: z.string().nullable(), // Assuming DateTime is stored as a string
	// createdAt: z.string(), // Assuming DateTime is stored as a string
	// updatedAt: z.string(), // Assuming DateTime is stored as a string
	// ProfileId: z.string().nullable(),
	mintInfo: z.object({
		supply: z.number().nullable(),
		mintPrice: z.number().nullable(),
		startTime: z.string().nullable(),
		mintDate: z.string().nullable(), // Assuming DateTime is stored as a string
	}),
	social: z.object({
		x: z.string().nullable(),
		discord: z.string().nullable(),
		website: z.string().nullable(),
		marketplace: z.string().nullable(),
	}),
	tags: z.array(z.string())

	// tags: z.array(
	// 	z.object({
	// 		name: z.string(),
	// 	})
	// ),
});

export default ProjectSchema;
