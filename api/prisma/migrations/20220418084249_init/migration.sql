/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `apikey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "apikey.apiKey_unique" ON "apikey"("apiKey");
