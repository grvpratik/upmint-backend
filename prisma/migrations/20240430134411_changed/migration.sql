/*
  Warnings:

  - You are about to drop the `TagsOnProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnProjects" DROP CONSTRAINT "TagsOnProjects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProjects" DROP CONSTRAINT "TagsOnProjects_tagsId_fkey";

-- DropTable
DROP TABLE "TagsOnProjects";

-- CreateTable
CREATE TABLE "_ProjectToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTags_AB_unique" ON "_ProjectToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTags_B_index" ON "_ProjectToTags"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTags" ADD CONSTRAINT "_ProjectToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTags" ADD CONSTRAINT "_ProjectToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
