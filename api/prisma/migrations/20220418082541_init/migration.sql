/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "email" VARCHAR(155) NOT NULL;

-- CreateTable
CREATE TABLE "apikey" (
    "id" SERIAL NOT NULL,
    "apiKey" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company.email_unique" ON "company"("email");

-- AddForeignKey
ALTER TABLE "apikey" ADD FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
