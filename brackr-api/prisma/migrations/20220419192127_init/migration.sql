/*
  Warnings:

  - You are about to drop the column `transit` on the `vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "transit";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "companyId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
