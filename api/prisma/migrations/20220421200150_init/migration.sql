/*
  Warnings:

  - Added the required column `from` to the `journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transit` to the `journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journey" ADD COLUMN     "from" VARCHAR(100) NOT NULL,
ADD COLUMN     "to" VARCHAR(100) NOT NULL,
ADD COLUMN     "transit" INTEGER NOT NULL;
