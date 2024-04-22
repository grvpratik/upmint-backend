-- CreateEnum
CREATE TYPE "TwitterRole" AS ENUM ('INFLUENCER', 'PROJECT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "BlockChain" AS ENUM ('SOLANA', 'ETHEREUM', 'BITCOIN');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "x" TEXT,
    "discord" TEXT,
    "website" TEXT,
    "marketplace" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintInfo" (
    "id" TEXT NOT NULL,
    "supply" INTEGER,
    "mintPrice" INTEGER,
    "startTime" TEXT,
    "mintDate" TIMESTAMP(3),
    "mintInfoId" TEXT NOT NULL,

    CONSTRAINT "MintInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "nameSlug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "blockchain" "BlockChain",
    "imageUrl" TEXT,
    "bannerUrl" TEXT,
    "imageArray" TEXT[],
    "whitelist" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "prevFollower" INTEGER,
    "currFollower" INTEGER,
    "accountCreated" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProfileId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRating" (
    "id" TEXT NOT NULL,
    "popularityScore" INTEGER NOT NULL,
    "popularityCmt" TEXT,
    "credibilityScore" INTEGER NOT NULL,
    "credibilityCmt" TEXT,
    "utilityScore" INTEGER NOT NULL,
    "utilityCmt" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnProjects" (
    "projectId" TEXT NOT NULL,
    "tagsId" TEXT NOT NULL,

    CONSTRAINT "TagsOnProjects_pkey" PRIMARY KEY ("projectId","tagsId")
);

-- CreateTable
CREATE TABLE "TwitterProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "follower" INTEGER,
    "role" "TwitterRole",

    CONSTRAINT "TwitterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameSlug" TEXT NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_password_key" ON "AdminUser"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Social_projectId_key" ON "Social"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "MintInfo_mintInfoId_key" ON "MintInfo"("mintInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_nameSlug_key" ON "Project"("nameSlug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRating_projectId_key" ON "ProjectRating"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_nameSlug_key" ON "Post"("nameSlug");

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintInfo" ADD CONSTRAINT "MintInfo_mintInfoId_fkey" FOREIGN KEY ("mintInfoId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRating" ADD CONSTRAINT "ProjectRating_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProjects" ADD CONSTRAINT "TagsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProjects" ADD CONSTRAINT "TagsOnProjects_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
