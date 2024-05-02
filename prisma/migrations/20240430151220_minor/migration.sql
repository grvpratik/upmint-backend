/*
  Warnings:

  - The primary key for the `WatchList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WatchList" DROP CONSTRAINT "WatchList_pkey",
ADD CONSTRAINT "WatchList_pkey" PRIMARY KEY ("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");
