/*
  Warnings:

  - You are about to drop the column `trackedObjId` on the `trackedObject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `trackedObject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `trackedObject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trackedObject" DROP COLUMN "trackedObjId",
ADD COLUMN     "name" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trackedObject.name_unique" ON "trackedObject"("name");
