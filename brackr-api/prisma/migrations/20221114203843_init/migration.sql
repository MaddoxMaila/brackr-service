/*
  Warnings:

  - You are about to drop the column `userId` on the `trackedObject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "trackedObject" DROP CONSTRAINT "trackedObject_userId_fkey";

-- AlterTable
ALTER TABLE "journey" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "trackedObject" DROP COLUMN "userId";
