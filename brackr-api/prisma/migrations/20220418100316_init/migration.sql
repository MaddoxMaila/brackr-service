/*
  Warnings:

  - You are about to drop the `Journey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_companyId_fkey";

-- DropTable
DROP TABLE "Journey";

-- CreateTable
CREATE TABLE "journey" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "companyId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "journey" ADD FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
