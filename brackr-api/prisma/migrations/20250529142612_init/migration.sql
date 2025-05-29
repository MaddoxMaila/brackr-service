-- AlterTable
ALTER TABLE "location" ADD COLUMN     "latitude" VARCHAR(100) NOT NULL DEFAULT '0.0',
ADD COLUMN     "longitude" VARCHAR(100) NOT NULL DEFAULT '0.0';
