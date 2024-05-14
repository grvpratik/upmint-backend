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
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleUpdate = exports.articleDetails = exports.articleDelete = exports.articleGet = exports.articlePost = void 0;
const utils_1 = require("../lib/utils");
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const articlePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, imageUrl, content } = req.body;
    const slug = (0, utils_1.slugify)(name);
    // res.json({
    // 	name: title,
    // 	nameSlug: slug,
    // 	description,
    // 	bannerImage: imageUrl,
    // 	content,
    // });
    const article = yield __1.prisma.post.create({
        data: {
            name,
            nameSlug: slug,
            description,
            bannerImage: imageUrl,
            content,
        },
    });
    res.json(article);
});
exports.articlePost = articlePost;
const articleGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield __1.prisma.post.findMany();
    res.json({
        total: articles.length,
        result: articles,
    });
});
exports.articleGet = articleGet;
const articleDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield __1.prisma.post.delete({
        where: {
            nameSlug: req.params.slug
        }
    });
    res.json(articles);
});
exports.articleDelete = articleDelete;
const articleDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slugId = req.params.slug;
    console.log(slugId);
    const response = yield __1.prisma.post.findFirstOrThrow({
        where: {
            nameSlug: slugId,
        },
    });
    res.json(response);
});
exports.articleDetails = articleDetails;
const articleUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, bannerImage, content } = req.body;
    console.log({ name, description, bannerImage, content });
    console.log(req.params.slug);
    const isPresent = yield __1.prisma.post.findUnique({
        where: {
            nameSlug: req.params.slug,
        },
    });
    console.log(isPresent, "IS PRESENT");
    if (!isPresent)
        return new not_found_1.NotFoundException("article  not found", root_1.ErrorCode.ARTICLE_NOT_FOUND);
    const slug = (0, utils_1.slugify)(name);
    const updatedResult = yield __1.prisma.post.update({
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
});
exports.articleUpdate = articleUpdate;
