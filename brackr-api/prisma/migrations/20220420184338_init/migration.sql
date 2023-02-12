-- AlterTable
ALTER TABLE "position" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "position" ADD FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
