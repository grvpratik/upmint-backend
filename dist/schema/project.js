"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const ProjectSchema = zod_1.z.object({
    name: zod_1.z.string().nullable(),
    nameSlug: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    blockchain: zod_1.z.nativeEnum(client_1.BlockChain).nullable(), // Assuming BlockChain is a string type
    imageUrl: zod_1.z.string().nullable(),
    bannerUrl: zod_1.z.string().nullable(),
    // imageArray: z.array(z.string()),
    whitelist: zod_1.z.boolean(),
    featured: zod_1.z.boolean(),
    verified: zod_1.z.boolean(),
    // prevFollower: z.number().nullable(),
    // currFollower: z.number().nullable(),
    // accountCreated: z.string().nullable(), // Assuming DateTime is stored as a string
    // createdAt: z.string(), // Assuming DateTime is stored as a string
    // updatedAt: z.string(), // Assuming DateTime is stored as a string
    // ProfileId: z.string().nullable(),
    mintInfo: zod_1.z.object({
        supply: zod_1.z.number().nullable(),
        mintPrice: zod_1.z.number().nullable(),
        startTime: zod_1.z.string().nullable(),
        mintDate: zod_1.z.string().nullable(), // Assuming DateTime is stored as a string
    }),
    social: zod_1.z.object({
        x: zod_1.z.string().nullable(),
        discord: zod_1.z.string().nullable(),
        website: zod_1.z.string().nullable(),
        marketplace: zod_1.z.string().nullable(),
    }),
    tags: zod_1.z.array(zod_1.z.string())
    // tags: z.array(
    // 	z.object({
    // 		name: z.string(),
    // 	})
    // ),
});
exports.default = ProjectSchema;
