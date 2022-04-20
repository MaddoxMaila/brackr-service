/*
  Warnings:

  - You are about to drop the column `from` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `position` table. All the data in the column will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_companyId_fkey";

-- AlterTable
ALTER TABLE "journey" ADD COLUMN     "trackedObjectId" INTEGER;

-- AlterTable
ALTER TABLE "position" DROP COLUMN "from",
DROP COLUMN "to",
DROP COLUMN "vehicleId",
ADD COLUMN     "trackedObjectId" INTEGER;

-- DropTable
DROP TABLE "vehicle";

-- CreateTable
CREATE TABLE "trackedObject" (
    "id" SERIAL NOT NULL,
    "trackedObjId" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trackedObject" ADD FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey" ADD FOREIGN KEY ("trackedObjectId") REFERENCES "trackedObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD FOREIGN KEY ("trackedObjectId") REFERENCES "trackedObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
