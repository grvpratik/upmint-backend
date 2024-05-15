"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsByTag = exports.tagsList = exports.projectsDelete = exports.projectsDetails = exports.projectsPatch = exports.projectsPost = exports.projectsSearch = void 0;
const __1 = require("..");
const client_1 = require("@prisma/client");
const project_1 = __importDefault(require("../schema/project"));
// GET /projects/search
const projectsSearch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract search parameters from query string
    const searchString = req.query.search ? req.query.search.toString() : "";
    const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const size = req.query.size ? parseInt(req.query.size.toString()) : 10;
    const chain = req.query.network
        ? req.query.network.toString().toUpperCase()
        : "";
    // Validate and format blockchain network
    const network = chain === client_1.BlockChain.SOLANA ||
        chain === client_1.BlockChain.BITCOIN ||
        chain === client_1.BlockChain.ETHEREUM
        ? chain
        : undefined;
    // Decode search string
    const decodedSearch = decodeURIComponent(searchString);
    // Perform search using Prisma
    const search = yield __1.prisma.project.findMany({
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
});
exports.projectsSearch = projectsSearch;
// POST /projects
const projectsPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate incoming project data
    const parsed = project_1.default.parse(req.body);
    // Extract project data from parsed object
    const { nameSlug, name, description, blockchain, imageUrl, bannerUrl, whitelist, featured, verified, mintInfo: mintInfoData, social: socialData, tags: tagsData, } = parsed;
    // Find or create tags associated with the project
    const tags = yield Promise.all(tagsData.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
        const existingTag = yield __1.prisma.tags.findUnique({
            where: { name: tagName },
        });
        if (existingTag) {
            return existingTag;
        }
        else {
            return __1.prisma.tags.create({
                data: { name: tagName },
            });
        }
    })));
    // Create the project in the database
    const project = yield __1.prisma.project.create({
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
});
exports.projectsPost = projectsPost;
// DELETE /projects/:id
//PATCH /projects/:id
const projectsPatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = project_1.default.parse(req.body);
    // Extract project data from parsed object
    const { nameSlug, name, description, blockchain, imageUrl, bannerUrl, whitelist, featured, verified, mintInfo: mintInfoData, social: socialData, tags: tagsData, } = parsed;
    // Find or create tags associated with the project
    const tags = yield Promise.all(tagsData.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
        const existingTag = yield __1.prisma.tags.findUnique({
            where: { name: tagName },
        });
        if (existingTag) {
            return existingTag;
        }
        else {
            return __1.prisma.tags.create({
                data: { name: tagName },
            });
        }
    })));
    // Create the project in the database
    const project = yield __1.prisma.project.update({
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
});
exports.projectsPatch = projectsPatch;
const projectsDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slugId = req.params.slug;
    console.log(slugId);
    const response = yield __1.prisma.project.findFirstOrThrow({
        where: {
            nameSlug: slugId,
        },
    });
    res.json(response);
});
exports.projectsDetails = projectsDetails;
const projectsDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield __1.prisma.project.delete({
        where: {
            nameSlug: req.params.slug,
        },
    });
    res.json(projects);
});
exports.projectsDelete = projectsDelete;
// GET /tags
const tagsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve all tags from the database
    const tags = yield __1.prisma.tags.findMany();
    res.json(tags);
});
exports.tagsList = tagsList;
// GET /tags/:name/projects
const projectsByTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chain = req.query.network
        ? req.query.network.toString().toUpperCase()
        : "";
    const network = chain === client_1.BlockChain.SOLANA ||
        chain === client_1.BlockChain.BITCOIN ||
        chain === client_1.BlockChain.ETHEREUM
        ? chain
        : undefined;
    // Find projects associated with a specific tag
    const projects = yield __1.prisma.project.findMany({
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
});
exports.projectsByTag = projectsByTag;
