-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ProfileId_fkey";

-- CreateTable
CREATE TABLE "WatchList" (
    "projectId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("projectId","profileId")
);

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
